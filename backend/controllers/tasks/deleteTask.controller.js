import { deleteTaskService } from "../../services/tasks.service.js";

export const  deleteTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.user;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Token expeired",
      });
    }
    const result = await deleteTaskService({
      userId,
      taskId,
    });

    return res.status(201).json({
      success: true,
      message: "task succesfully delete",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
