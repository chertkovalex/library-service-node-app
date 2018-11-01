const Joi = require('joi');

const get = {
  query: {
    author: Joi.string(),
    year: Joi.number()
  }
};

const getData = {
  params: {
    id: Joi.string().required()
  }
};

const addBook = {
  body: {
    author: Joi.string().required(),
    name: Joi.string().required(),
    pages: Joi.number(),
    year: Joi.number().required()
  }
};

module.exports = {
  addBook,
  get,
  getData
};
