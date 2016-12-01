
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
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
	content : String,
	setMonth: String
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

app.post('/memoList',function(req, res){
	memoModel.find({"id":req.session.userId,"year":req.session.userYear,"month":req.session.userMonth,"day":req.session.userDay},function(err,models){
		if(models != ''){
			res.send(models)
		}
		else{
			res.send("1")
		}
	})
})

app.post('/addMemo',function(req, res){
	console.log("Input addMemo")
	var inputMemo = new memoModel({"id":req.session.userId,"year":req.session.userYear,"day":req.session.userDay,"month":req.session.userMonth,"setMonth":req.body.setMonth,"time":req.body.time,"content":req.body.content})
	console.log(inputMemo)
	inputMemo.save(function(err,models){
		console.log("ModelSuccess")
	})
	res.send("0");
})

app.post('/sessionInputDay',function(req, res){
	console.log("sessionInputDay Come")
	req.session.userDay = req.body.day
	req.session.userMonth = req.body.month
	req.session.userYear = req.body.year

	res.send("Session input finish")
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

app.post('/login',function(req, res){
	var id = req.body.id;
  var ps = req.body.ps;

	userModel.find({"id":id,"pass":ps},function(err,models){
		if(err){
			return console.error(err)
		}

		if(models != ''){
			req.session.userId = id;
			res.render("cal.html")
		}
		else{
			res.render("index.html")
		}
	});
});


app.post('/register',function(req, res){
  var id = req.body.id;
  var ps = req.body.ps;
  var name = req.body.name;

  var regi = new userModel({"name":name,"id":id,"pass":ps});
	userModel.find({"id":id},function(err,model){
		if(err){
			return console.error(err)
		}
		if(model == ''){
			regi.save(function(err,models){
				console.log(models)
				if(err){
					return console.error(err);
				}
				if(models != ''){

					res.render("index.html");
				}
				console.log(models)
			});
		}
		else{
			res.render("index.html");
		}
	});
	
});



app.get('/',function(req, res){
    res.render('index.html');
});

app.listen(3000,function(){
  console.log("Port 3000 Connection");
})
