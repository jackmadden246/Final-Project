const express = require('express');
const path = require('path');
const port = 3000;
const mongoose = require('mongoose');
const Holidays = require('./models/holidays');

mongoose.connect('mongodb://localhost:27017/holidays');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home');
})
app.get('/holidays', async (req, res) => {
    const holidays = await Holidays.find({});
    res.render('holidays/index', {holidays});
})

app.get('/holidays/:id', async (req, res) => {
    res.render('holidays/show');
})

app.listen(port, () => {
    console.log('Listening....');
})