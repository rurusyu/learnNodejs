//기존 app.js에서 작성된 라우터를 모듈로 뻄..
var express = require('express');
var app = express();
var router = express.Router();   //라우터 메소드 이용.
var path = require('path');  //상대경로 편하기 작성하기 위해서 쓰는 모듈


//메인페이지는 세션 정보가 있을때만 접근이 가능하게.
router.get('/', (req, res)=>{  //app.js의 app.use("/main", main);과 주소값이 겹치므로. 여기값을 수정.  router.get~ 으로 시작. 앞에 app아님!!
    //res.send("메인화면");
    console.log("잘나와", req.user)  //req.user serialize하면 id값이 req.user에 저장됨. 공식문서 참조.
    // res.sendFile(path.join(__dirname,"../public/main.html"));  //join을 이용하여 사용,  res.sendFile(__dirname + "../public/main.html"); 
    var id = req.user;
    if(!id) res.render('login.ejs');
    res.render('main.ejs', {'id':id})
});

module.exports = router;  //모듈 만든거임.