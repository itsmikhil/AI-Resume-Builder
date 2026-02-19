import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

const generateToken = (email, id) => {
  let token = jwt.sign({ email, id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const handleUserRegisteration = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = name?.trim();
    email = email?.trim();
    password = password?.trim();

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password should contain atleast 8 characters",
      });
    }

    let existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already exist with this email id",
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let newUser = { name, email, password: hashedPassword };

    const result = await userModel.create(newUser);

    result.password = undefined;

    let token = generateToken(email, result._id);

    return res.status(200).json({
      message: "Welcome!",
      success: true,
      user: result,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const handleUserSignIn = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim();
    password = password?.trim();

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    let result = await userModel.findOne({ email });

    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    let correctPassword = await bcrypt.compare(password, result.password);

    if (!correctPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    result.password = undefined;

    let token = generateToken(email, result._id);

    return res.status(200).json({
      message: "Welcome Back!",
      success: true,
      user: result,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserByUserId = async (req, res) => {
  try {
    let { id } = req.user;
    let result = await userModel.findById(id);
    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    result.password = undefined;
    return res.status(200).json({
      message: "User Found",
      success: true,
      user: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default { handleUserRegisteration, handleUserSignIn,getUserByUserId };
