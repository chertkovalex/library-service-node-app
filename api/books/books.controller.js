const mongoose = require('mongoose');
const Book = require('../../schema/Book');
/**
 *
 * @param obj
 * @param keyList
 * @returns {{}}
 * @private
 */
const _filterObjectByKeys = (obj, keyList) => {
  return Object.keys(obj).reduce((qp, key) => {
    if (keyList.includes(key)) {
      qp[key] = obj[key];
    }

    return qp;
  }, {});
};

/**
 * @method _filterBooksByQuery
 * @param books: Array
 * @param query: Object
 * @returns Array
 * @private
 */
const _filterBooksByQuery = (books, query) => {
  const params = Object.keys(query);
  return books.filter(book => {
    for (let i = 0; i <= params.length; i++) {
      if (book[params[i]] !== query[params[i]]) {
        return false;
      }
    }
    return true;
  });
};

/**
 * @method getBooks
 * @description Get All books or filtered by Author or/and year + skip/limit
 * @todo: Sorting
 * @param req: Object
 * @param res: Object
 * @returns {Promise<Array>}
 */

const getBooks = async (req, res) => {
  try {
    const { query } = req;

    const queryOptionsNames = ['skip', 'limit', 'sort'];
    const queryParamsNames = ['author', 'year'];

    const queryParams = _filterObjectByKeys(query, queryParamsNames);
    const queryOptions = _filterObjectByKeys(query, queryOptionsNames);

    const books = await Book.find(queryParams, {}, queryOptions);
    res.json({ books });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

/**
 * @method getData
 * @description Get specific book by id
 * @param req: Object
 * @param res: Object
 * @returns {Promise<Object>}
 */
const getData = async (req, res) => {
  try {
    const books = await Book.find({});
    const { params } = req;
    const id = params.id;
    const book = books.find(b => {
      return b._id.toString() === id;
    });
    res.json({ book });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
/**
 * @method addBook
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const addBook = async (req, res, next) => {
  const { author, name, pages, year } = req.body;

  const newBook = new Book({
    _id: mongoose.Types.ObjectId(),
    author,
    name,
    pages,
    year
  });
  try {
    const { _id, author, name, year, pages } = await newBook.save();
    res.status(200).json({
      _id,
      author,
      name,
      year,
      pages
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

/**
 * @method deleteBook
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const deleteBook = async (req, res, next) => {
  const { id } = req.body;
  try {
    const book = await Book.findById(id);
    book.remove();
    res.status(200).json({
      deleted: true
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const updateBook = async (req, res, next) => {
  const { _id, pages, year } = req.body;
  try {
    const book = await Book.findOneAndUpdate(
        {_id},
      { pages, year },
      { new: true },
      () => {}
    ).exec();
    res.status(200).json({ book });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const borrowBook = async (req, res, next) => {
  const date = Date.now();
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { date_borrowed: date },
      { new: true }
    );
    res.status(200).json({ book });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const returnBook = async (req, res, next) => {
  const { id } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(
      id,
      { date_borrowed: null },
      { new: true }
    );
    res.status(200).json({ book });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  addBook,
  getBooks,
  getData,
  deleteBook,
  updateBook,
  borrowBook,
  returnBook
};
