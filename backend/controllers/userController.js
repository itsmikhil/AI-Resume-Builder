import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

let generateToken = async (email, id) => {
  let token = jwt.sign({ email, id }, process.env.JWT_SECRET);
  return token
};

let handleUserRegisteration = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already exist with this email id",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password should contain atleast 8 characters",
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let newUser = { name, email, password: hashedPassword };

    const result = await userModel.create(newUser);

    result.password = undefined;

    let token = await generateToken(email, result._id);

    console.log(token);

    return res.status(200).json({
      message: "user created successfully",
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

export default { handleUserRegisteration };
