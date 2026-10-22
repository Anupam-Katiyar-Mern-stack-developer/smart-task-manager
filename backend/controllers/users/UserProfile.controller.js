import { UserProfileService } from "../../services/users.service.js";

export const UserProfileController = async (req, res, next) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "invalid or expired token",
      });
    }

    const result = await UserProfileService({ userId });

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
