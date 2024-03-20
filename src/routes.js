const express = require('express');

const handler = require('./handler');

const router = express.Router();

router.post('/books', handler.storeBook);

router.get('/books', handler.getAllBooks);

router.get('/books/:id', handler.getBookById);

router.put('/books/:id', handler.editBookById);

router.delete('/books/:id', handler.deleteBookById);

module.exports = router;
