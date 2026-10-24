import express from "express";
import { createTaskController } from "../controllers/tasks/createTask.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getTasksController } from "../controllers/tasks/getTasks.controller.js";
import { getSingleTaskController } from "../controllers/tasks/getSingleTask.controller.js";
import { updateTaskController } from "../controllers/tasks/updateTask.controller.js";
import { deleteTaskController } from "../controllers/tasks/deleteTask.controller.js";
import { dashboardController } from "../controllers/tasks/dashboardController.js";

const router = express.Router();

router.post("/create", authMiddleware, createTaskController);

router.get("/", authMiddleware, getTasksController);
router.get("/:taskId", authMiddleware, getSingleTaskController);
router.patch("/:taskId", authMiddleware, updateTaskController);
router.delete("/:taskId", authMiddleware, deleteTaskController);
router.delete("/dashboard", authMiddleware, dashboardController);

export default router;
