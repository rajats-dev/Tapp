import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

router.get("/me", protectRoute, AuthController.getMe);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/signup", AuthController.signup);

export default router;
