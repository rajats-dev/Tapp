import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/outhLogin", AuthController.outhLogin);

export default router;
