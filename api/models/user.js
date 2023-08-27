import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    coverPhoto: {
      type: String,
      default: null,
    },
    skills: {
      type: Array,
      default: [],
    },
    location: {
      type: String,
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
    accessToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
