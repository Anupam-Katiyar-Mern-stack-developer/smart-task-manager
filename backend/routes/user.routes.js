import express from "express";
import { UserRegisterController } from "../controllers/users/userRegister.controller.js";
import { UserLoginController } from "../controllers/users/userLogin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { UserProfileController } from "../controllers/users/UserProfile.controller.js";

const router = express.Router();

router.post("/user/register", UserRegisterController);
router.post("/user/login", UserLoginController);
router.get("/user/me",authMiddleware,UserProfileController)

export default router;
