// node 預設模組
var path = require('path');

// NPM 模組
var app = require('express')();
var express = require('express');
var partials = require('express-partials');
var static = require('serve-static');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
//session的
var session = require('express-session');

// router設定
var page = require('./routes/page');

// parse application/x-www-form-urlencoded 
// 讓回傳的值可以解析 json與 urlencoded
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true}));
//app.use(multer({ dest: './uploads/'}));
app.use(express.static(path.join(__dirname, 'public')));

// 版型設定
app.use(partials());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 3000));

//設定預設指定目錄
//app.use( static( path.join( __dirname, '/public' )));
app.use('/public', express.static(__dirname + '/public'));
//session
app.use(session({secret : "bigcanisgood"}));
app.use(function(req, res, next){
  res.locals.uNum=req.session.uNum;
  next();
});

//預設favicon.ico位置
app.use(favicon(__dirname + '/public/icon.png'));

//路徑設定，有get與post指令
app.get('/', page.index);
app.get('/register', page.register);
app.post('/rSuccess',page.rSuccess);
app.get('/login', page.login);
app.post('/lResult', page.lResult);
app.get('/logout', page.logout);
app.get('/painter', page.painter);
app.get('/personal', page.personal);
app.get('/work', page.work);
app.post('/pResult', page.pResult);

//session
var sess;
app.get('/',function(req,res){
    sess=req.session;
    sess.uNum;
});


//偵測3000 port
var server = app.listen(app.get('port'), function() {  
  console.log('Listening on port 3000');  
});
