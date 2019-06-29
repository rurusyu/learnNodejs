var express = require('express');
var app = express();
var router = express.Router();   //라우터 메소드 이용.

router.get('/', function(req, res){
    console.log("logout router");
    req.logout();   //이거부르면 그냥 로그아웃됨.
    res.redirect('/login');
});

module.exports = router;