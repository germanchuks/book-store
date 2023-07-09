import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Add = () => {

  //Store user input book data to state function
  const [book, setBook] = useState({
    title: '',
    desc: '',
    cover: '',
    price: null,
  });
  
  //Assign user input values on each change
  const handleChange = (e) => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };
  
  //Allos navigation to pages
  const navigate = useNavigate()

  //Posts client input to server
  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8800/books", book)
      navigate('/')
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder='Title'
        name='title'
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder='Description'
        name='desc'
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder='Price'
        name='price'
        onChange={handleChange}
      />
      <input
        type="text"
        id="cover"
        placeholder='Cover'
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add