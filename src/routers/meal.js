const express = require('express');
const router = new express.Router();
const sharp = require('sharp');
const multer = require('multer');
const Meal = require('../models/Meal');
const auth = require('../middleware/auth');

const upload = multer({
    limits: {
        fileSize: 3000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a .png or .jpg file'));
        }

        cb(undefined, true);
    }
});

// @route POST /api/meals
// @desc Create new meal
// @access Private
router.post('/api/meals', auth, upload.single('meal'), async(req, res) => {
    let buffer = null;
    
    if(req.file) {
        buffer = await sharp(req.file.buffer).resize({ width: 800, height: 800 }).webp().toBuffer();
    }

    req.body.ingredients = req.body.ingredients.split(',')
    req.body.tags = req.body.tags.split(',')
    
    const meal = new Meal({
        ...req.body,
        owner: req.user._id,
        image: buffer,
        hasImage: buffer ? true : false
    });
    
    try {
        await meal.save();
        res.status(201).send(meal);
    } catch(e) {
        res.status(404).send(e);
    }
}, (err, req, res, next) => {
    res.status(400).send({error: err.message});
});

// @route GET /api/meals
// @desc Get all user meals
// @access Private
router.get('/api/meals', auth, (req, res) => {
    Meal.find({owner: req.user._id})
        .sort({ createdAt: -1 })
        .then(meals => res.send(meals));
});

// @route PATCH /api/meals
// @desc Edit meal
// @access Private
router.patch('/api/meals/:id', auth, upload.single('meal'), async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ['name', 'meal', 'ingredients', 'recipe', 'tags', 'image', 'hasImage'];
    const isValidOperation = updates.every(update => allowUpdates.includes(update));

    if(Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        return res.status(400).send({error: 'You must fill at least one filed in order to update meal'});
    }

    if(!isValidOperation) {
        return res.status(404).send({ error: 'Invalid updates' });
    }

    req.body.ingredients = req.body.ingredients.split(',')
    req.body.tags = req.body.tags.split(',')

    try {
        const meal = await Meal.findOne({ _id: req.params.id });
        let mealCopy;
        let buffer = null;
        let image64 = null;

        if(!meal) {
            return res.status(404).send();
        }
        
        updates.forEach(update => meal[update] = req.body[update]);
        
        if(req.file !== undefined) {
            buffer = await sharp(req.file.buffer).resize({ width: 300, height: 300 }).webp().toBuffer();
            image64 = req.file.buffer.toString('base64');

            meal.image = buffer;
        }
        
        mealCopy = {
            ...meal._doc,
            image64,
        };
        
        await meal.save();
        
        res.send(mealCopy);
    } catch (e) {
        res.status(404).send(e);
    }
}, (err, req, res, next) => {
    res.status(400).send({error: err.message});
});

// @route DELETE /api/meals/:id
// @desc Delete meal
// @access Private
router.delete('/api/meals/:id', auth, async (req, res) => {
    try {
        const meal = await Meal.findOneAndDelete({ _id: req.params.id });

        if(!meal) return res.status(404).send();
        
        res.send(meal);
    } catch(e) {
        res.status(500).send();
    }
});

// @route GET /api/products/:id/image
// @desc Get product image
// @access Public
router.get('/api/meals/:id/image', async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        
        if(!meal || !meal.image) {
            throw new Error();
        }

        res.set('Content-Type', 'image/webp');
        res.send(meal.image);
    } catch (e) {
        res.status(404).send();
    }
});

module.exports = router;