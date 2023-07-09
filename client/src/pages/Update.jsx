import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Update = () => {

  //Store user input book data to state function
  const [selectedBook, setSelectedBook] = useState('')

  //Reassign user input values on each change
  const handleChange = (e) => {
    setSelectedBook(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };

  //Allows navigation to pages
  const navigate = useNavigate()

  //Get ID of selected book using react router location
  const location = useLocation()
  const bookId = location.pathname.split('/')[2]


  //Fetch selected book database using ID
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books/" + bookId)
        setSelectedBook(res.data[0])
        
      } catch (err) {
        console.log(err)
      }
    }
    fetchBook()
  },[bookId])

  
  //Posts client input to server
  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.put("http://localhost:8800/books/" + bookId, selectedBook)
      //Navigate back to homepage after data update
      navigate('/')
    } catch (err) {
      console.log(err)
    }

  }

  

  return (
    <div className="form">
      <h1>Update Book</h1>
      <input
        type="text"
        placeholder='Title'
        name='title'
        defaultValue={selectedBook.title}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder='Description'
        name='desc'
        defaultValue={selectedBook.desc}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder='Price'
        name='price'
        defaultValue={selectedBook.price}
        onChange={handleChange}
      />
      <input
        type="text"
        id="cover"
        placeholder='Cover'
        name="cover"
        defaultValue={selectedBook.cover}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update