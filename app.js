const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const api = require('./api');
require('./config/database');
const hb = require('./config/handlebars');
const books = require('./routes/books');

const app = express();

//set template engine
app.engine('hbs', hb);
app.set('view engine', 'hbs');

//make way for some custom css, js and images
app.use('/custom/css', express.static(__dirname + '/views/static/css'));
app.use('/custom/js', express.static(__dirname + '/views/static/js'));
app.use('/custom/imgs', express.static(__dirname + '/views/static/imgs'));

app.use(cors());
app.use(bodyparser());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/', api);
app.use('/books', books);

//Home route
app.get('/', (req, res) => {
  res.render('home');
});

module.exports = app;
