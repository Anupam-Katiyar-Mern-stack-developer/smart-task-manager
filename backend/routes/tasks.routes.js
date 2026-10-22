import express from "express";
import { createTaskController } from "../controllers/tasks/createTask.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router =express.Router();

router.post("/create",authMiddleware, createTaskController);

export default router;