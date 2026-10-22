import express from "express";
import { UserRegisterController } from "../controllers/users/userRegister.controller.js";
import { UserLoginController } from "../controllers/users/userLogin.controller.js";

const router = express.Router();

router.post("/user/register", UserRegisterController);
router.post("/user/login", UserLoginController);

export default router;
