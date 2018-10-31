const Joi = require('joi');

const get = {
  query: {
    author: Joi.string(),
    year: Joi.number()
  }
};

const getData = {
  query: {
    identifiers: Joi.array().required()
  }
};

module.exports = {
  get,
  getData
};
