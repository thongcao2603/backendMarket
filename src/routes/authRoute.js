import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
} from "../controllers/authController";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

export default router;
