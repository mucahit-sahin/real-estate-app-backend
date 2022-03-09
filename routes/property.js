import express from "express";
import multer from "multer";

import {
  createProperty,
  getAllProperties,
  getProperty,
} from "../controllers/property.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });
const cpUpload = upload.fields([
  { name: "images" },
  { name: "floorPlan", maxCount: 1 },
]);

router.post("/create", auth, createProperty);
router.get("/", getAllProperties);
router.get("/:id", getProperty);

export default router;
