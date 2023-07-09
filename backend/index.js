import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express()

// const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'German12345',
    database: 'practice',


})

//Allow clientside to access API endpoints
app.use(cors())

//Allow json file from client side using express
app.use(express.json())

//GETTING REQUEST USING EXPRESS SERVER
app.get('/', (req, res) => {
    res.json("This is the backend!")
})

app.get('/books', (req, res) => {
    const qry = "SELECT * FROM practice_table";
    db.query(qry, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

//POSTING
app.post('/books', (req, res) => {
    const qry = "INSERT INTO practice_table (`title`,  `desc`, `cover`, `price`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];
    db.query(qry, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been created successfully");
    })
})

//Delete request from client side. 
app.delete('/books/:id', (req,res) => {
     const bookId = req.params.id;
     const qry = 'DELETE FROM practice_table WHERE id = ?'

     db.query(qry, [bookId], (err,data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted successfully.")
     })
})

//Update request from client side. 
app.put('/books/:id', (req,res) => {
    const bookId = req.params.id;
    const qry = 'UPDATE practice_table SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?';

    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];

    db.query(qry, [...values, bookId], (err,data) => {
       if (err) return res.json(err);
       return res.json("Book has been updated successfully.")
    })
})

//getting selected book only
app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const qry = "SELECT * FROM practice_table WHERE id = ?";
    db.query(qry, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})



//RUNNING APPLICATION TO PORT 8800
app.listen(8800, () => {
    console.log("Connected to backend once again!")
})