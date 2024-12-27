import { Course } from "../models/course.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course title and category are required...",
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      course,
      message: "Course created...",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create course",
      success: false,
    });
  }
};
export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(500).json({
        courses: [],
        message: "Course not found",
        success: true,
      });
    }
    return res.status(200).json({
      courses,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get courses..",
      success: false,
    });
  }
};
export const editCourse = async (req, res) => {
  try {
    const {
      category,
      courseLevel,
      coursePrice,
      courseTitle,
      description,
      subTitle,
    } = req.body;

    const thumbnail = req.file;
    let courseId = req.params.courseId;
    // console.log(courseId);
    
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "course not found..",
        success: false,
      });
    }
    let courseThumbnail;
    if (thumbnail) {
      // delete prev thumbnail from cloudinary
      // if (course.courseThumbnail) {
      //   const publicId = user.photoURL.split("/").pop().split(".")[0];
      //   await deleteMediaFromCloudinary(publicId);
      // }
      courseThumbnail = await uploadMedia(thumbnail.path);
    }
    const updatedData = {
      category,
      courseLevel,
      coursePrice,
      courseTitle,
      description,
      subTitle,
      courseThumbnail: courseThumbnail?.secure_url,
    };
    course = await Course.findByIdAndUpdate(courseId, updatedData, {
      new: true,
    });
    return res.status(200).json({
      course,
      message: "Successfully edited course..",
      success: false,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Failed to edit course..",
      success: false,
    });
  }
};
