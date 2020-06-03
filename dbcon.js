var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_monleons',
  password        : 'Graduate#2018',
  database        : 'cs340_monleons'
});

module.exports.pool = pool;

