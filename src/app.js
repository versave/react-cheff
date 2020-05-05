const path = require('path');
const express = require('express');
require('./db/mongoose');
const mealRouter = require('./routers/meal');

const app = express();

app.use(express.json());
app.use(mealRouter);

app.use(express.static(path.join(__dirname, '../client/build')));
 
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

module.exports = app;