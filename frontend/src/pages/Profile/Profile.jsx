import { useEffect, useState } from "react";
import coverImg from "../../assets/cover.jpg";
import EditProfile from "../EditProfile/EditProfile";
import { MdOutlineLocationOn, MdOutlineMail } from "react-icons/md";
import { BsDownload, BsTrash } from "react-icons/bs";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { authData } from "../../features/auth/authSlice";
import Avatar from "../../components/Avatar";
import { deletePhoto } from "../../features/photos/photosApiSlice";
import {
  photosData,
  setPhotoMessageEmpty,
} from "../../features/photos/photosSlice";
import { toastify } from "../../utility/toast";
import { logedInMe } from "../../features/auth/authApiSlice";
import swal from "sweetalert";

const Profile = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(authData);
  const { message, success, error } = useSelector(photosData);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const deletePhotoById = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure do you want to do delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePhoto(id));
        swal("Successfully deleted!", {
          icon: "success",
        });
      }
    });
  };

  // Download Photos
  const handleDownload = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobURL;
        a.download = "image.jpeg"; // You can customize the file name
        a.click();
        URL.revokeObjectURL(blobURL);
      });
  };

  useEffect(() => {
    if (message) {
      toastify(message, "success");
      if (localStorage.getItem("user")) {
        dispatch(logedInMe());
      }
    }
    if (error) {
      toastify(error);
    }
    if (message || success || error) {
      dispatch(setPhotoMessageEmpty());
    }
  }, [message, success, error]);

  const firstCol = Math.ceil(auth?.photos?.length / 3);
  return (
    <div className="profile">
      <div className="profile-wraper">
        <div className="top-header">
          <div className="profile-cover-pic">
            <img
              className="cover-pic"
              src={
                auth?.coverPhoto ? `${auth?.coverPhoto?.secure_url}` : coverImg
              }
              alt={auth?.fullName}
            />
            <Avatar
              classList="profile-pic"
              link={auth?.profilePhoto?.secure_url}
              alt={auth?.fullName}
            />
          </div>
          <h1 className="profile-name">{auth?.fullName}</h1>
          <h6 className="profile-address">
            <MdOutlineMail />
            {auth?.email}
          </h6>
          <h6 className="profile-address">
            <MdOutlineLocationOn />
            {auth?.location}
          </h6>
          <div
            className="profile-edit-button"
            onClick={() => setShowEditProfile(!showEditProfile)}
          >
            Edit profile
          </div>
          {showEditProfile && (
            <EditProfile close={() => setShowEditProfile(false)} />
          )}
        </div>
        <div className="all-skills">
          <h1 className="skill-title">Skills</h1>
          <div className="skill-tags">
            {auth?.skills?.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        </div>
        <div className="uploaded-images">
          <div className="column">
            {/* {auth?.photos?.map((data, index) => (
              <img key={index} src={data.filename.secure_url} alt="" />
            ))} */}
            {auth?.photos &&
              [...auth?.photos].slice(0, firstCol).map((data, index) => {
                return (
                  <div key={index} className="images">
                    <button
                      className="trash"
                      onClick={() => deletePhotoById(data._id)}
                    >
                      <BsTrash />
                    </button>
                    <img src={data?.filename?.secure_url} alt="" />
                    <button
                      onClick={() => handleDownload(data?.filename?.secure_url)}
                      className="download"
                    >
                      <BsDownload />
                    </button>
                  </div>
                );
              })}
          </div>
          <div className="column">
            {auth?.photos &&
              [...auth?.photos]
                .slice(firstCol, firstCol * 2)
                .map((data, index) => {
                  return (
                    <div key={index} className="images">
                      <button
                        className="trash"
                        onClick={() => deletePhotoById(data._id)}
                      >
                        <BsTrash />
                      </button>
                      <img src={data?.filename?.secure_url} alt="" />
                      <button
                        onClick={() =>
                          handleDownload(data?.filename?.secure_url)
                        }
                        className="download"
                      >
                        <BsDownload />
                      </button>
                    </div>
                  );
                })}
          </div>
          <div className="column">
            {auth?.photos &&
              [...auth?.photos]
                .slice(firstCol * 2, firstCol * 3)
                .map((data, index) => {
                  return (
                    <div key={index} className="images">
                      <button
                        className="trash"
                        onClick={() => deletePhotoById(data._id)}
                      >
                        <BsTrash />
                      </button>
                      <img src={data?.filename?.secure_url} alt="" />
                      <button
                        onClick={() =>
                          handleDownload(data?.filename?.secure_url)
                        }
                        className="download"
                      >
                        <BsDownload />
                      </button>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
