var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dat-hang', function (req, res, next) {
  res.render("order");
});
router.post('/dat-hang', function (req, res, next) {
  console.log(req.body);
  const body = req.body
  if (body.payment_total_checksum > 0) {
    const order = {
      receiverName: body.q18_tenNgui,
      receiverPhone: body.q6_sDin[full],
      receiverAddress: body.q8_diaChi[city],
      receiverNote: body.q12_luuY,

    }
    res.render("order-success");
  }
});
router.get('/dat-hang-thanh-cong', function (req, res, next) {
  res.render("order-success");
});

const dayDiff = () => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date("2020-06-06");
  let startDay = ` ${firstDate.getDate()}/${(firstDate.getMonth() + 1)}/${firstDate.getFullYear()}`
  const today = new Date();
  let currentDay = ` ${today.getDate()}/${(today.getMonth() + 1)}/${today.getFullYear()}`
  console.log(today);
  const diffDays = Math.round(Math.abs((today - firstDate) / oneDay));
  return {
    diffDays,
    startDay,
    currentDay
  };
};

module.exports = router;
