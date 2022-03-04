var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mylove', function(req, res, next) {
  let {startDay, currentDay, diffDays} = dayDiff();
  res.render("mylove", { startDay, currentDay, diffDays: diffDays });
});

const dayDiff = () => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date("2020-06-06");
  let startDay =` ${firstDate.getDate()}/${(firstDate.getMonth()+1)}/${firstDate.getFullYear()}`
  const today = new Date();
  let currentDay =` ${today.getDate()}/${(today.getMonth()+1)}/${today.getFullYear()}`
  console.log(today);
  const diffDays = Math.round(Math.abs((today - firstDate) / oneDay));
  return {
    diffDays,
    startDay,
    currentDay
  } ;
};

module.exports = router;
