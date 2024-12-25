import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    originalPassword: {
      type: String,
    },
    role: {
      type: String,
      enum: ["student", "instructor"],
      default: "student",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    photoURL: {
      type: String,
      default:
        "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
    },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("User", userSchema);
