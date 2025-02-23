import { Router } from "express";
import GroupController from "../controllers/group.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

router.get("/fetchGroup", protectRoute, GroupController.getGroups);
router.post("/createGroup", protectRoute, GroupController.createGroup);
router.delete("/deleteGroup/:id", protectRoute, GroupController.deleteGroup);

export default router;
