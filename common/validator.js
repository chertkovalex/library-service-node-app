import { celebrate } from 'celebrate';
module.exports = schema => celebrate(schema, { abortEarly: false });
