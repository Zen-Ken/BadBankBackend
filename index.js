var express = require('express');
var app     = express();
var cors    = require('cors');
require("dotenv").config();
//var dal     = require('./dal.js');
const e = require('express');
const { create, find, findOne,findAll, update, updateUser, resetPassword} = require('./dal');
// used to serve static files from public directory
app.use(express.static('public/'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    // check if account exists
    find(req.params.email).
        then((users) => {
            console.log(users)
            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else{
                // else create user
                create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {
    find(req.params.email).
        then((user) => {
            console.log(req.params.email)
            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                    //console.log(url)
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {
    find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {
    findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {
    var amount = Number(req.params.amount);
    update(req.params.email, amount).
        then((response) => {
            //console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', function (req, res) {

    findAll().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});
app.get('/account/updateUser/:email/:newEmail/:newName', function (req, res) {
    // check if account exists
    find(req.params.email).
        then((users) => {
            // if user exists, return error message
            console.log(users)
            if(users.length <= 0){
                console.log('User doesnt in exists');
                res.send('User doesnt in exists');
            }
            else {
                // else create user
                updateUser(req.params.email,req.params.name,req.params.newEmail,req.params.newName).
                    then((user) => {
                        console.log(user);
                        res.send(user);
                    });
            }

        });
});
app.get('/account/resetPassword/:email/:password', function (req, res) {
    find(req.params.email).
    then((users) => {
        console.log(users)
            if(users.length <= 0){
                console.log('User doesnt in exists');
                res.send('User doesnt in exists');
            }
            else{
                resetPassword(req.params.email, req.params.password).
                then((user) => {
                    console.log(user);
                    res.send(user);
                });
            }
    });
});
var port = 3000;
app.listen(port);
console.log('Running on http://localhost:' + port);