import express from "express";
import { createTaskController } from "../controllers/tasks/createTask.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getTasksController } from "../controllers/tasks/getTasks.controller.js";

const router =express.Router();

router.post("/create",authMiddleware, createTaskController);

router.get("/",authMiddleware,getTasksController);

export default router;