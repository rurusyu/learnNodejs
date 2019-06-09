//라우터 처리 통합으로 할 곳! 미들웨어 활용

var express = require('express');
var app = express();
var router = express.Router();   //라우터 메소드 이용.
var path = require('path');  //상대경로 편하기 작성하기 위해서 쓰는 모듈
var main = require('./main');  //만들어진 모듈 호출
var email = require('./email');

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/main.html"));
});

router.use('/main', main); // /main으로 주소값이 호출되면 main 모듈을 실행해라.
router.use('/email', email);

module.exports = router;