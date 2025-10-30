import { Link } from "react-router-dom";

import Shelf from "../components/Shelf";

const Library = ({shelves, books, onLibraryUpdate}) => {
  const page = 'library'
  
  return (
    <div className="library">
      <div className="library-title">
        <h1>MyReads</h1>
      </div>
      <div className="library-content">
        <div>
          {
            shelves.filter((shelf) => shelf.view === page).map((shelf) => {
              const booksOnShelf = books.filter((book) => book.shelf === shelf.key);
              return <Shelf key={shelf.key} page={page} shelves={shelves} shelf={shelf} books={booksOnShelf} onUpdateShelf={onLibraryUpdate} />
            })
          }
        </div>
      </div>
      <div className="open-search">
        <Link className="search-books" to="/search">
          Add a book
        </Link>
      </div>
    </div>
  );
}

export default Library;