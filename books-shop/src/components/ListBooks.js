import React, {useState} from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import EditBook from "./EditBook";
import InputBook from "./InputBook";

import ViewBook from "./ViewBook";
const ListBooks = () => {
  const [books, setBooks] = React.useState([]);

  //delete todo function

  const deleteBook = async id => {
    try {
      const deleteBook = await fetch(`http://localhost:5000/books/${id}`, {
        method: "DELETE"
      });

      setBooks(books.filter(book => book.item_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/books");
      const jsonData = await response.json();

      setBooks(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  React.useEffect(() => {
    getBooks();
  }, []);

  console.log(books);

  return (
    <div>
      <h1 className="text-center mt-5">Catalog of Books</h1>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.item_id}>
              <td>{book.title}</td>
              <td>{book.description}</td>
              <td>
                <EditBook book={book} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteBook(book.item_id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <ViewBook book={book}/>
                {/* <NavLink className={"navbar-brand"} to={`/books/${book.item_id}`}>List Book</NavLink> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBooks;
