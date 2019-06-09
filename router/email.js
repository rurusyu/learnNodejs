//기존 app.js에서 작성된 라우터를 모듈로 뻄..
var express = require('express');
var app = express();
var router = express.Router();   //라우터 메소드 이용.
var path = require('path');  //상대경로 편하기 작성하기 위해서 쓰는 모듈
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '1q2w3e4r',
    database :'jsman'
});

connection.connect();

router.post('/form', (req, res)=>{
    console.log(req.body.email); 
    res.render('email.ejs',{'email': req.body.email}); 
});

//ajax받아오기
router.post('/ajax',(req, res)=>{
    console.log("성공",req.body.email);
    var email = req.body.email;
    var responseData = {};  
    
       console.log("1");
        var query = connection.query('select name from user where email="' + email+ '"', function (err, rows){
            if(err)  throw err;  
            console.log("2");
            if(rows[0]){                
                responseData.result = "ok";
                responseData.name= rows[0].name;
            }else{                
                responseData.result ="none";
                responseData.name = "";
            }
            console.log("3");
            res.json(responseData);
            
        });
});

module.exports = router;  //모듈 만든거임.