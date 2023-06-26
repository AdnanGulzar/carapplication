const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter  Name"],
    trim: true,
  },
  color: {
    type: String,
    required: [true, "Please Enter  color"],
  },
  model: {
    type: String,
    required: [true, "Please Enter model"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
 
  category: {
    type: String,
    required: [true, "Please Enter  Category"],
  },


});

module.exports = mongoose.model("Car", carSchema);
