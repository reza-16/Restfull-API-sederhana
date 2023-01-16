const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const {db} = require('./model/dbConnection.js');



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));

// Read
app.get('/api/dataUser', (req,res) =>{
    const sqlQuery = "SELECT * FROM user";
    db.query(sqlQuery, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
            console.log(result)
        }
    });
});
app.get('/api/dataUser/:user_email',(req,res) => {
    const userEmail = req.params.user_email;

    const sqlQuery = "SELECT * FROM user WHERE user_email = ?";
    db.query(sqlQuery, userEmail, (err,result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
            console.log(result)
        };
    });
});

// Create
app.post('/api/createUser', (req,res) => {
    const userName = req.body.user_name;
    const userEmail = req.body.user_email;
    const userId = req.body.user_id;
    const userPassword = req.body.user_password;
    
    const sqlQuery = "INSERT INTO user (user_name, user_email, user_password, user_id) VALUE (?,?,?,?)";
    db.query(sqlQuery, [userName, userEmail, userPassword, userId], (err,result) =>{
        if(err) {
            console.log(err)
        } else {
            res.send(result)
            console.log(result)
        };
    });
    })

// Update
app.put('/api/updateUser', (req,res) => {
    const userName = req.body.user_name;
    const userEmail = req.body.user_email;
    const userPassword = req.body.user_password;
    
    const sqlQuery = "UPDATE user SET user_name = ?, user_password = ? WHERE user_email = ?" 
    db.query(sqlQuery, [userName, userPassword, userEmail], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
            console.log(result)
        };
    })
})

// Delete
app.delete ('/api/deleteUser', (req,res) => {
    const userId = req.body.user_id;
    const sqlQuery = "DELETE from user WHERE user_id = ?"
    db.query(sqlQuery, userId, (err,result) =>{
        if(err) {
            console.log(err)
        } else {
            res.send(result)
            console.log(result)
        };
    })
})

app.listen(3001, () => {
    console.log("server berjalan pada port 3001")
})