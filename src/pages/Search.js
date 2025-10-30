import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as BooksAPI from "../BooksAPI";

import Shelf from "../components/Shelf";

const Search = ({ shelves, books, onLibraryUpdate }) => {
  const page = 'search';

  const [foundBooks, setFoundBooks] = useState([]);
  let query = '';
  
  const handleSubmit = (event) => {
    event.preventDefault();
    query = event.target.query.value;

    if (!query) {
      setFoundBooks([]);
      return;
    }

    BooksAPI.search(query, 50).then((results) => {
      if (!results || results.error) {
        setFoundBooks([]);
        return;
      }

      const newBooks = results.filter((result) => books.filter((book) => book.id === result.id).length <= 0);
      setFoundBooks(newBooks);
    });
  }

  const handleMoveToShelf = (book, shelf) => {
    setFoundBooks(foundBooks.filter((b) => b.id !== book.id));
    onLibraryUpdate(book, shelf);
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" >
          Close
        </Link>
        <form className="search-books-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Search by title, author, or ISBN" name="query" />
        </form>
      </div>
      <Shelf page={page} shelves={shelves} shelf={shelves.find((shelf) => shelf.view === page)} books={foundBooks} onUpdateShelf={handleMoveToShelf} />
    </div>
  );
}

export default Search;