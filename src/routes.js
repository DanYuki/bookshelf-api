const express = require('express');

const router = express.Router();

const handler = require('./handler');

router.post('/books', handler.storeBook);

router.get('/books', handler.getAllBooks);

router.get('/books/:bookId', handler.getBookById);

router.put('/books/:bookId', handler.editBookById);

router.delete('/books/:bookId', handler.eleteBookById);

module.exports = {
    router,
};
