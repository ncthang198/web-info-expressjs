var express = require("express");
const axios = require("axios");

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let diffDays = dayDiff();

  // console.log("year: ", parseInt(dayDiff() / 365))
  // console.log("month: ", monthDiff())
  // console.log("day: ", dayDiff())
  console.log(diffDays);
  res.render("index", { diffDays: diffDays });
});

/* GET home page. */
router.get("/hom-nay-an-gi", function (req, res, next) {
  var dish = "...";
  axios    
    .post("http://103.130.212.235:1999/api/v1/food/get_random_food")

    .then(function (response) {
      // handle success
      dish = response.data.food;      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
      return res.render("hom-nay-an-gi", { dish: dish });
    });
});
router.get("/foods-tour", function (req, res, next) {
  var dishes = "...";
  axios    
    .post("http://103.130.212.235:1999/api/v1/food/get_all_foods")

    .then(function (response) {
      // handle success
      dishes = response.data.foods;      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
      return res.render("foods-tour", { dishes: dishes });
    });
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
  console.log(firstDate);
  const today = new Date();
  console.log(today);
  const diffDays = Math.round(Math.abs((today - firstDate) / oneDay));
  return diffDays;
};
module.exports = router;
