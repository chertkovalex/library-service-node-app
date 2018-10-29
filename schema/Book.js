import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  author: String,
  year: Number,
  pages: Number,
  borrowed: Boolean,
  date_borrowed: Date
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
