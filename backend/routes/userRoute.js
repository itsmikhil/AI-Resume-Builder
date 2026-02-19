import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", userController.handleUserRegisteration);

export default userRouter;
