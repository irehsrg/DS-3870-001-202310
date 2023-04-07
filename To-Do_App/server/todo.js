const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { json } = require('body-parser');
const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'Mickey2023!',
    database : 'test'
})

const HTTP_PORT =  8000;

var app = express();
app.use(cors());
app.use(express.json());

app.listen(HTTP_PORT, () => {
    console.log('Our server is listening on port ' + HTTP_PORT);
})

app.post("/test", (req, res, next) => {
    res.status(200).send('{"FirstName" : "Post-Alex", "LastName" : "Post-Joines"}');
})

app.get('/test', (req, res, next) => {
    pool.query('SELECT * FROM tblusers', function(error, results){
        if(error){
            res.status(400).send(JSON.stringify({Error : error}));
        } else {
            res.status(200).send(results);
        }
    })
})

app.get('/testCar', (req, res, next) => {
        res.status(400).send(JSON.stringify({color : 'blue'}));
    })



app.post('/cars', (req, res, next) => {

    let strMake = req.query.make || req.body.make;
    let strModel = req.query.model || req.body.model;

        pool.query("INSERT INTO tblCars VALUES (?,?)", [strMake, strModel], function(error, results){
        if(error){
            res.status(400).send(JSON.stringify({Error : error}));
        } else {
            if(results.affectedRows > 0){
                res.status(200).send(results);
            } else {
                res.status(400).send(results);
            }
            
        }
    })
})

app.get('/cars', (req, res, next) => {
    pool.query('SELECT * FROM tblCars', function(error, results){
        if(error){
            res.status(400).send(JSON.stringify({Error : error}));
        } else {
            res.status(200).send(results);
        }
    })
})

app.get('/test2', (req, res, next) => {
    res.status(200).send('{"FirstName" : "Johm", "LastName" : "Doe"}');
})