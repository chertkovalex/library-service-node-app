const express = require('express');
const Book = require('../schema/Book');

const router = express.Router();

/*
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Serving Books on the Endpoint.'
  });
});
*/

/*

router.get('/list', (req, res, next) => {
  Book.find({})
    .exec()
    .then(books => {
      res.status(200).json({
        books
      });
    })
    .catch(err => {
      console.log(err);
    });
});

*/

/*
router.post('/add', (req, res, next) => {
  const book = new Book({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    author: req.body.author,
    year: req.body.year,
    pages: req.body.pages
  });

  book
    .save()
    .then(result => {
      res.status(200).json({
        books: [book]
      });
    })
    .catch(err => {
      console.log(err);
    });
});
*/

router.post('/delete', (req, res, next) => {
  const rid = req.body.id;

  Book.findById(rid)
    .exec()
    .then(books => {
      books.remove();
      res.status(200).json({
        deleted: true
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
