import { userLoginService } from "../../services/users.service.js";

export const UserLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all field are required",
      });
    }
    const response = await userLoginService({ email, password });

    return res.status(201).json({
      success: true,
      message: "login successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
