var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //post방식으로 데이터 받기위해 사용
var mysql = require('mysql');
var main = require('./router/main');  //만들어진 모듈 호출


var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '1q2w3e4r',
    database :'jsman'
});

connection.connect();

app.listen(4000, ()=> {
    console.log("server connect! port : 4000");
});

app.use(express.static('public')); //그림파일 보여주겠다.
app.use(bodyParser.json()); //데이터가 제이슨으로 오면 받아야하고.
app.use(bodyParser.urlencoded({extended:true})); // 클라,서버간 데이터 주고 받을때 인코딩해서 보냄.(아스키형태)
app.set('view engine', 'ejs'); // ejs모듈은 설치만하고 set함수를 통해서 지정만 해주면 익스프레스에서 알아서 찾아쓴다.

app.use('/main', main); // /main으로 주소값이 호출되면 main 모듈을 실행해라.


app.get('/', (req, res)=>{
    // res.send("메인화면");
    res.sendFile(__dirname + "/public/main.html");
});


//form post방식 요청오면 여기서 받아서.
app.post('/email_post', (req, res)=>{
    console.log(req.body.email); //email => html body의 input name값.
    //위의 로그값은 터미널에서 확인할 수있음. 
    // res.send("post response"); //ejs 설치하면render이용해서 값 치환
    res.render('email.ejs',{'email': req.body.email}); 
});

//ajax받아오기
app.post('/ajax_send_email',(req, res)=>{
    console.log("성공",req.body.email);
    var email = req.body.email;
    var responseData = {};  
    //요청받는거 성공했으면 응답해줘야지.
      // 여기에는 요청값 타당한지 검사 하는 부분인데 DB에 쿼리 날려서 정보확인..
        //조회쿼리
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
    //응답
    //console.log(responseData);
    //  var responseData = {'result1' : 'ok', 'email':email};   //서버 => 클라, 값은 아무거나 해도됨. 결과값만 주면됨.
    console.log("4"); 
    //res.json(responseData);

});


// app.post('/search001', (req, res)=>{
//     console.log(req.body.search); //email => html body의 input name값.
//     //위의 로그값은 터미널에서 확인할 수있음. 
//     // res.send("post response"); //ejs 설치하면render이용해서 값 치환
//     res.render('search-value.ejs',{'search-value': req.body.search}); 
// });

// //검색창 만들어보기
// app.post('/search', (req, res)=>{
//     // console.log("1",req.body."search-value");
//     console.log(req.body);
//     var responseData1 = {'result' : 'ok', 'search' : req.body.search};
//     res.json(responseData1);
// })


//미니터 연결하기위해서 만들어봄.
// app.post('/signup_post',(res,req) => {
//   console.log(req);  
//   res.send("post signup!!");
// });