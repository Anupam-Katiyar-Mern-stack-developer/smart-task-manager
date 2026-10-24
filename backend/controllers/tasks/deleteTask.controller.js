import { deleteTaskService } from "../../services/tasks.service.js";

export const deleteTaskController = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const taskId = Number(req.params.taskId);

    if (!Number.isSafeInteger(taskId) || taskId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const result = await deleteTaskService({ userId, taskId });

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
