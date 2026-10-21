// productRoutes.js
import express from "express";
import {
  addProduct,
  getAllProducts,
  singleProducts,
  deleteProductById,
  searchQuery,
  typeaheadSuggestions,
  getRelatedProducts,
  updateProductById,
  getPublicProducts,
  listStockTable,
  getPublicProductsByHomeCategory,
} from "../controller/productController.js";

const router = express.Router();

/**
 * ✅ ORDER RULE:
 * 1) Most specific routes first
 * 2) Dynamic params (/:id) near bottom
 * 3) "/" last
 */

// Admin routes
router.get("/admin/stock-table", listStockTable);

// Public/home section routes (most specific)
router.get("/public/home/:slug", getPublicProductsByHomeCategory);

// Public/user routes
router.get("/public", getPublicProducts);

// Search routes (keep before /:id)
router.get("/search", searchQuery);
router.get("/suggest", typeaheadSuggestions);

// Related products (param but specific prefix)
router.get("/related/:category", getRelatedProducts);

// CRUD
router.post("/", addProduct);

// If you want "all products" to be public, keep it near the end
router.get("/", getAllProducts);

// Dynamic id routes (keep near bottom)
router.get("/:id", singleProducts);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

export default router;