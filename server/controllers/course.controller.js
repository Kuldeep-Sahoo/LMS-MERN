import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

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

export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Find the course by ID
    const course = await Course.findById(courseId);

    // Check if the course exists
    if (!course) {
      return res.status(404).json({
        message: "Course not found...",
        success: false,
      });
    }

    // Remove associated lectures
    await Lecture.deleteMany({ _id: { $in: course.lectures } });

    // Remove the course
    await Course.findByIdAndDelete(courseId);

    // Send success response
    return res.status(200).json({
      message: "Course and associated lectures removed successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error removing course:", error);
    return res.status(500).json({
      message: "Failed to remove course and associated lectures",
      success: false,
      error: error.message,
    });
  }
};

export const searchCourse = async (req, res) => {
  try {
    const { query = "", categories = [], sortByPrice = "" } = req.query;
    // create search query
    const searchCriteria = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };
    // if categories are selected
    if (categories.length > 0) {
      searchCriteria.category = { $in: categories };
    }
    // define sorting order
    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1; //sort by price in ascending order
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1; //sort by price in descending order
    }
    let courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name photoURL" })
      .sort(sortOptions);

    return res.status(200).json({
      success: true,
      courses: courses || [],
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPublishedCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoURL",
    });
    if (!courses) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }
    return res.status(200).json({
      courses,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get published courses...",
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

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(500).json({
        error,
        message: "Course not found...",
        success: false,
      });
    }
    return res.status(200).json({
      course,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      success: false,
    });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture title and course Id are required...",
        success: false,
      });
    }

    const lecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(200).json({
      lecture,
      message: "Lecture cteated successfully...",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      success: false,
      message: "Failed to create Lecture...",
    });
  }
};

export const getCourseLectures = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({
        message: "Course not found...",
        success: false,
      });
    }
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found...",
      });
    }
    return res.status(200).json({
      lectures: course.lectures,
      message: "Lectures fetched successfully...",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      success: false,
      message: "Failed to get Lectures...",
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    console.log(req.body);

    const { lectureTitle, videoInfo, isPreviewFree } = req.body;

    const { courseId, lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found...",
      });
    }
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }
    if (videoInfo) {
      lecture.videoUrl = videoInfo.videoUrl;
    }
    if (videoInfo) {
      lecture.publicId = videoInfo.publicId;
    }
    lecture.isPreviewFree = isPreviewFree;
    await lecture.save();

    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(200).json({
      lecture,
      success: true,
      message: "Lecture updated successfully...",
    });
  } catch (error) {
    return res.status(500).json({
      error,
      success: false,
      message: "Failed to edit Lectures...",
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found...",
      });
    }

    // delete lecture video from cloudinary
    // if (lecture.publicId) {
    //   await deleteVideoFromCloudinary(lecture.publicId)
    // }

    // remove the lecture ref from the associated course
    await Course.updateOne(
      { lectures: lectureId }, // find
      { $pull: { lectures: lectureId } } // remove
    );
    return res.status(200).json({
      lecture,
      success: false,
      message: "Lecture removed successfully...",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      success: false,
      message: "Failed to remove Lectures...",
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found...",
      });
    }
    return res.status(200).json({
      lecture,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      success: false,
      message: "Failed to get Lecture by Id...",
    });
  }
};

export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found...",
      });
    }
    course.isPublished = publish === "true";

    await course.save();

    const statusMEssage = course.isPublished ? "Published" : "Un-published";
    return res.status(200).json({
      course,
      success: true,
      message: `updated status - ${statusMEssage}`,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      success: false,
      message: "Failed to update status",
    });
  }
};
