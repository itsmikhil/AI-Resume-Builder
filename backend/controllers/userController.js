import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import userModel from "../models/user";

let generateToken = async (email, id) => {
  let token = jwt.sign({ email, id }, process.env.JWT_SECRET);
};

let handleUserRegisteration = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }

    let existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User Already exist with this email id",
      });
    }

    if (!validator.isEmail(email)) {
      res.status(400).json({ message: "Invalid Email" });
    }

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password should contain atleast 8 characters",
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let newUser = { name, email, password: hashedPassword };

    const result = await userModel.create(newUser);

    let token = await generateToken(email, result._id);

    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
      user;
    });
  } catch (error) {}
};
