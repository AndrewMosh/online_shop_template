const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// GET all products
router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET a single product by ID
router.get("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new product
router.post("/api/products", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = new Product({ name, description, price });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT (Update) a product by ID
router.put("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price },
      { new: true }
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a product by ID
router.delete("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
