import { getTaskService } from "../../services/tasks.service.js";

export const getTaskController = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { page = 1, limit = 5 } = req.query;
    const limitNumber = Number(limit);
    const pageNumber = Number(page);
    const offset = (pageNumber - 1) * limit;

    const result = await getTaskService({
      userId,
      pageNumber,
      offset,
      limit: limitNumber,
    });

    return res.status(200).json({
      success: true,
      message: "successfully fetched",
      data: result,
      pagination: {
        pageNumber,
        totalPages: result.totalPages,
        totalTasks:result.totalTasks,
      },
    });
  } catch (error) {
    next(error);
  }
};
