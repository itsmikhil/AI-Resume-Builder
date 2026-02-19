import mongoose from "mongoose";

let dbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/ai-resume-builder`);
    console.log("Db Connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default dbConnect;