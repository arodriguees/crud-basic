const mongoose = require('../database');

const BookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        require: true,
    },
    autorName: {
        type: String,
        require: true,
    },
    year: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;