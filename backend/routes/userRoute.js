import express from "express";
import userController from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.post("/register", userController.handleUserRegisteration);
userRouter.post("/signin", userController.handleUserSignIn);
userRouter.get("/getUser",userAuth, userController.getUserByUserId);

export default userRouter;
