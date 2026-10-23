import { updateTaskService } from "../../services/tasks.service.js";

export const updateTaskController = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { taskId } = req.params;
    const { title, priority, due_date, description, status } = req.body;
    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "bad request",
      });
    }
    const result = await updateTaskService({
      userId,
      taskId,
      title,
      priority,
      due_date,
      description,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "succesfully updated",
      data: result,
    });
  } catch (error) {}
};
