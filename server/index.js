const express = require("express");
const http = require('http');
const app = express();
const cors = require("cors");
const pool = require("./db");
const socketIO = require('socket.io');
const path= require("path");

const port = process.env.PORT || 5000;

const server = http.Server(app);

const io = socketIO(server);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..') + '/books-shop/build/index.html');
});

app.post("/books", async (req, res) => {
  try {
    const { title } = req.body;
    const { description } = req.body;
    const newBook = await pool.query(
      "INSERT INTO books (title, description) VALUES($1, $2) RETURNING *",
      [title, description]
    );
    res.json(newBook.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all books

app.get("/books", async (req, res) => {
  try {
    const allBooks = await pool.query("SELECT * FROM books");
    res.json(allBooks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a book

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await pool.query(
      "SELECT * FROM books WHERE item_id = $1", 
      [id]
    );

    res.json(book.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get a book comment

app.get("/books/:id/comment", async (req, res) => {
  try {
    const { id } = req.params;
    const allComments = await pool.query("SELECT * FROM comments WHERE item_id = $1 ", [id]);
    res.json(allComments.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/books/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const newComment = await pool.query(
      "INSERT INTO comments (item_id, description) VALUES($1, $2) RETURNING *",
      [id, comment]
    );
    res.json(newComment.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});




//update a todo

app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE books SET (title, description) = ($1, $2) WHERE item_id = $3",
      [title, description, id]
    );

    res.json("Book was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await pool.query(
      "DELETE FROM books WHERE item_id = $1", 
      [id]
  );
    res.json("Books was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});



server.listen(port, () => {
  console.log(path.resolve(__dirname, '..') + '/books-shop/public/index.html');
  console.log("server has started on port", port);
});