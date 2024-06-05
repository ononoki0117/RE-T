const express = require("express");
const app = express();
const port = 8080;

const path = require("path");

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './domain');

app.use('/', require('./domain/login/login.js'));
app.use('/', require('./domain/sign-up/sign-up.js'))

app.listen(port, () => {
    console.log('app started');
})

app.get('/', function (req, res) {
    res.redirect('/login');
});

