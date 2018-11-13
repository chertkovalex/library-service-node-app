const { Router } = require('express');

const schema = require('./books.joi.schema');
const {
  addBook,
  getBooks,
  getData,
  deleteBook,
  updateBook,
  borrowBook,
  returnBook
} = require('./books.controller');
const validate = require('../../common/validator');

const router = new Router();

// e.g: http://localhost:3333/api/books
router
  .route('/')
  .get(validate(schema.get), getBooks)
  .post(validate(schema.addBook), addBook)
  .delete(/*validate(schema.deleteBook),*/ deleteBook);

router
  .route('/:id')
  .get(validate(schema.getData), getData)
  .patch(validate(schema.updateBook), updateBook);

router
  .route('/:id/borrow')
  .patch(validate(schema.borrowBook), borrowBook)
  .patch(validate(schema.returnBook), returnBook);

module.exports = router;
