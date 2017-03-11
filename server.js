/**
 * Created by phuoclam on 31/12/2016.
 */
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');


var authencationController = require("./server/controllers/authencation-controller");
var japanController = require("./server/controllers/japan-controller");
var clientJapanController = require("./server/controllers/client/asian/japan/japan-controller");

var app = express();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/tova");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/admin', express.static(__dirname + '/admin'));
app.use('/client', express.static(__dirname + '/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/public', express.static(__dirname + '/public'));

app.get('/dashboard', authencationController.checkLogin, function (req,res) {
    res.sendfile('index.html');
});

app.get('/login', function (req, res) {
   res.sendfile('server/views/login.html');
});

// Authencation
app.post('/api/dashboard/user/signup', authencationController.signup);
app.post('/api/dashboard/user/login', authencationController.login);

// Japan
app.get('/api/dashboard/japan-study-aboard', authencationController.checkLogin, japanController.fetch);
app.post('/api/dashboard/japan-study-aboard/create', authencationController.checkLogin, japanController.create);
app.post('/api/dashboard/japan-study-aboard/delete/:id', authencationController.checkLogin, japanController.delete);
app.post('/api/dashboard/japan-study-aboard/update', authencationController.checkLogin, japanController.update);


// Upload Images
require('./server/controllers/post-image-controller')(app);



// Client
app.get('/', function (req,res) {
    res.sendfile('server/views/client/index.html');
});

app.get('/api/asian/japan', clientJapanController.fetch);

app.get('/asian/japan/detail/1', function (req,res) {
    res.sendfile('server/views/client/asian/japan/detail.html');
});

app.listen('3000', function () {
   console.log("server start ");
});
