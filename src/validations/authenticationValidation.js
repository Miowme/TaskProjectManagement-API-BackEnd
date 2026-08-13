import Joi from "joi";

export const registerValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Confirm Password is required",
  }),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});
