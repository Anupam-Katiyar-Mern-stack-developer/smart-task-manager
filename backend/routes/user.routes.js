import express from "express";
import { UserRegisterController } from "../controllers/users/userRegister.controller";

const router = express.Router();

router.post("/user/register", UserRegisterController);

export default router;
