//首頁

/*****************FIREBASE*****************/
/*****************FIREBASE*****************/
/*****************FIREBASE*****************/

var firebase = require("firebase");
var config = {
   apiKey: "AIzaSyA33Jnuyt58rnNaddr_O8YmsVmrAn1OmhE",
   authDomain: "supercp-a8e9e.firebaseapp.com",
   databaseURL: "https://supercp-a8e9e.firebaseio.com/",
   storageBucket: "supercp-a8e9e.appspot.com"
 };
firebase.initializeApp(config);

var database = firebase.database();

//讀users資料表
var users= new Array();
firebase.database().ref('/user').once('value').then(function(snapshot) {
  users=snapshot.val();
  console.log(users);
});

//註冊帳號
function register(num, uAccount, uPwd, uName) {
    var point=0;
    var userRef = database.ref('user/'+num);//num?
    userRef.set({
      uAccount: uAccount,
      uPwd: uPwd,
      uName: uName,
      point: point
    });
    firebase.database().ref('/user').once('value').then(function(snapshot) {
      users=snapshot.val();
    });  
}

//檢查登入
function loginCheck(uAccount, uPwd){
  firebase.database().ref('/user').once('value').then(function(snapshot) {
    users=snapshot.val();
  });
  for (var i=1;i<=users.length;i++){
    if (uAccount==users[i].uAccount && uPwd==users[i].uPwd){
      return i;
      break;
    }
  }
  return 0;
}


/*****************--------*****************/
/*****************--------*****************/
/*****************--------*****************/


exports.index = function(req, res) {


  if(req.session.uNum!=null){
    res.render('pages/index',{
      uName: users[req.session.uNum].uName
    });
  }else{
    res.render('pages/index',{
      uName: ""
    });
  }
  
};

exports.register = function(req, res){
    res.render('pages/register',{
    users: users
  });
};

exports.rSuccess = function(req, res){
  
  num=req.body.num;
  uAccount=req.body.uA;
  uPwd=req.body.uP;
  uName=req.body.uN;

  register(num, uAccount, uPwd, uName);
  res.render('pages/rSuccess',{
    uName: uName
  });
};

//還有問題
exports.login = function(req, res){
  var message="你已登入囉！";
  if (req.session.uNum!=null) {
    res.redirect('/',{
      uName: users[req.session.uNum].uName,
      message: message
    },0);
  }else{
    res.render('pages/login');
  }
};
exports.lResult = function(req, res){
  uA=req.body.uA;
  uP=req.body.uP;

  if(loginCheck(uA, uP)==0){
    res.render('pages/lResult',{
      uName: "",
      path: "login",
      result: 0

    });

  }else{

    req.session.uNum=loginCheck(uA, uP);
    res.render('pages/lResult',{
      uName: users[req.session.uNum].uName,
      path: "",
      result: 1
    });
  }
};


exports.painter = function(req, res) {
  if(req.session.uNum!=null){
    res.render('pages/painter',{
      uName: users[req.session.uNum].uName
    });
  }else{
    res.render('pages/painter',{
      uName: ""
    });
  }
};

exports.personal = function(req, res) {
  if(req.session.uNum!=null){
    res.render('pages/personal',{
      uName: users[req.session.uNum].uName
    });
  }else{
    res.render('pages/personal',{
      uName: ""
    });
  }
};





