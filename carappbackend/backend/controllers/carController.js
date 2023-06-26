const Car = require("../models/carModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createCar = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);

  const car = await Car.create(req.body);

  res.status(201).json({
    success: true,
    car,
  });
});

// Get All car
exports.getAllCars = catchAsyncErrors(async (req, res, next) => {
  const cars = await Car.find();

  res.status(200).json({
    success: true,
    cars,
  });
});

exports.updateCar = catchAsyncErrors(async (req, res, next) => {
  let car = await Car.findById(req.params.id);

  if (!car) {
    return next(new ErrorHander("car not found", 404));
  }

  car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    car,
  });
});

// Delete car

exports.deleteCar = catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.id);
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(new ErrorHander("car not found", 404));
  }

  await Car.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "car Delete Successfully",
  });
});
