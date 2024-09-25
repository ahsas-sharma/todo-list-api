import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(200).json({ message: "No users found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const signUpUser = async (req, res) => {
  const user = req.body;
  user.password = await bcrypt.hash(user.password, 5);
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let userData = await User.findOne({ email: email });
    if (!userData) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    let matchPassword = await bcrypt.compare(password, userData.password);

    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    let payload = {
      userId: userData._id,
    };

    const token = generateToken(payload);
    return res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
