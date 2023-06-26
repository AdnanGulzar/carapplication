const express = require("express");
// a middleware to authenticate user
const { isAuthenticatedUser } = require("../middleware/auth");
const { getAllCars, createCar, updateCar, deleteCar } = require("../controllers/carController");

const router = express.Router();

router.route("/car").get(isAuthenticatedUser,getAllCars);

router
  .route("/car/new")
  .post(isAuthenticatedUser, createCar);

router
  .route("/car/:id")
  .put(isAuthenticatedUser,  updateCar)
  .delete(isAuthenticatedUser,  deleteCar);

module.exports = router;    
// "7LnQJAm5jT"
