var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

app.get('/list', (req, res) => {
    fs.readFile(__dirname + "/" + "list.json", 'utf8', (err, data) => {
        if (err) throw err;
        console.log("Request for list data")
        res.end(data);
    });        
})

app.post('/update', (req, res) => {
    var data = JSON.stringify (req.body );
    fs.writeFile(__dirname + "/" + "list.json", data, 'utf8', (err) => {
        if (err) throw err;
        console.log("List updated")
        res.end(data);
    });
})

var server = app.listen(8081, function () {
    var host = "localhost"
    var port = server.address().port
    console.log("API listening at http://%s:%s", host, port)
})