import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  try {
    let JWT_KEY = process.env.JWT_KEY;
    await jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export default auth;
