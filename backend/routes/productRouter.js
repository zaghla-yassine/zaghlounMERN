const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

//GET all products
router.get("/", getProducts);

//GET a single product
router.get("/:id", getProduct);

// POST a new product
router.post("/", createProduct);

// DELETE a new product
router.delete("/:id", deleteProduct);

// UPDATE a new product
router.patch("/:id", updateProduct);

module.exports = router;
