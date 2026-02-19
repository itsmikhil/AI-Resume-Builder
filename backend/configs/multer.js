import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: uuidv4(),
});

const upload = multer({ storage: storage });

export default upload