//기존 app.js에서 작성된 라우터를 모듈로 뻄..
var express = require('express');
var app = express();
var router = express.Router();   //라우터 메소드 이용.
var path = require('path');  //상대경로 편하기 작성하기 위해서 쓰는 모듈

router.get('/', (req, res)=>{  //app.js의 app.use("/main", main);과 주소값이 겹치므로. 여기값을 수정.  router.get~ 으로 시작. 앞에 app아님!!
    //res.send("메인화면");
    console.log("잘나와")
    res.sendFile(path.join(__dirname,"../public/main.html"));  //join을 이용하여 사용,  res.sendFile(__dirname + "../public/main.html"); 
});

module.exports = router;  //모듈 만든거임.