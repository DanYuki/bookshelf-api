const { nanoid } = require('nanoid');
const books = require('./books');

const storeBook = (req, res) => {
    // Handle storing book
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = req.body;

    if (!name || name.trim() === '') {
        res.status(400).send({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        return;
    }

    if (readPage > pageCount) {
        res.status(400).send({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        return;
    }

    const id = nanoid(16);
    const finished = readPage === pageCount;
    const insertedAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);
    // res.send(books);
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        res.status(201).send({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        return;
    }

    res.status(500).send({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
};

const getAllBooks = (req, res) => {
    // Get all book data
    const { name, reading, finished } = req.query;

    let filteredBooks = books;

    if (name) {
        filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase()
        .includes(name.toLowerCase()));
    }

    if (reading !== undefined) {
        filteredBooks = filteredBooks.filter(
            (book) => book.reading === (reading === '1'),
        );
    }

    if (finished !== undefined) {
        filteredBooks = filteredBooks.filter(
            (book) => book.finished === (finished === '1'),
        );
    }

    const response = {
        status: 'success',
        data: {
            books: filteredBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    };

    res.status(200).send(response);
};

const getBookById = (req, res) => {
    // Get specific book data by bookId
    const { id } = req.params;

    const book = books.filter((b) => b.id === id)[0];

    if (book !== undefined) {
        res.status(200).send({
            status: 'success',
            data: {
                book,
            },
        });
        return;
    }

    res.status(404).send({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
};

const editBookById = (req, res) => {
    const { id } = req.params;

    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = req.body;
    const updatedAt = new Date().toISOString();

    if (!name || name.trim() === '') {
        res.status(400).send({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        return;
    }

    if (readPage > pageCount) {
        res.status(400).send({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        return;
    }

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };

        res.status(200).send({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        return;
    }
    res.status(404).send({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
};

const deleteBookById = (req, res) => {
    // Delete a book by bookId
    const { id } = req.params;

    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
        books.splice(index, 1);
        res.status(200).send({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        return;
    }
    res.status(404).send({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
};

module.exports = {
    storeBook,
    getAllBooks,
    getBookById,
    editBookById,
    deleteBookById,
};
