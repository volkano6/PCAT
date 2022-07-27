const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const fs = require('fs');

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
app.use(methodOverride('_method'));

//  Routes
app.get('/', async (req, res) => {
  // descript data to variable
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});
app.get('/post', (req, res) => {
  res.render('post');
});
app.get('/photos/:photo_id', async (req, res) => {
  const photo = await Photo.findById(req.params.photo_id);
  res.render('post', {
    photo,
  });
});
app.post('/photos', async (req, res) => {
  // console.log(req.files.image);
  //create a schema
  // await Photo.create(req.body);
  // res.redirect('/');

  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
});

app.get('/photos/edit/:photo_id', async (req, res) => {
  const photo = await Photo.findById(req.params.photo_id);
  res.render('edit', {
    photo,
  });
});
app.put('/photos/:photo_id', async (req, res) => {
  const photo = await Photo.findById(req.params.photo_id);
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
