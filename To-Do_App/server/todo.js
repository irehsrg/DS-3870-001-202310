const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { json } = require('body-parser');
const { uuid } = require('uuidv4');
const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'Baxterlilbit2003',
    database : 'todo'
})

const HTTP_PORT =  8000;

var app = express();
app.use(cors());
app.use(express.json());

app.listen(HTTP_PORT, () => {
    console.log("Our server is listening on port " + HTTP_PORT);
})

app.post("/createAccount", (req, res, next) => {

    let strEmail = req.query.Email || req.body.Email;
    let strPassword = req.query.Password || req.body.Password;


    pool.query("INSERT INTO tblusers VALUES (?,?)",[strEmail,strPassword], function(error, results){
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

app.get('/createAccount', (req, res, next) => {
    pool.query('SELECT * FROM tblusers', function(error, results){
        if(error){
            res.status(400).send(JSON.stringify({Error : error}));
        } else {
            res.status(200).send(results);
        }
    })
})

app.post('/createTask', (req, res, next) => {

    let strTaskID = uuid();
    let strTaskTitle = req.query.Title || req.body.Title;
    let strDescription = req.query.Description || req.body.Description;

    let strDueDate = req.query.DueDate || req.body.DueDate;


        pool.query("INSERT INTO tbltasks VALUES (?,?,?,?,'NEW',(SELECT Email FROM tblSessions WHERE SessionID = ?),GETDATE())",[strTaskID,strTaskTitle,strDescription,strSessionID,strDueDate], function(error, results){
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

app.get('/createTask', (req, res, next) => {
    pool.query('SELECT * FROM tbltasks', function(error, results){
        if(error){
            res.status(404).send(JSON.stringify({Error : error}));
        } else {
            res.status(200).send(results);
        }
    })
})