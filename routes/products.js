//Sofia Kononenko Sham Hasson
const express = require("express");
const router = express.Router();
const data = require("../data");

// GET /api/products
router.get("/", (req, res) => {
  res.json({ products: data.products });
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = data.products.find((item) => item.id === parseInt(id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: `Product with ID: ${id} not found` });
  }
});

// POST /api/products
router.post("/", (req, res) => {
  const productData = req.body;
  if (!productData.name || !productData.price) {
    return res.status(400).json({ message: "Name and price are required" });
  }
  newProduct.id =
    data.products.length > 0
      ? data.products[data.products.length - 1].id + 1
      : 1;
  data.products.push(newProduct);
  res.json(data.products);
});

// PUT /api/products/:id

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  const productInd = data.products.findIndex(
    (item) => item.id === parseInt(id)
  );

  if (productInd !== -1) {
    const existingProduct = data.products[productInd];

    if (productData.name !== undefined) {
      existingProduct.name = productData.name;
    }
    if (productData.price !== undefined) {
      existingProduct.price = productData.price;
    }
    if (productData.stock !== undefined) {
      existingProduct.stock = productData.stock;
    }

    data.products[productInd] = existingProduct;
    res.json({
      message: `Product with ID: ${id} updated`,
      products: data.products,
    });
  } else {
    res.status(404).json({ message: `Product not found` });
  }
});

// DELETE /api/products/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const productIndex = data.products.findIndex(
    (item) => item.id === parseInt(id)
  );

  if (productIndex !== -1) {
    data.products.splice(productIndex, 1);
    res.json({
      message: `Product with ID: ${id} deleted`,
      products: data.products,
    });
  } else {
    res.status(404).json({ message: `Product with ID: ${id} not found` });
  }
});

module.exports = router;
