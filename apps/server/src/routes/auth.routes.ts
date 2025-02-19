import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

router.post("/login", AuthController.login);
router.post("/outhLogin", AuthController.outhLogin);
// router.post("/signup", AuthController.signup);

export default router;
