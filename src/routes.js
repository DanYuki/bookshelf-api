const express = require('express');

const router = express.Router();

router.post('/books', (req, res) => {
    // This will handle adding new book
    console.log(req);
    return 0;
});

router.get('/books', (req, res) => {
    // This will handle getting all available books
});

router.get('/books/:bookId', () => {
    // This will handle getting specific book details
});

router.put('/books/:bookId', () => {
    // This will handle editing a book by its id
});

router.delete('/books/:bookId', () => {
    // This will handle deleting a book by its id
});
