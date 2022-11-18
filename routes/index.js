var express = require('express');
const moment = require('moment');
var router = express.Router();
const axios = require('axios');

const { api_url, GIA_BO_KHO_SOI, GIA_CHAN_GA, GIA_NEM } = require("../config");
const { formatNumber } = require('../ultils');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dat-hang', function (req, res, next) {
  res.render("order");
});
router.post('/dat-hang', async function (req, res, next) {
  console.log(req.body);
  const body = req.body;
  const { bo_soi, chan_ga, nem_chua } = body;
  const totalPrice = bo_soi * GIA_BO_KHO_SOI + nem_chua * GIA_NEM + chan_ga * GIA_CHAN_GA;
  if (totalPrice > 0) {
    const order = {
      name: body.name,
      phone: body.phone,
      address: body.address,
      note: body.note,
      listFood: `${bo_soi > 0 ? `Bò khô sợi: ${bo_soi}. ` : ""}${chan_ga > 0 ? `Chân gà: ${chan_ga}. ` : ""}${nem_chua > 0 ? `Nem chua: ${nem_chua}. ` : ""}`,
      price: totalPrice,
      timeOrder: moment(new Date()).format("DD/MM/YYYY")
    }

    let resCreateOrder = await axios.post(`${api_url}/order/create`, order);
    if (resCreateOrder) {
      const message = `Bạn có đơn hàng mới\n Tên khách hàng: ${body.name}\n Số điện thoại: ${body.phone}\n Địa chỉ người nhận: ${body.address}\n Món: ${bo_soi > 0 ? `Bò khô sợi: ${bo_soi}. ` : ""}${chan_ga > 0 ? `Chân gà: ${chan_ga}. ` : ""}${nem_chua > 0 ? `Nem chua: ${nem_chua}. ` : ""}\n Tổng tiền: ${formatNumber(totalPrice)}\n Lưu ý: ${body.note}`
      const ress = await axios.post(`${api_url}/bot/noticeOrder`, { message });
      if (ress.data.isSuccess)
        res.render("order-success");
    }
  } else {
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
