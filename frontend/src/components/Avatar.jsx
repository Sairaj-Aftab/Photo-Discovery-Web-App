import React from "react";
import profileImg from "../assets/profile.png";
import { useSelector } from "react-redux";
import { authData } from "../features/auth/authSlice";

const Avatar = () => {
  const { auth } = useSelector(authData);
  return auth.profilePhoto ? `/profilecover/${auth.profilePhoto}` : profileImg;
};

export default Avatar;
