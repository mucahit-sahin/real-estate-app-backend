import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import propertyRouter from "./routes/property.js";
import userRouter from "./routes/user.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is running");
});
app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/user", userRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server Running `)))
  .catch((error) => console.log(`${error} did not connect`));
