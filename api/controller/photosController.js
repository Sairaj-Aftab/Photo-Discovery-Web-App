import Photos from "../models/photos.js";
import User from "../models/user.js";
import cloudinary from "../utility/cloudinary.js";
import createError from "../utility/createError.js";

export const createPost = async (req, res, next) => {
  try {
    const userId = req.me._id;
    const { title, tags } = req.body;
    const arrayTag = tags ? tags.split(/[,\s]+/) : [];
    let photo = [];
    for (let i = 0; i < req.files.length; i++) {
      const uploadPhoto = await cloudinary.uploader.upload(req.files[i].path, {
        folder: "Photo_discovery",
      });
      photo.push({
        public_id: uploadPhoto.public_id,
        secure_url: uploadPhoto.secure_url,
      });
    }
    const filenames = photo.map((file) => ({
      public_id: file.public_id,
      secure_url: file.secure_url,
    }));
    const postsToCreate = filenames.map((filename) => ({
      userId,
      title: title ? title : null,
      tags: tags ? arrayTag : [],
      filename,
    }));

    const post = await Photos.create(postsToCreate);
    let postId = [];
    for (let i = 0; i < post.length; i++) {
      const element = post[i]._id;
      postId.push(element);
    }

    const userPhotos = await User.findByIdAndUpdate(
      userId,
      {
        $push: { photos: postId },
      },
      { new: true }
    );

    if (post.length >= 0 && userPhotos) {
      return res.status(200).json({ post, message: "Okay" });
    }
  } catch (error) {
    return next(error);
  }
};

// Get All Photos
export const getAllPhotos = async (req, res, next) => {
  try {
    const photos = await Photos.find().populate("userId");
    if (photos.length < 1) {
      return next(createError(404, "Any photos not found"));
    }
    res.status(200).json(photos);
  } catch (error) {
    return next(error);
  }
};

// Get Photos by ID
export const searchPhotos = async (req, res, next) => {
  try {
    const { search } = req.body;
    const photos = await Photos.find({
      $or: [
        { title: { $regex: new RegExp(search, "i") } },
        { tags: { $elemMatch: { $regex: new RegExp(search, "i") } } },
      ],
    }).populate("userId");

    if (photos.length > 0) {
      res.status(200).json({ photos, message: "Okay" });
    } else {
      return next(createError(404, "Photos not found"));
    }
  } catch (error) {
    return next(error);
  }
};

// Delete Photo By Id
export const deletePhotoById = async (req, res, next) => {
  try {
    const userId = req.me._id;
    const { id } = req.params;
    const deletePhoto = await Photos.findByIdAndDelete(id);
    const userPhotoDelete = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { photos: deletePhoto._id },
      },
      { new: true }
    );
    await cloudinary.uploader.destroy(deletePhoto.filename.public_id);
    res
      .status(200)
      .json({ delete: deletePhoto, message: "Successfully deleted" });
  } catch (error) {
    return next(error);
  }
};
