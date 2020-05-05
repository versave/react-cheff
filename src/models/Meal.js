const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    image: {
        type: Buffer
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    recipe: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
});

// Methods - Accesible on the instances
mealSchema.methods.toJSON = function() {
    const meal = this;
    const mealObject = meal.toObject();

    delete mealObject.image;

    return mealObject;
};

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;