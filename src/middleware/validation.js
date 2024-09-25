import { body, validationResult, query } from "express-validator";
import User from "../models/userModel.js";
import Todo from "../models/todoModel.js";

export function signUpValidation() {
  return [
    body("name").notEmpty().escape(),
    body("email")
      .isEmail()
      .custom(async (value) => {
        // check if email already exists
        let emailFound = await User.findOne({ email: value });
        if (emailFound) {
          throw new Error("E-mail is already in use.");
        }
      }),
    body("password").isLength({
      min: 4,
      max: 16,
    }),
  ];
}

export function signInValidation() {
  return [body("email").notEmpty().isEmail(), body("password").notEmpty()];
}

export function todoValidation() {
  return [body("title").notEmpty()];
}

export function validateQueryParameters() {
  return [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer."),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Limit must be between 1 and 100"),
    query("filter").optional(),
    query("sort").optional().isIn(["asc", "desc"]),
  ];
}

// For update and delete routes, validate if user making the request owns the todo
export async function validateTodoOwnership(req, res, next) {
  const userId = req.payload.userId;
  const todoId = req.params.id;
  let todo = await Todo.findById(todoId);
  if (todo) {
    const isOwner = todo.user == userId;
    if (isOwner) {
      return next();
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  } else {
    return res.status(404).json({ message: "Todo not found." });
  }
}

export function handleValidationErrors(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  res.status(400).send({ error: result.array() });
}
