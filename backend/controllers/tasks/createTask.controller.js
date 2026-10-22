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
