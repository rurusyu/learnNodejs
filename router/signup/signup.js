//기존 app.js에서 작성된 라우터를 모듈로 뻄..
var express = require('express');
var app = express();
var router = express.Router();   //라우터 메소드 이용.
var path = require('path');  //상대경로 편하기 작성하기 위해서 쓰는 모듈
var mysql = require('mysql');

//DB 셋팅;
var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '1q2w3e4r',
    database :'jsman'
});

connection.connect();

//라우터 처리  
router.get('/', (req, res)=>{
    console.log("회원가입 페이지"); 
    res.sendFile(path.join(__dirname,'../../public/signup.html'))   
});

//제출버튼 클릭하면 Cannot POST /signup 이렇게 뜬다. form 태그에 post 방식으로 지정했기 때문에 라우터에서도 post 방식으로 가져와야한다.
router.post('/', (req, res)=> {
    console.log("제출완료!");
    //정보값 받아서 데이터베이스에 저장
    var body = req.body;      // req임. res아님. 클라 요청값 받는거니깐 req임.
    var email = body.email;
    var name = body.name;
    var password = body.password;    
    console.log(email, name, password);
    var sql = {email : email, name : name, pw : password};  //'insert into user (email,name,pw) values ("'+email+'", "'+name+'","'+password+'")'
    //DB저장
    var query = connection.query('insert into user set ?',sql, function(err, rows){
        if(err) throw err;     
        else res.render('welcome.ejs', {'name': name, 'id': rows.insertId});
        
    });
})



module.exports = router;  //모듈 만든거임.