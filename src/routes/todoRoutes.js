import express from "express";
import { authMiddleware } from "../middleware/verifyAuthToken.js";
import {
  validateQueryParameters,
  validateTodoOwnership,
  handleValidationErrors,
  todoValidation,
} from "../middleware/validation.js";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

// POST - /api/todos -
router.post(
  "/",
  authMiddleware,
  todoValidation(),
  handleValidationErrors,
  createTodo
);

// PUT - /api/todos/:id - update todo and return with the updated details of the item
router.put(
  "/:id",
  authMiddleware,
  validateTodoOwnership,
  todoValidation(),
  handleValidationErrors,
  updateTodo
);

// DELETE - /api/todos - create a new todo using Authorization header token
router.delete("/:id", authMiddleware, validateTodoOwnership, deleteTodo);

// GET - /api/todos - return with pagination and limit -
// eg- /api/todos?page=1&limit=10
router.get(
  "/",
  authMiddleware,
  validateQueryParameters(),
  handleValidationErrors,
  getTodos
);

export default router;
