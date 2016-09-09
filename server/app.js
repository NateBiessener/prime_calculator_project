var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var path = require('path');

app.listen('3000', 'localhost', function(){
  console.log('listening on port 3000');
});//end listen

app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('public/index.html'));
});//end get

app.post('/add', urlencodedParser, function(req, res){
  res.send(200, Number(req.body.x) + Number(req.body.y));
});//end add post

app.post('/subtract', urlencodedParser, function(req, res){
  res.send(200, Number(req.body.x) - Number(req.body.y));
});//end subtract post

app.post('/multiply', urlencodedParser, function(req, res){
  res.send(200, Number(req.body.x) * Number(req.body.y));
});//end multiply post

app.post('/divide', urlencodedParser, function(req, res){
  res.send(200, Number(req.body.x) / Number(req.body.y));
});//end divide post

app.use(express.static('public'));
