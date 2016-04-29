var mysql = require('mysql');
var config = require('config');
var Q = require('q');
var debug = require('debug')('membercode-example:db:index');

var pool = mysql.createPool(config.get('mysql'));

exports.query = function(sql, callback) {
  var deferred = Q.defer();
  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query(sql, function(err, rows) {
      if (err) {
        deferred.reject(err);
      } else {
        // And done with the connection.
        if (typeof callback === 'function') {
          callback(err, rows);
        }
        deferred.resolve(rows);
        connection.release();
        // Don't use the connection here, it has been returned to the pool.
      }
    })
  });
  return deferred.promise;
}

exports.escape = mysql.escape;
exports.escapeId = mysql.escapeId;

exports.visitors = require('./visitors');
