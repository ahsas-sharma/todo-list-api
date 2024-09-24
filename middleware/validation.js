import { body, validationResult } from "express-validator";
import User from "../models/userModel.js";
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

export function handleValidationErrors(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  res.status(400).send({ error: result.array() });
}
