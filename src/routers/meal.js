const express = require('express');
const router = new express.Router();
const sharp = require('sharp');
const multer = require('multer');
const Meal = require('../models/Meal');

// @route POST /api/meals
// @desc Create new meal
// @access Private
router.post('/api/meals', async(req, res) => {
    const meal = new Meal({
        ...req.body
    });

    try {
        await meal.save();
        res.status(201).send(meal);
    } catch(e) {
        res.status(404).send(e);
    }
});

// @route GET /api/meals
// @desc Get all meals
// @access Public
router.get('/api/meals', (req, res) => {
    Meal.find()
        .sort({ createdAt: -1 })
        .then(meals => res.send(meals));
});

// @route DELETE /api/meals/:id
// @desc Delete meal
// @access Private
router.delete('/api/meals/:id', async (req, res) => {
    try {
        const meal = await Meal.findOneAndDelete({ _id: req.params.id });

        if(!meal) return res.status(404).send();
        
        res.send(meal);
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;