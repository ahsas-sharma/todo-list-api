import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
} from "../controllers/userController.js";
import {
  signUpValidation,
  handleValidationErrors,
} from "../middleware/validation.js";

const router = express.Router();

// GET - /api/user - get all users
router.get("/", getAllUsers);

// POST - /api/users/sign-up - create new user
router.post("/sign-up", signUpValidation(), handleValidationErrors, createUser);

// POST - /api/users/sign-in - sign in user
router.post("/sign-in", (req, res) => {
  res.status(200).json({ message: "This is the user route" });
});

export default router;
