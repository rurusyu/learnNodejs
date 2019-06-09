var express = require('express');
var app = express();
var mysql = require('mysql');


console.log("1");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1q2w3e4r',
  port     : 3000,
  database : 'jsman'
});

connection.connect();

app.listen(3000, ()=> {
  console.log("server connect! port : 3000");
});


connection.query('select * from user', function(err, rows, fields){
    if (!err)
    console.log('The solution is: ', rows);
    else
    console.log('Error while performing Query.', err);
});

connection.end();