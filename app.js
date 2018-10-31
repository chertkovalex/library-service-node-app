import express from "express";
import bodyparser from "body-parser";
import cors from "cors";

import api from './api';
import db from "./config/database";
import hb from "./config/handlebars"
import books from "./routes/books"

const app = express();

//set template engine
app.engine("hbs", hb);
app.set("view engine", "hbs");

//make way for some custom css, js and images
app.use('/custom/css', express.static(__dirname + '/views/static/css'));
app.use('/custom/js', express.static(__dirname + '/views/static/js'));
app.use('/custom/imgs', express.static(__dirname + '/views/static/imgs'));

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use("/", api);
app.use("/books", books);

//Home route
app.get('/', (req, res) => {
    res.render('home');
});

module.exports = app;