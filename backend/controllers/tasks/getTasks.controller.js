import { getTaskService } from "../../services/tasks.service.js";

export const getTasksController = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { search = "" } = req.query;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "please login first",
      });
    }

    const result = await getTaskService({ userId, search });

    return res.status(201).json({
      success: true,
      message: "tasks fetch success fully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
