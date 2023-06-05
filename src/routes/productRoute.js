import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  searchProductController,
  updateProductController,
  relatedProductController,
} from "../controllers/productController";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
router.get("/get-product", getAllProductsController);
router.get("/get-product/:slug", getProductController);
router.get("/product-photo/:id", productPhotoController);
router.delete("/delete-product/:id", deleteProductController);
router.post("/product-filters", productFiltersController);
router.get("/product-count", productCountController);
router.get("/product-list/:page", productListController);
router.get("/search/:keyword", searchProductController);
router.get("/related-product/:pid/:cid", relatedProductController);
router.get("/product-category/:slug", productCategoryController);

export default router;
