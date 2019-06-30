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
    password : '!Qwer4321',
    database :'jsman'
});

connection.connect();

//라우터 처리  
router.get('/', (req, res)=>{
    console.log('get join url');//로그인 인증 실패시 다시 이리로 들어옴.
    var msg;
    var errMsg = req.flash('error');
    if(errMsg) msg = errMsg;
    res.render('join.ejs',{'message' : msg})   
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


//strategy를 등록, 실질적인 로직처리는 여기에.
//인증처리는 실제여기서. db 조회 로직 여기다가 작성하고, 밑에 post로 들어오면 여기서 체크하는 것임.
passport.use('local-join', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
    }, function(req, email, password, done){
    //인증처리부분 작성  (회원가입처리였음.. ver2)
    //console.log('local-join callback called');
      var query = connection.query('select * from user where email=?', [email], function(err,rows){
        if(err) return done(err);
        if(rows.length){
            console.log('exsited user');
            return done(null, false, {message : 'your email is already used'})
        }else{
          console.log("없음")
          var sql = {email : email, name: "jinse", password : password};
          var query = connection.query('insert into user set ?', sql, function(err, rows){
            if(err) throw err;
            return done(null, {'email' : email, 'id' : rows.insertId}); //세션에 담을 정보.
          })
        }
      })    
    } 
));

//이게 동작하면 authenticate() 메서드 실행되고 이 값처리는 위의 passport부분에서 실행한다.
router.post('/',passport.authenticate('local-join',{
    successRedirect : '/main',  //인증성공시 이동하는화면주소
    failureRedirect : '/join',  //인증실패시 이동하는화면주소
    failureFlash : true   //passport 인증하는 과정에서 오류발생시 플래시 메시지가 오류로 전달됨.
}));

// //제출버튼 클릭하면 Cannot POST /signup 이렇게 뜬다. form 태그에 post 방식으로 지정했기 때문에 라우터에서도 post 방식으로 가져와야한다.
// router.post('/', (req, res)=> {
//     //정보값 받아서 데이터베이스에 저장
//     var body = req.body;      // req임. res아님. 클라 요청값 받는거니깐 req임.
//     var email = body.email;
//     var name = body.name;
//     var password = body.password;    
//     console.log(email, name, password);
//     var sql = {email : email, name : name, pw : password};  //'insert into user (email,name,pw) values ("'+email+'", "'+name+'","'+password+'")'
//     //DB저장
//     var query = connection.query('insert into user set ?',sql, function(err, rows){
//         if(err) throw err;     
//         else res.render('welcome.ejs', {'name': name, 'id': rows.insertId});
        
//     });
// })



module.exports = router;  //모듈 만든거임.