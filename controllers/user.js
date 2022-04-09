import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import Property from "../models/property.js";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect password",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);
    res.json({
      status: "success",
      token,
      user: {
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: "fail",
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET);
    res.json({
      status: "success",
      token,
      user: {
        fullname: newUser.fullname,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const authUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);
    res.json({
      token,
      user: {
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserProperties = async (req, res) => {
  try {
    const LIMIT = req.query.limit || 5;
    const page = req.query.page || 1;
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const properties = await Property.find({ user: userId });

    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = properties.length; // get the total number of properties
    const propertiesByUser = properties.slice(startIndex, startIndex + LIMIT);

    res.json({
      properties: propertiesByUser,
      numberofpages: Math.ceil(total / LIMIT),
      currentPage: Number(page),
    });
  } catch (error) {
    console.log(error);
  }
};
