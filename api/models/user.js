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
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    coverPhoto: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    photos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Photos",
      default: [],
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
