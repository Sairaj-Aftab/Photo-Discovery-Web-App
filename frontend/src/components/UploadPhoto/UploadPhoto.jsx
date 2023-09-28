import React, { useEffect, useState } from "react";
import { FcGallery } from "react-icons/fc";
import { SlCloudUpload } from "react-icons/sl";
import ModalBox from "../ModalBox/ModalBox";
import "./uploadphoto.css";
import {
  photosData,
  setPhotoMessageEmpty,
} from "../../features/photos/photosSlice";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPhotos } from "../../features/photos/photosApiSlice";
import { logedInMe } from "../../features/auth/authApiSlice";
import Loading from "../Loading/Loading";

const UploadPhoto = ({ close }) => {
  const dispatch = useDispatch();
  const { loader, success, message, error } = useSelector(photosData);
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState();
  const [tag, setTag] = useState();

  const handleFileChange = (e) => {
    const images = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...images]);
  };

  // Upload the photos
  const uploadSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < photos.length; i++) {
      data.append("photos", photos[i]);
    }
    if (title) {
      data.append("title", title);
    }
    if (tag) {
      data.append("tags", tag);
    }
    dispatch(createPost({ data }));
  };
  useEffect(() => {
    if (success || message) {
      if (localStorage.getItem("user")) {
        dispatch(logedInMe());
      }
      dispatch(getAllPhotos());
      setPhotos([]);
      setTitle("");
      setTag("");
      close();
    }
    if (success || message || error) {
      dispatch(setPhotoMessageEmpty());
    }
  }, [success, message, error]);

  return (
    <ModalBox title="Upload photos" close={close}>
      <form method="POST" onSubmit={uploadSubmit} encType="multipart/form-data">
        {loader ? (
          <div className="upload-icon">
            <Loading />
          </div>
        ) : (
          <>
            <div className="photo-upload-button">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
              <div className="icon">
                <FcGallery />
              </div>
              {photos.length < 1 ? (
                <span>Upload a photo</span>
              ) : (
                <span>Upload more photos</span>
              )}
            </div>
            {photos.length > 0 && (
              <div className="input-title">
                <input
                  type="text"
                  placeholder="Title (Optional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Tags (Optional)"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>
            )}
            {photos.length < 1 && (
              <div className="upload-icon">
                <SlCloudUpload />
              </div>
            )}
            {photos.length > 0 && (
              <div className="instants-images">
                {photos.map((item, index) => {
                  const urlImages = URL.createObjectURL(item);
                  return (
                    <div className="photos" key={index}>
                      <img src={urlImages} alt="" />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        <div className="footer-button">
          <button className="cancel" onClick={close}>
            Cancel
          </button>
          <button
            type="submit"
            className={`next ${photos.length > 0 ? "active" : "disabled"}`}
            disabled={photos.length > 0 ? false : true}
          >
            {loader ? "Uploading..." : "Submit"}
          </button>
        </div>
      </form>
    </ModalBox>
  );
};

export default UploadPhoto;
