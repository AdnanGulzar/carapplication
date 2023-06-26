const express = require("express");

const { isAuthenticatedUser } = require("../middleware/auth");
const { getAllCategory, createCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");

const router = express.Router();

router.route("/category").get(getAllCategory);


router
  .route("/category/new")
  .post(isAuthenticatedUser, createCategory);  

router
  .route("/category/:id")
  .put(isAuthenticatedUser,  updateCategory)
  .delete(isAuthenticatedUser,  deleteCategory);

module.exports = router;    
