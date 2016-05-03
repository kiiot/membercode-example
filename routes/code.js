var express = require('express');
var router = express.Router();
var debug = require('debug')('membercode-example:router:code');
var config = require('config');
var Q = require('q');

var Hashids = require("hashids");
var hashids = new Hashids(config.get("salt"));

var db = require('../lib/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(config.get('validator'));
});

router.post('/', function(req, res, next) {
  // Check whether the phone is already registered.
  db.visitors.getBy({'phone': req.body.phone})
  .then(function(rows) {
    debug('the rows ', rows);

    if (rows && rows[0]) {
      return Q.all([rows[0]]);
    }

    // If there is no member data,
    // generate the member code and update the database
    var code = hashids.encode(new Date().getTime());

    return Q.all([
        {code: code, phone: req.body.phone},
        db.visitors.insert({phone: req.body.phone, code: code})
    ]);

  })
  .spread(function(result) {
    res.json(result);
  })
  .fail(function(e) {
    debug(e.message);
    next(e);
  });
});

module.exports = router;
