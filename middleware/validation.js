import { body, validationResult } from "express-validator";

export function signUpValidation() {
  return [
    body("name").notEmpty().escape(),
    body("email").isEmail(),
    body("password").isLength({
      min: 4,
      max: 16,
    }),
  ];
}

export function handleValidationErrors(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  res.status(400).send({ error: result.array() });
}
