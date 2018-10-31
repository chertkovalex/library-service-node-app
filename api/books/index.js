const { Router } = require('express');
const validate = require('../../common/validator');

import schema from './books.joi.schema';
import { getBooks } from './books.controller';

const router = new Router();

/*
router
    .route('/data')
    .get(validate(schema.getData), getData);
*/

// e.g: http://localhost:3333/api/books
router.route('/').get(validate(schema.get), getBooks);

module.exports = router;
