import User from "../models/User.js";
import { formatJoiErrors } from "../utils/FormatJoiErrors.js";
import { registerValidation } from "../validations/authenticationValidation.js";
import { loginValidation } from "../validations/authenticationValidation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { error } = registerValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = formatJoiErrors(error);
    return res.status(400).json({
      message: "Validation errors",
      errors,
    });
  }

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const user = new User({ name, email, password });
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { error } = loginValidation.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = formatJoiErrors(error);
    return res.status(400).json({
      message: "Validation errors",
      errors,
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
