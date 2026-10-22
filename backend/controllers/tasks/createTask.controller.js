import { CreateTaskService } from "../../services/tasks.service.js";

export const createTaskController = async (req, res, next) => {
  try {
    const { userId } = req.user;
    console.log(userId);
    const { title, description, priority, status, due_date } = req.body;

    if (!title) {
      res.status(400).json({
        success: false,
        message: "please enter title",
      });
    }
    const allowedPriorities = ["low", "medium", "high"];

    if (!allowedPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Priority must be low, medium or high",
      });
    }

    const allowedStatuses = ["pending", "in_progress", "completed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status",
      });
    }
    const result = await CreateTaskService({
      userId,
      title,
      description,
      priority,
      status,
      due_date,
    });

    return res.status(201).json({
      success: true,
      message: "task create successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
