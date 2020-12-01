var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let diffDays = dayDiff()

  // console.log("year: ", parseInt(dayDiff() / 365))
  // console.log("month: ", monthDiff())
  // console.log("day: ", dayDiff())
  console.log(diffDays)
  res.render('index', { diffDays: diffDays });
});

function monthDiff(firstDate = new Date()) {
  firstDate = new Date(2020, 6, 6);
  const today = new Date();
  var months;
  months = (today.getFullYear() - firstDate.getFullYear()) * 12;
  months -= firstDate.getMonth();
  months += today.getMonth();
  return months <= 0 ? 0 : months;
}

const dayDiff = () => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date("2020-06-06");
  console.log(firstDate)
  const today = new Date();
  console.log(today)
  const diffDays = Math.round(Math.abs((today - firstDate) / oneDay));
  return diffDays
}
module.exports = router;
