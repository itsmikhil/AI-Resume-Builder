import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./configs/db.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await dbConnect();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`server is ruuninng on ${PORT}`);
});
