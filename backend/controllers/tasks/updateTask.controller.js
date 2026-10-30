import { updateTaskService } from "../../services/tasks.service.js";

export const updateTaskController = async (req, res) => {
  try {
    console.log("PATCH API HIT");
    console.log("Task ID:", req.params.taskId);
    console.log("Request Body:", req.body);
    console.log("User:", req.user);

    const userId = req.user.userId;
    const taskId = Number(req.params.id);

    const result = await updateTaskService({
      taskId,
      userId,
      ...req.body,
    });

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: result,
    });

  } catch (error) {
    console.error("Update Task Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};