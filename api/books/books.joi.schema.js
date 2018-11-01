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

module.exports = {
  get,
  getData
};
