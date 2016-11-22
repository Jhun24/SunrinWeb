
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var session = require('express-session')
// mongoose.connect('mongodb:localhost:27017/test');
// var db = mongoose.connection;
// db.on('error',console.error.bind(console, 'connection error:'));
// db.once('open',function callback(){
//   console.log("db Connection")
// });


app.set('view engine', 'html')
app.set('views', 'views')
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(express.static('views'));

app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
  key:'janghun',
  secret:'keycode'
}));

//setHeaders
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// app.get('/template',function(req, res){
//   //req.query.id
//   res.send(req.query.id)
// });

// etc
app.get('/checkId',function(req, res,callback){
  var a;
  console.log(req.session.userId)
  if(req.session.userId == 'admin'){
    res.json({"a":"1"})
  }
  else{
    res.json({"a":"0"})
  }
});

// finish etc

// server
app.get('/login',function(req, res){

    res.render('login.html');

});

app.post('/loginCheck',function(req, res){
  var id = req.body.id;
  var ps = req.body.ps;

  if(id == 'admin' && ps=='1234'){
    req.session.userId = id;
    res.render('index.html');
  }
  else{
    res.render('loginError.html');
  }

});

// server finish


//connect

app.get('/',function(req, res){
    res.render('index.html');
});
//connect finish

// app.post('/testRec',function(req, res){
//   var s = req.body.title;
//   console.log(s)
//   fs.writeFire('/views'+s,s,'utf-8')
//   res.send(s);
// });

app.listen(3000,function(){
  console.log("Port 3000 Connection");
})
