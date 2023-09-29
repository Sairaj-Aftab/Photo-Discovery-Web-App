import React, { useEffect } from "react";
import coverImg from "../../assets/cover.jpg";
import { MdOutlineLocationOn, MdOutlineMail } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleUser } from "../../features/auth/authApiSlice";
import { authData, setMessageEmpty } from "../../features/auth/authSlice";
import Avatar from "../../components/Avatar";
import Loading from "../../components/Loading/Loading";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userName } = useParams();
  const { singleUser, loader, success } = useSelector(authData);
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
    dispatch(getSingleUser(userName));
    if (success) {
      dispatch(setMessageEmpty());
    }
  }, [dispatch]);
  const firstCol = Math.ceil(singleUser?.photos?.length / 3);
  return (
    <div className="profile">
      {loader ? (
        <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
          <Loading />
        </div>
      ) : (
        <div className="profile-wraper">
          <div className="top-header">
            <div className="profile-cover-pic">
              <img
                className="cover-pic"
                src={
                  singleUser?.coverPhoto
                    ? `${singleUser?.coverPhoto?.secure_url}`
                    : coverImg
                }
                alt={singleUser?.fullName}
              />
              <Avatar
                classList="profile-pic"
                link={singleUser?.profilePhoto?.secure_url}
                alt={singleUser?.fullName}
              />
            </div>
            <h1 className="profile-name">{singleUser?.fullName}</h1>
            <h6 className="profile-address">
              <MdOutlineMail />
              {singleUser?.email}
            </h6>
            <h6 className="profile-address">
              <MdOutlineLocationOn />
              {singleUser?.location}
            </h6>
          </div>
          <div className="all-skills">
            <h1 className="skill-title">Skills</h1>
            <div className="skill-tags">
              {singleUser?.skills?.map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </div>
          </div>
          <div className="uploaded-images">
            <div className="column">
              {/* {auth?.photos?.map((data, index) => (
          <img key={index} src={data.filename.secure_url} alt="" />
        ))} */}
              {singleUser?.photos &&
                [...singleUser?.photos]
                  .slice(0, firstCol)
                  .map((data, index) => {
                    return (
                      <div key={index} className="images">
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
              {singleUser?.photos &&
                [...singleUser?.photos]
                  .slice(firstCol, firstCol * 2)
                  .map((data, index) => {
                    return (
                      <div key={index} className="images">
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
              {singleUser?.photos &&
                [...singleUser?.photos]
                  .slice(firstCol * 2, firstCol * 3)
                  .map((data, index) => {
                    return (
                      <div key={index} className="images">
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
      )}
    </div>
  );
};

export default UserProfile;
