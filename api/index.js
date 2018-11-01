const { Router } = require('express');

const books = require('./books');

const router = new Router();

router.use('/books', books);

module.exports = router;
