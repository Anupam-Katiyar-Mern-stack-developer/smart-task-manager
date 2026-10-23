import { getSingleTaskService } from "../../services/tasks.service.js";

export const getSingleTaskController = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const {title} = req.params;

    if (!userId || !title) {
      return res.status(401).json({
        success: false,
        message: "please login",
      });
    }
    const result = await getSingleTaskService({ userId, title });
    return res.status(200).json({
      success: true,
      message: "succesfully fetch",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
