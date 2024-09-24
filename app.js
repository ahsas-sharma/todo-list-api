import express from "express";
import connectToMongoDb from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use(express.json());

connectToMongoDb();

// Routes
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// User Routes
app.use("/api/users", userRoutes);

// TODO: Todos Routes
// app.use("/api/todos", todosRoutes);

// Fallback
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route does not exist" });
});
export default app;
