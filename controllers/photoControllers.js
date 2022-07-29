const Photo = require('../models/Photo')
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  
  const page = req.query.page || 1;
  const photosPerPage = 2;

  const totalPhotos = await Photo.find().countDocuments();

  const photos = await Photo.find()
  .sort('-dateCreated')
  .skip((page-1) * photosPerPage)
  .limit(photosPerPage)

  res.render('index', {
  photos: photos,
  current: page,
  pages: Math.ceil(totalPhotos / photosPerPage)
  });

  // console.log(req.query)
  // const photos = await Photo.find({}).sort('-dateCreated');
  // res.render('index', {
  //   photos,
  // });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.photo_id);
  res.render('post', {
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/'  + uploadImage.name;

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.photo_id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.photo_id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _iq: req.params.photo_id });
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.photo_id);
  res.redirect('/');
};
