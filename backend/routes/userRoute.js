import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", userController.handleUserRegisteration);
userRouter.post("/signin", userController.handleUserSignIn);

export default userRouter;
