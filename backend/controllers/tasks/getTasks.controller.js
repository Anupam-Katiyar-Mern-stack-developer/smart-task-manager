import { getTaskService } from "../../services/tasks.service.js";

export const getTasksController = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { search = "", status, priority, page = 1, limit = 5 } = req.query;

    const pagenumber = Number(page);
    const limitNumber = Number(limit);
    const offset = (pagenumber - 1) * limitNumber;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "please login first",
      });
    }

    const result = await getTaskService({
      userId,
      search,
      status,
      priority,
      limit: limitNumber,
      pageNumber: pagenumber,
      offset,
    });

    return res.status(200).json({
      success: true,
      message: "tasks fetch success fully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
