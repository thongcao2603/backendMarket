import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getCategoryController,
  updateCategoryController,
} from "../controllers/categoryController";
const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
router.get("/get-category", getAllCategoriesController);
router.get("/category/:slug", getCategoryController);
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);
export default router;
