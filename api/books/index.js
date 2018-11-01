const { Router } = require('express');

const schema = require('./books.joi.schema');
const { addBook, getBooks, getData } = require('./books.controller');
const validate = require('../../common/validator');

const router = new Router();

// e.g: http://localhost:3333/api/books
router.route('/').get(validate(schema.get), getBooks);
router.route('/').post(/*validate(schema.addBook),*/ addBook);
router.route('/:id').get(validate(schema.getData), getData);

module.exports = router;
