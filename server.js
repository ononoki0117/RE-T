const express = require("express");

const app = express();

const port = 8080;

const path = require("path");

app.use(express.static(path.resolve((path.join(__dirname, 'main/src')))));

app.listen(port, ()=>{
    console.log('app started');
})

app.get('/', function(req, res){
    res.sendFile(path.resolve('./main/main/index.html'));
});

