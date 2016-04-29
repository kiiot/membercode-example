var config = require('config');
var debug = require('debug')('membercode-example:db:visitors');
var mysql = require('./index');

exports.getBy = function(data) {

  var sql = 'SELECT * from '
      + mysql.escapeId(config.get("table.member"))
      + ' WHERE '
      + mysql.escape(data);

  return mysql.query(sql);
}

exports.insert = function(data) {
  var sql = 'INSERT INTO '
      + mysql.escapeId(config.get("table.member"))
      + ' SET '
      + mysql.escape(data);

  return mysql.query(sql);
}
