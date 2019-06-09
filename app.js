var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //post방식으로 데이터 받기위해 사용
var mysql = require('mysql');
var main = require('./router/main');  //만들어진 모듈 호출
var email = require('./router/email');

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
app.use('/email', email);

app.get('/', (req, res)=>{
    // res.send("메인화면");
    res.sendFile(__dirname + "/public/main.html");
});

