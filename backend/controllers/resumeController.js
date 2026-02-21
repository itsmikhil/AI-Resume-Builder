import imagekit from "../configs/imageKit.js";
import resumeModel from "../models/resume.js";
// used in imagekit integration
import fs from "fs";

const createResume = async (req, res) => {
  try {
    let { id } = req.user;
    let { title } = req.body;

    title = title?.trim() || "Untitled Resume";

    let result = await resumeModel.create({ userId: id, title });

    return res
      .status(200)
      .json({ success: true, message: "Resume created", result });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteResume = async (req, res) => {
  try {
    let { id } = req.user;
    let { resumeId } = req.params;

    // we should verify with resume id and user id both because if some stranger knows resume id
    // then he or she will be able to delete it
    // thats why we have added a safety check because of which only logged in owner can delete it

    let result = await resumeModel.findOneAndDelete({
      _id: resumeId,
      userId: id,
    });

    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "Resume not found", result });
    }

    return res
      .status(200)
      .json({ success: true, message: "Resume deleted", result });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateResumeTitle = async (req, res) => {
  try {
    let { id } = req.user;
    let { resumeId } = req.params;
    let { title } = req.body;

    title = title?.trim() || "Untitled Resume";

    // set only edits the title and keeps all other things same
    // new:true return new object after updation

    let result = await resumeModel.findOneAndUpdate(
      { _id: resumeId, userId: id },
      { $set: { title } },
      { new: true },
    );

    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "Resume not found", result });
    }

    return res
      .status(200)
      .json({ success: true, message: "Resume title updated", result });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateResume = async (req, res) => {
  try {
    let { id } = req.user;
    let { resumeData, resumeId, removeBackground } = req.body;
    let image = req.file;
    let resumeDataCopy;

    if (typeof resumeData === "string") {
      resumeDataCopy = await JSON.parse(resumeData);
    } else {
      resumeDataCopy = structuredClone(resumeData);
    }

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imagekit.files.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resumes",
        transformation: {
          // width and height given to image
          // fo-face -> focuses on face
          // z-0.45 -> zoom out so that face is visible properly
          // if user has asked to remove background then we also remove background
          pre:
            "w-300,h-300,fo-face,z-0.45" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });

      resumeDataCopy.personal_info.image = response.url;
    }

    let result = await resumeModel.findOneAndUpdate(
      { userId: id, resumeId },
      resumeDataCopy,
      { new: true },
    );

    return res
      .status(200)
      .json({ success: true, message: "Saved successfully", result });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default { createResume, deleteResume, updateResume, updateResumeTitle };
