import express from "express";
import cors from "cors";
import userRoute from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// API Routes yahan register honge
app.post("/api/auth", userRoute);

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "server is running",
  });
});

export default app;
