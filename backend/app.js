import express from "express";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import tasksRoute from "./routes/tasks.routes.js";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API Routes yahan register honge
app.use("/api/auth", userRoute);
app.use("/api/tasks", tasksRoute);

app.use(errorHandler);
app.get("/api/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "server is running",
  });
});

export default app;
