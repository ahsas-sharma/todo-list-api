import express from "express";
import {
  getAllUsers,
  signUpUser,
  signInUser,
} from "../controllers/userController.js";
import {
  signUpValidation,
  signInValidation,
  handleValidationErrors,
} from "../middleware/validation.js";

import { refreshTokens } from "../middleware/auth.js";

const router = express.Router();

// GET /api/users - get all users
router.get("/", getAllUsers);

// POST /api/users/sign-up - create new user
router.post("/sign-up", signUpValidation(), handleValidationErrors, signUpUser);

// POST /api/users/sign-in - sign in user
router.post("/sign-in", signInValidation(), handleValidationErrors, signInUser);

// POST /api/users/refresh-token - generate new access and refresh token
router.get("/refresh", refreshTokens);

export default router;
