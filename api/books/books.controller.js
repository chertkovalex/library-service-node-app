import Book from '../../schema/Book';

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

module.exports = {
  getBooks
};
