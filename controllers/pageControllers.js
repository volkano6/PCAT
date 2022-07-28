const Photo = require('../models/Photo')

exports.getAboutPage = (req, res) => {
    res.render('about');
  }

exports.getAddPage = (req, res) => {
    res.render('add_post');
  }

exports.getEditPage = async (req, res) => {
    const photo = await Photo.findById(req.params.photo_id);
    res.render('edit', {
      photo,
    });
  }