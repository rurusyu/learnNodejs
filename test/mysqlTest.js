var express = require('express');
var app = express();
var mysql = require('mysql');


console.log("1");
var connection = mysql.createConnection({
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : '-----',
  database :'jsman'
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