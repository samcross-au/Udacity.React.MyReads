import * as BooksAPI from "../BooksAPI";

const Book = ({ book, page, shelves, onMoveBook }) => {
  const handleChange = (event) => {
    const shelf = event.target.value;
    event.preventDefault();

    BooksAPI.update(book, event.target.value).then((res) => {
      onMoveBook(book, shelf);
    })
  }

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
              `url("${book.imageLinks.thumbnail}")`,
            }}
          />
          <div className="book-shelf-changer">
            <select name="book-shelf-select" value={book.shelf || 'none'} onChange={handleChange}>
              <option value="none" disabled>Move to...</option>
              {
                shelves.filter((shelf) => shelf.view === 'library').map((shelf) => {
                  return <option key={shelf.key} value={shelf.key}>{shelf.name}</option>
                })
              }
              {
                (page === 'library') && (
                  <>
                    <hr />
                    <option value="none">Remove from Library</option>
                  </>
                )
              }
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.map((author, index) => (
            <div key={index}>{author}</div>
          ))}
        </div>
      </div>
    </li>
  )
}

export default Book;