import jwt from "jsonwebtoken";
import User from "../models/user.js";

const verifyToken = async (req, res, next) => {
  try {
    const auth_token = req.cookies.authToken;
    if (!auth_token) {
      return res.status(404).json({ message: "Unauthorized" });
    }
    jwt.verify(auth_token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        return res.status(404).json({ message: "hey! Invalid Token" });
      }
      const me = await User.findOne({ _id: decode.id }).populate("photos");
      req.me = me;
      next();
    });
  } catch (error) {
    return next(error);
  }
};

export default verifyToken;
