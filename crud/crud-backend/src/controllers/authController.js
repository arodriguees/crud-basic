const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

//List
router.get('/list', async (req, res) => {
    try {
        const listBook = await Book.find();

        return res.send({ listBook });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading list' });
    }
});

//Create
router.post('/list/create/', async (req, res) => {
    const { bookName } = req.body;

    try {
        if (await Book.findOne({ bookName }))//Verify book exists
            return res.status(400).send({ error: 'Book already exists'});
        
            const book = await Book.create(req.body);
            return res.send({ book });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new book'});
    }
});

//Update
router.put('/list/update/:bookId', async (req, res) =>{
    try {
        const { bookName, autorName, year } = req.body;

        const book = await Book.findByIdAndUpdate(req.params.bookId, {
            bookName,
            autorName,
            year
        }, { new: true });

        await book.save();

        return res.send({ book });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating book'});
    }
});

//Delete
router.delete('/list/delete/:bookId', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.bookId);
        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting book'});
    }
});

module.exports = app => app.use('/auth', router);