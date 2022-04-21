import express from "express";
import multer from "multer";
import {
  authUser,
  signin,
  signup,
  getUserProperties,
  changeProfilePicture,
} from "../controllers/user.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + Date.now() + "." + ext);
  },
});

const upload = multer({ storage: storage });
const cpUpload = upload.single("profilePicture");

router.get("/auth", auth, authUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile/properties", auth, getUserProperties);
router.post("/profile/picture", auth, cpUpload, changeProfilePicture);

export default router;
