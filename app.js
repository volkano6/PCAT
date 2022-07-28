const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const fs = require('fs');
const photoControllers = require('./controllers/photoControllers');
const pageControllers = require('./controllers/pageControllers');

const app = express();

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

//  Template Engine
app.set('view engine', 'ejs');

//  MiddleWares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//  Routes
app.get('/', photoControllers.getAllPhotos);
app.get('/photos/:photo_id', photoControllers.getPhoto);
app.post('/photos', photoControllers.createPhoto);
app.put('/photos/:photo_id', photoControllers.updatePhoto);
app.delete('/photos/:photo_id', photoControllers.deletePhoto);

app.get('/about', pageControllers.getAboutPage);
app.get('/add_post', pageControllers.getAddPage);
app.get('/photos/edit/:photo_id', pageControllers.getEditPage);

app.get('/post', (req, res) => {
  res.render('post');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
