import React, { useEffect, useState } from "react";
import axios from 'axios';
import './App.css';

function App() {

  useEffect(() => {
    axios.get('http://localhost:3001/auth/list')
      .then((res) => {
        setBooks(res.data.listBook)
      });
  }, []);

  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState('');
  const [autorName, setAutorName] = useState('');
  const [year, setYear] = useState('');
  const [newBookName, setNewBookName] = useState('');
  const [newAutorName, setNewAutorName] = useState('');
  const [newYear, setNewYear] = useState('');

  const addBook = () => {
    axios.post('http://localhost:3001/auth/list/create', {
      bookName: bookName,
      autorName: autorName,
      year: year
    }).then((res) => {
      console.log(res);
    });

    setBooks([...books,
    { bookName: bookName, autorName: autorName, year: year }
    ]);
  };

  const deleteBook = (bookId) => {
    axios.delete(`http://localhost:3001/auth/list/delete/${bookId}`)
  }

  const updateBook = (bookName, autorName, year, bookId) => {
    axios.put(`http://localhost:3001/auth/list/update/${bookId}`, {
      bookName: newBookName ? newBookName : bookName,
      autorName: newAutorName ? newAutorName : autorName,
      year: newYear ? newYear : year
    });
    setNewBookName('');
    setNewAutorName('');
    setNewYear('');
  }

  return (
    <div className="App">
      <h1>CRUD Library</h1>
      <input type="text" placeholder="Name of Book"
        onChange={(event) => {
          setBookName(event.target.value);
        }}
      />
      <input type="text" placeholder="Autor Name"
        onChange={(event) => {
          setAutorName(event.target.value);
        }}
      />
      <input type="Number" placeholder="Year"
        onChange={(event) => {
          setYear(event.target.value);
        }}
      />
      <div className="Button">
        <button onClick={addBook}>Add Book</button>
      </div>
      { books.map((book) => {
        return (
          <div key={book._id} className="book">
            <h2 className="book-details">Name Book: {book.bookName}({book.year})</h2>
            <p>Autor: {book.autorName}</p>
            <input type="text" placeholder="New Name of Book"
              onChange={(event) => {
                setNewBookName(event.target.value);
              }}
            />
            <input type="text" placeholder="New Autor"
              onChange={(event) => {
                setNewAutorName(event.target.value);
              }}
            />
            <input type="Number" placeholder="New Year"
              onChange={(event) => {
                setNewYear(event.target.value);
              }}
            />
            <button
              className="Edit"
              onClick={() => {
                updateBook(
                  book.bookName,
                  book.autorName,
                  book.year,
                  book._id
                )
              }}>Edit</button>
            <button
              className="Delete"
              onClick={() => {
                deleteBook(book._id)
              }}>Delete</button>
          </div>
        )
      })
      }
    </div>
  )
}

export default App;