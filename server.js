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

// Setting session for auth
let session = require('express-session');
app.use(session({
    secret: 'dkufe9',
    resave: false,
    saveUninitialized: true,
}))

// Setting ejs template engine 
app.set('view engine', 'ejs');

// Setting ./domain as views folder
app.set('views', './domain');

// Setting router module
app.use('/', require('./router'));

// Start Server
app.listen(port, () => {
    console.log('app started');
})