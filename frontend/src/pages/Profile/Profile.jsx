import { useState } from "react";
import coverImg from "../../assets/cover.jpg";
import EditProfile from "../EditProfile/EditProfile";
import { MdOutlineLocationOn, MdOutlineMail } from "react-icons/md";
import "./profile.css";
import { useSelector } from "react-redux";
import { authData } from "../../features/auth/authSlice";
import Avatar from "../../components/Avatar";

const Profile = () => {
  const { auth } = useSelector(authData);
  const [showEditProfile, setShowEditProfile] = useState(false);
  return (
    <div className="profile">
      <div className="profile-wraper">
        <div className="top-header">
          <div className="profile-cover-pic">
            <img
              className="cover-pic"
              src={
                auth.coverPhoto ? `/profilecover/${auth.coverPhoto}` : coverImg
              }
              alt=""
            />
            <img className="profile-pic" src={Avatar()} alt="" />
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
          <div className="first-column">
            <img
              src="https://images.unsplash.com/photo-1671721812082-758de60eb17d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1501349800519-48093d60bde0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGNvdmVyJTIwcGhvdG98ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1610800563169-b1a9f736f9cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGNvdmVyJTIwcGhvdG98ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="second-column">
            <img
              src="https://images.unsplash.com/photo-1625579293382-1a733ee8db0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGNvdmVyJTIwcGhvdG98ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <img
              src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGNvdmVyJTIwcGhvdG98ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="third-column">
            <img
              src="https://images.unsplash.com/photo-1671721812082-758de60eb17d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
