import express from "express";
import resumeController from "../controllers/resumeController.js";
import userAuth from "../middlewares/userAuth.js";

const resumeRouter = express.Router();

resumeRouter.post("/create",userAuth, resumeController.createResume);
resumeRouter.delete("/:resumeId",userAuth, resumeController.deleteResume);
resumeRouter.get("/update",userAuth, resumeController.updateResume);
resumeRouter.put("/update-title",userAuth, resumeController.updateResumeTitle);

export default resumeRouter;