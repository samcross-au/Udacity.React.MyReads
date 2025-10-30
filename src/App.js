import "./App.css";

import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import Library from "./pages/Library";
import Search from "./pages/Search";


function App() {
  const [books, setBooks] = useState([]);

  const shelves = [
    { key: "currentlyReading", name: "Currently Reading", view: 'library'},
    { key: "wantToRead", name: "Want to Read", view: 'library'},
    { key: "read", name: "Read", view: 'library'},
    { key: "search", name: "Search Results", view: 'search' },
  ];

  const updateBooks = () => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={
        <Library shelves ={shelves} books={books} onLibraryUpdate={updateBooks}/>
      }/>
      <Route path="/search" element={
        <Search shelves ={shelves} books={books} onLibraryUpdate={updateBooks} />
      }/>
    </Routes>
  );
}

export default App;
