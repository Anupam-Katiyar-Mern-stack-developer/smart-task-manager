import { getTasksService } from "../../services/tasks.service.js";

export const getTasksController = async (req, res) => {
  try {
    const userId = req.user.userId;

   

    const result = await getTasksService({
      userId,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      status: req.query.status,
      priority: req.query.priority,
      search: req.query.search,
    });

    

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
