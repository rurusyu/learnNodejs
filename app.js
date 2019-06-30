var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //post방식으로 데이터 받기위해 사용
var mysql = require('mysql');
var router = require('./router/index');
//아래 4가지 깃헙에서 사용법 readme 한번 볼것.
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');



var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '!Qwer4321',
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

//passport설정은 라우터 전에 셋팅을 해준다.
app.use(session({
    secret : 'keyboard cat', //세션암호화에 대한 키값설정. 아무거나 쓰면됨.
    resave : false,
    saveUninitialized : true,
}))
//셋팅완료.
app.use(passport.initialize()); //passport 초기화
app.use(passport.session());
app.use(flash());

app.use(router);

//이것도 root 라우트에서 관리
// app.use('/main', main); // /main으로 주소값이 호출되면 main 모듈을 실행해라.
// app.use('/email', email);

//루트 라우트는 index.js로..
// app.get('/', (req, res)=>{
//     // res.send("메인화면");
//     res.sendFile(__dirname + "/public/main.html");
// });

