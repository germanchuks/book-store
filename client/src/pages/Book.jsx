import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Book = () => {
  const [books, setBooks] = useState([])

  //Fetch
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books")
        setBooks(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchAllBooks()
  }, [])

  //Delete request to API using book ID 
  const handleDelete = async (id) => {
    try{
      await axios.delete('http://localhost:8800/books/'+id)
      //Reload window
      window.location.reload()
    } catch(err) {
      console.log(err)
    }
  }
  return (
    <div className='bookContainer'>
      <h1>German Book Shop</h1>
      <div className="books">
        {books.map(book=>(
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt='' />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
            <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
          </div>
        ))}
      </div>
      <button><Link to='/add'>Add new book</Link></button>
    </div>
  )
}

export default Book