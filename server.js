// Configure dotenv 
const dotenv = require('dotenv').config();

// Configure node express server
const express = require("express");
const app = express();
const port = process.env.PORT;

// Configure 'path' for Window => Not useful with Mac
const path = require("path");

// Configure MongoDB
const database = require('./common/database/database.connect').connect;

// Application Setting
// Setting ./public as static folder
app.use(express.static('public'));

// Setting bodyparser for request body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Setting ejs template engine 
app.set('view engine', 'ejs');

// Setting ./domain as views folder
app.set('views', './domain');

// Setting router module
app.use('/', require('./domain/login/login.js'));
app.use('/', require('./domain/sign-up/sign-up.router.js'))

// Basic Router 
// Todo: Eliminate router code in server.js 
app.get('/', function (req, res) {
    res.redirect('/login');
});

// Start Server
app.listen(port, () => {
    console.log('app started');
})