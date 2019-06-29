//기존 app.js에서 작성된 라우터를 모듈로 뻄..
var express = require('express');
var app = express();
var router = express.Router();   //라우터 메소드 이용.
var path = require('path');  //상대경로 편하기 작성하기 위해서 쓰는 모듈
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');


//DB 셋팅;
var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '-----',
    database :'jsman'
});

connection.connect();

//라우터 처리  
router.get('/', (req, res)=>{
    console.log('get login url');//로그인 인증 실패시 다시 이리로 들어옴.
    var msg;
    var errMsg = req.flash('error');
    if(errMsg) msg = errMsg;
    res.render('login.ejs',{'message' : msg})   
});

//serialize 처리 해주어야함.(세션에 넣어줘야함) 
passport.serializeUser(function(user, done){
  console.log('passport session save : ', user.id)
  done(null, user.id);
});

//요청시 세션값 뽑아서 페이지 전달 
passport.deserializeUser(function(id, done){
  console.log('passport session get id : ', id)
  done(null, id);
})


//strategy를 등록, 이걸 사용하기 위해서 등록한 거임.
//인증처리는 실제여기서. db 조회 로직 여기다가 작성하고, 밑에 post로 들어오면 여기서 체크하는 것임.
passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
    }, function(req, email, password, done){
       //로그인 인증처리
       console.log("로그인 처리??")
      var query = connection.query('select * from user where email=?', [email], function(err,rows){
        if(err) return done(err);
        if(rows.length){          
            return done(null, {'email': email, 'id' : rows[0].id})
        }else{
            return done(null, false, {'message' : 'your Login info is not found >.<'}); //세션에 담을 정보.
        }
      })    
    } 
));

//커스텀 콜백사용할 예정(ajax니깐 json 응답을 줘야하기때문에 커스텀 콜백사용)
router.post('/',function(req, res, next){
    console.log("커스텀 콜백");
    passport.authenticate('local-login', function(err, user, info){
        if(err) res.status(500).json(err);
        if(!user) return res.status(401).json(info.message)

       // req.login을 이용해서 serialize 기능이 자연스럽게 이어지도록 되어있음.
       req.logIn(user, function(err){
           if(err) {return next(err);}
           return res.json(user);
       });
    })(req, res, next); //authenticate 반환 메서드에 이 인자를 넣어서 처리해야함.
});





module.exports = router;  //모듈 만든거임.