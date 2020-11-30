var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(2020, 6, 6);
  const secondDate = new Date(2020,11,30);

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  console.log(diffDays)
  res.render('index', {  diffDays:diffDays });
});

module.exports = router;
