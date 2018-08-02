var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var app = express();
var bodyparser = require("body-parser");
const bcrypt = require('bcrypt-as-promised');
var session = require('express-session');
mongoose.Promise = global.Promise;

app.use(session({
    secret: 'hackthisidoubtit',
    resave: false,
    saveUninitialized: true,
})) 

app.use(express.static( __dirname + '/public/dist' ));
app.use(bodyparser.json());
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});


app.listen(8082, function(){
    console.log("listening to port 8082");
});