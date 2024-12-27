import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Alrready Exist with this email..",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: name,
      email: email,
      originalPassword: password,
      password: hashedPassword,
    });
    res.status(200).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to regiter",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No account available with this email ID....",
      });
    }
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }
    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to Login",
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Log out Successfully...",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to Logout",
      success: false,
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select(
      "-password -originalPassword"
    );
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to Load user...",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    // extract public id of the old image from the url if it is exists
    // if (user.photoURL) {
    //   const publicId = user.photoURL.split("/").pop().split(".")[0];
    //   await deleteMediaFromCloudinary(publicId);
    // }

    const cloudResponse = await uploadMedia(profilePhoto.path);
    // const {secure_url:photoURL } =cloudResponse
    const photoURL = cloudResponse.secure_url;

    const updatedData = { name, photoURL };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password -originalPassword");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile Updated Succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to Update profile...",
    });
  }
};
