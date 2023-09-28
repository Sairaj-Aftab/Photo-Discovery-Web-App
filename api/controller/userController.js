import User from "../models/user.js";
import cloudinary from "../utility/cloudinary.js";
import createError from "../utility/createError.js";
import { hashPassword, passwordVerify } from "../utility/hash.js";
import { getRandomCode } from "../utility/math.js";
import { accountActivationMail } from "../utility/sendMail.js";
import { createToken, verifyToken } from "../utility/token.js";
import {
  generateUsername,
  isEmail,
  validateUserName,
} from "../utility/validates.js";

/**
 * @access public
 * @route /api/v1/register
 * @method Post
 */
export const register = async (req, res, next) => {
  try {
    const { fullName, auth, password } = req.body;

    if (!fullName || !auth || !password) {
      return next(createError(404, "All fields are required"));
    } else {
      // Generate verify number
      let genNumber = getRandomCode(10000, 99999);
      const checkCode = await User.findOne({ accessToken: genNumber });
      if (checkCode) {
        genNumber = getRandomCode(10000, 99999);
      }
      // Checking Email or Not
      if (!isEmail(auth)) {
        return next(createError(404, `Mail is not matching`));
      }
      // Checking Existing Email
      const usedEmail = await User.findOne({ email: auth });
      if (usedEmail) {
        return next(createError(404, "Email already taken"));
      }
      // Generate User Name and also not matching existing user name
      const allUserName = await User.find();
      let allExistingUserNameArr = [];
      for (let i = 0; i < allUserName.length; i++) {
        const element = allUserName[i];
        allExistingUserNameArr.push(element.userName);
      }
      // Create User
      const user = await User.create({
        fullName,
        userName: generateUsername(fullName, allExistingUserNameArr),
        email: auth,
        password: hashPassword(password),
        accessToken: genNumber,
      });
      if (user) {
        const token = createToken({ id: user._id }, "30d");
        // Send account acctivation link to user
        accountActivationMail(user.email, {
          fullName: user.fullName,
          userName: user.userName,
          link: `${process.env.APP_URL}${process.env.PORT}/api/v1/user/activate/${token}`,
          code: genNumber,
        });
        res.status(200).json({
          user: user,
          message: "Successfully registered",
        });
      }
    }
  } catch (error) {
    return next(error);
  }
};

/**
 * Activate Account by Code
 */

export const activateAccountByCode = async (req, res, next) => {
  try {
    const { code, auth } = req.body;

    const user = await User.findOne({ email: auth });
    if (!user) {
      return next(createError(404, "User not found"));
    } else {
      if (user.isActivate == true) {
        return next(createError(404, "Already user activated"));
      } else {
        if (user.accessToken != code) {
          return next(createError(404, "OTP is not matching"));
        } else {
          await User.findByIdAndUpdate(user._id, {
            isActivate: true,
            accessToken: "",
          });
          res.status(200).json({
            message: "User successfully activated",
          });
        }
      }
    }
  } catch (error) {
    return next(error);
  }
};

/**
 * Activate Account by Link
 */
export const activateAccountByLink = async (req, res, next) => {
  try {
    const { token } = req.params;
    if (!token) {
      return next(createError(404, "Invalid Token"));
    } else {
      const verify = verifyToken(token);
      if (!verify) {
        return next(createError(404, "Invalid URL"));
      } else {
        if (verify.accessToken == true) {
          return next(createError(404, "Already user activated"));
        } else {
          await User.findByIdAndUpdate(verify.id, {
            isActivate: true,
            accessToken: "",
          });
          res.status(200).json({
            message: "User successfully updated",
          });
        }
      }
    }
  } catch (error) {
    return next(error);
  }
};

/**
 * Login
 */
export const login = async (req, res, next) => {
  try {
    const { auth, password } = req.body;
    if (!isEmail(auth)) {
      return next(createError(404, "Email is not matching"));
    }
    const user = await User.findOne({ email: auth }).populate("photos");
    if (!user) {
      return next(createError(404, "User not found"));
    }
    if (!passwordVerify(password, user.password)) {
      return next(createError(404, "Wrong password"));
    }
    const token = createToken({ id: user._id }, "365d");
    if (token) {
      res
        .status(200)
        .cookie("authToken", token, {
          // httpOnly: true,
          secure: process.env.APP_ENV == "Development" ? false : true,
          sameSite: "strict",
          path: "/",
          maxAge: 365 * 24 * 60 * 60 * 1000, // 365 days in milliseconds
        })
        .json({
          message: "Successfully login",
          user: user,
          token: token,
        });
    }
  } catch (error) {
    return next(error);
  }
};

/**
 * LogedIn Me
 */
export const logedIn = async (req, res, next) => {
  try {
    if (!req.me) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json(req.me);
  } catch (error) {
    return next(error);
  }
};

/**
 * LogedIn Me
 */
export const logOut = async (req, res, next) => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Successfully log out" });
  } catch (error) {
    return next(error);
  }
};

/**
 * Profile Edit or Update
 */
export const editUser = async (req, res, next) => {
  try {
    const id = req.me._id.toString();
    const { fullName, email, location, skills } = req.body;

    const user = await User.findById(id);

    let avatar = user.profilePhoto;
    let cover = user.coverPhoto;
    if (req.files.avatar) {
      if (user.profilePhoto) {
        await cloudinary.uploader.destroy(user.profilePhoto.public_id);
      }
      const uploadAvatar = await cloudinary.uploader.upload(
        req.files.avatar[0].path,
        {
          folder: "Photo_Discovery_Avatar",
        }
      );
      avatar = {
        public_id: uploadAvatar.public_id,
        secure_url: uploadAvatar.secure_url,
      };
    }
    if (req.files.cover_photo) {
      if (user.coverPhoto) {
        await cloudinary.uploader.destroy(user.coverPhoto.public_id);
      }
      const uploadCover = await cloudinary.uploader.upload(
        req.files.cover_photo[0].path,
        {
          folder: "Photo_Discovery_Cover",
        }
      );
      cover = {
        public_id: uploadCover.public_id,
        secure_url: uploadCover.secure_url,
      };
    }

    const update = await User.findByIdAndUpdate(
      id,
      {
        fullName,
        email,
        location,
        skills,
        profilePhoto: avatar,
        coverPhoto: cover,
      },
      { new: true }
    );

    if (update) {
      return res
        .status(200)
        .json({ data: update, message: "Successfully updated" });
    }
  } catch (error) {
    return next(error);
  }
};
/**
 * Get Single User
 */
export const getSingleUser = async (req, res, next) => {
  try {
    const { userName } = req.params;

    const user = await User.findOne({ userName }).populate("photos");
    if (user) {
      res.status(200).json({ user, message: "Okay" });
    } else {
      return next(createError(404, "User not found"));
    }
  } catch (error) {
    return next(error);
  }
};
