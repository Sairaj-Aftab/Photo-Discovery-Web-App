import React, { useState } from "react";
import { FcGallery } from "react-icons/fc";
import FinallUploadPhotos from "../FinallUploadPhotos/FinallUploadPhotos";
import ModalBox from "../ModalBox/ModalBox";
import "./uploadphoto.css";

const UploadPhoto = ({ close }) => {
  const [nextUploadModal, setNextUploadModal] = useState(false);
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (e) => {
    const images = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...images]);
  };

  const handleNextModal = () => {
    setNextUploadModal(!nextUploadModal);
  };
  return (
    <div>
      <ModalBox title="Upload photos" close={close}>
        <div className="photo-upload-button">
          <input type="file" multiple onChange={handleFileChange} />
          <div className="icon">
            <FcGallery />
          </div>
          <span>Upload your photos</span>
        </div>
        {photos.length > 0 && (
          <div className="instants-images">
            {photos.map((item, index) => {
              const urlImages = URL.createObjectURL(item);
              return (
                <div className="photos" key={index}>
                  <img src={urlImages} alt="" />
                  <input type="text" placeholder="Title" />
                </div>
              );
            })}
          </div>
        )}

        <div className="footer-button">
          <button className="cancel" onClick={close}>
            Cancel
          </button>
          <button
            className={`next ${photos.length > 0 ? "active" : ""}`}
            disabled={photos.length > 0 ? false : true}
            onClick={handleNextModal}
          >
            Next
          </button>
        </div>
        {nextUploadModal && (
          <FinallUploadPhotos
            photos={photos}
            close={() => setNextUploadModal(!nextUploadModal)}
          />
        )}
      </ModalBox>
    </div>
  );
};

export default UploadPhoto;
