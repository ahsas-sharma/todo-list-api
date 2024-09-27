import User from "../models/userModel.js";
import { generateAccessAndRefreshTokens } from "../middleware/auth.js";

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
  try {
    let newUser = await User.create(req.body);
    const createdUser = await User.findById(newUser._id).select(
      "-password -refreshToken"
    );
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    let isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id.toString()
    );

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
      .header("Authorization", accessToken)
      .status(200)
      .json({ token: accessToken });
  } catch (error) {
    console.log(`Caught error ${error.stack}`);

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
