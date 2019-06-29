//라우터 처리 통합으로 할 곳! 미들웨어 활용

var express = require('express');
var app = express();
var router = express.Router();   //라우터 메소드 이용.
var path = require('path');  //상대경로 편하기 작성하기 위해서 쓰는 모듈
var main = require('./main/main');  //만들어진 모듈 호출
var email = require('./email/email');
var signup = require('./signup/signup');
var join = require('./join/index');
var login =require('./login/login');
var logout =require('./logout/index');

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/main.html"));
});

router.use('/main', main); // /main으로 주소값이 호출되면 main 모듈을 실행해라.
router.use('/email', email);
router.use('/signup', signup);  //회원가입 버전1
router.use('/join', join);   //회원가입 버전2(passport 기반 회원가입 구현)
router.use('/login',login);
router.use('/logout',logout);
module.exports = router;