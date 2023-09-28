import mongoose from "mongoose";

const photosSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      trim: true,
      default: null,
    },
    tags: {
      type: Array,
      default: [],
    },
    filename: {
      type: mongoose.Schema.Types.Mixed,
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Photos", photosSchema);
