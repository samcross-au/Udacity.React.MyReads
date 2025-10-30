import Book from './Book';

const Shelf = ({ page, shelves, shelf, books, onUpdateShelf }) => {
  const updateShelf = (book) => {
    onUpdateShelf(book);
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map((book) => {
              return <Book key={book.id} book={book} shelves={shelves} page={page} onMoveBook={updateShelf}/>
            })
          }
        </ol>
      </div>
    </div>
  )
}

export default Shelf;