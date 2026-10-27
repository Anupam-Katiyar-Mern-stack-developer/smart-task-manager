import { getTasksService } from "../services/tasks.service.js";

export const getTasksController = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const query = res.locals.validatedQuery;

    const result = await getTasksService({
      userId,
      ...query,
    });

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: result.tasks,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
