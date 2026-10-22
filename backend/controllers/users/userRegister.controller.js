import { userRegisterService } from "../../services/users.service";

export const UserRegisterController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (password.trim().length <= 8) {
      return res.status(400).json({
        success: false,
        message: "password atleast 8 charecter",
      });
    }

    const response = await userRegisterService({ name, email, password });

    return res.status(200).json({
      success: true,
      message: "register successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
