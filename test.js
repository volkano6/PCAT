const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

//create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

//create a schema
// Photo.create({
//   title: 'Photo title 2',
//   description: 'Photo description 2 lorem ipsum',
// });

//read a photo
// Photo.find({}, (err, data) => {
//     console.log(data)
// })

//update a photo
// const id = '62deed467014b579d0702cd5';

// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo title 1 updated',
//     description: 'Photo description 1 lorem ipsum updated',
//   },{
//     new: true
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );


//delete a photo
// const id = '62deed467014b579d0702cd5';
// Photo.findByIdAndDelete(id, (err, data) => {
//     console.log("photo is removed!!")
// })