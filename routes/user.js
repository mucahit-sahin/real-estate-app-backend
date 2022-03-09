import express from "express";
import {
  authUser,
  signin,
  signup,
  getUserProperties,
} from "../controllers/user.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/auth", auth, authUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile/properties", auth, getUserProperties);

export default router;
