import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelpers";

//register
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      return res.json({ message: "Name is Required" });
    }
    if (!email) {
      return res.json({ message: "Email is Required" });
    }
    if (!password) {
      return res.json({ message: "Password is Required" });
    }
    if (!phone) {
      return res.json({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.json({ message: "Address is Required" });
    }
    if (!answer) {
      return res.json({ message: "Answer is Required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "Already register please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    res.status(201).json({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in registeration",
      error,
    });
  }
};

//login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).json({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).json({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).json({ message: "New Password is required" });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Wrong email or answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
export { registerController, loginController, forgotPasswordController };
