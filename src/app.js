import express, { urlencoded } from "express";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import connectToMongoDb from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

connectToMongoDb();

const app = express();
app.use(express.json());
app.use(cookieParser());

const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Request quota exceeded. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(rateLimitMiddleware);

// User Routes
app.use("/api/users", userRoutes);

// TODO: Todos Routes
app.use("/api/todos", todoRoutes);

// Fallback
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route does not exist" });
});

export default app;
