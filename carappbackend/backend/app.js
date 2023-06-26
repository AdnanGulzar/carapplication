const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");


const errorMiddleware = require("./middleware/error");

// Config

  require("dotenv").config({ path: "backend/config/config.env" });
  app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


// Route Imports
const car = require("./routes/carRoute");
const user = require("./routes/userRoute");
const category = require("./routes/categoryRoute");

app.use("/api/v1", car);
app.use("/api/v1", user);
app.use("/api/v1", category);
                 


app.get("*", (req, res) => {
  res.json("welcome to apis");  
})

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
