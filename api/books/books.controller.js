import Book from '../../schema/Book';

/**
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
 * @description Get All books or filtered by Author or/and year
 * @param req: Object
 * @param res: Object
 * @returns {Promise<Array>}
 */
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    const { query } = req;
    if (Object.keys(query).length > 0) {
      res.json({ books: _filterBooksByQuery(books, query) });
    } else {
      res.json({ books });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

/**
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

module.exports = {
  getBooks,
  getData
};