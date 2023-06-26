const app = require("./app");
const connectDatabase = require("./config/database");



// Config

  require("dotenv").config({ path: "backend/config/config.env" });
const port= process.env.PORT || 4000;
// Connecting to database
connectDatabase();

 

const server = app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});

