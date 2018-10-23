import express from "express";
import Book from "../schema/Book"
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message:"Serving Books on the Endpoint."
    });   
});

router.get("/list", (req, res, next) => {
    Book.find({})
        .exec()
        .then(docs => {
            res.status(200).json({
                docs
            });
        })
        .catch(err => {
            console.log(err)
        });
});

router.post("/add", (req, res, next) => {

    const book = new Book({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        author: req.body.author,
        year: req.body.year,
        pages: req.body.pages
    });

    book.save()
    .then(result => {
        res.status(200).json({
            docs:[book]
        });
    })
    .catch(err => {
        console.log(err);
    });
});

router.post("/delete", (req, res, next) => {
    const rid = req.body.id;

    Book.findById(rid)
        .exec()
        .then(docs => {
            docs.remove();
            res.status(200).json({
                deleted:true
            });
        })
        .catch(err => {
            console.log(err)
        });
});

module.exports = router;