
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var session = require('express-session')

mongoose.connect('mongodb://localhost:27017/test'); // 기본 설정에 따라 포트가 상이 할 수 있습니다.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("Mongo On");
});

var user =mongoose.Schema({
  name : String,
  id : String,
  pass : String
});

var memo = mongoose.Schema({
	id : String,
	month : String,
	day : String,
	year : String,
	time : String,
	content : String
});

var userModel = mongoose.model("usertModel", user);

var memoModel = mongoose.model("memoModel",memo);

app.use(session({
  secret:'@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized:true
}));



// test.save(function(err,test){
//   if(err){
//     return console.error(err);
//   }
//   console.log(test)
// });
//

// userModel.find(function(err, models){
// 	if(err) return console.error(err);
// 	console.log(models);
// });



// memoModel.find(function(err, models){
// 	if(err) return console.error(err);
// 	console.log(models);
// });

// memoModel.find({date:"30",year:"2016"},function(err){
// 	if(err){
// 		return console.error(err);
// 	}
// 	console.log("sue")
//
// });

app.set('view engine', 'html')
app.set('views', 'views')
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(express.static('views'));

app.use(bodyParser.urlencoded({extended:false}));


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

app.post('/addDate',function(req, res){
		var time = req.body.date;
		var cont = req.body.content;
		var id = req.session.userId;
		var day = req.session.userDay;
		var month = req.session.userMonth;
		var year = req.session.userYear;

		var addMemo = new memoModel({"id":id,"time":time,"month":month,"year":year,"content":cont,"day":day});
		addMemo.save(function(err,addMemo){
			if(err){
	      return console.error(err);
	    }
			res.render("cal.html")
		});

});

app.post('/memoList',function(req,res){
		var id = req.session.userId;
		var day = req.session.userDay;
		var month = req.session.userMonth;
		var year = req.session.userYear;

		memoModel.find({"id":id,"day":day,"month":month,"year":year},function(err,models){
			if(err){
				return console.error(err);
			}
			if(models != ''){
				console.log(models)
				res.send(models);
			}
			else{
				res.send("0")
			}

		})
});

app.post('/sessionDay',function(req, res){
	var day = req.body.day;
	var month = req.body.month;
	var year = req.body.year;

	req.session.userDay =day;
	req.session.userMonth = month;
	req.session.userYear = year;

	res.send("5");
});

app.post('/checkId',function(req, res,callback){
		console.log(req.session.userId)
    if(req.session.userId == null){
      res.send("1");
    }
		else{
			res.send("0");
		}

});

app.post('/register',function(req, res){
// var test = new userModel({name:"Jhun24",id:"jhun",pass:"1234"});
  var id = req.body.id;
  var ps = req.body.ps;
  var nm = req.body.name;



  var userData = new userModel({name:nm,id:id,pass:ps});
  userData.save(function(err,userData){
    if(err){
      return console.error(err);
		}
  });
	res.render("index.html")

});

app.post('/login',function(req, res){
  var id = req.body.id;
  var ps = req.body.ps;

	userModel.find({"id":id,"pass":ps},function(err , models){
		if(err){
			return console.error(err)
		}
		if(models != ''){
				console.log(models)
				req.session.userId = id
				res.render("cal.html")
		}
		else{
			res.send("<script>alert(\"login Error\")</script>")
			res.render("index.html")
		}

	})

});


app.get('/',function(req, res){
    res.render('index.html');
});

app.listen(3000,function(){
  console.log("Port 3000 Connection");
})
