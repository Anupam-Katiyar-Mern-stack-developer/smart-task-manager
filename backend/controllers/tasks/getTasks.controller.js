import { getTasksService } from "../../services/tasks.service";

export const getTasksController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const query = res.locals.validateQuery;

    const result = await getTasksService({
      userId,
      ...query,
    });

    return res.status(200).json({
      success: true,
      message: "tasks fetched successfully",
      data: result.tasks,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
