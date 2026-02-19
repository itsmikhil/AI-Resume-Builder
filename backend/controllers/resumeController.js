import resumeModel from "../models/resume.js";

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

let deleteResume = async (req, res) => {
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

let updateResumeTitle = async (req, res) => {
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

let updateResume = async (req, res) => {
  try {
    let { id } = req.user;
    let { formData, resumeId, removeBackground } = req.body;
    
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
