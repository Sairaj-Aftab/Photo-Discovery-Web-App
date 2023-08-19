import { useState } from "react";
import { FcCameraIdentification } from "react-icons/fc";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import UploadPhoto from "../UploadPhoto/UploadPhoto";
import "./topbar.css";

const TopBar = () => {
  const [showUploadBox, setShowUploadBox] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [phoneMenu, setPhoneMenu] = useState(false);
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate("/");
  };
  return (
    <div>
      {showLogin && <Login close={() => setShowLogin(false)} />}
      {showSignup && <SignUp close={() => setShowSignup(false)} />}
      {showUploadBox && (
        <UploadPhoto close={() => setShowUploadBox(!setShowUploadBox)} />
      )}
      <div className="topbar">
        <div className="search-filter">
          <Link to="/">
            <div className="topbar-logo">
              <FcCameraIdentification />
            </div>
          </Link>

          <input
            onClick={handleSearch}
            type="text"
            placeholder="Search what you want..."
          />
        </div>
        <div className="upload-button">
          <div className="signup-login-button">
            <span onClick={() => setShowLogin(!showLogin)}>Log in</span> /{" "}
            <span onClick={() => setShowSignup(!showSignup)}>Sign up</span>
          </div>
          <div className="profile-button">
            <Link to="/profile">
              <img
                src="https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=959&q=80"
                alt=""
              />
            </Link>
          </div>
          <button onClick={() => setShowUploadBox(!showUploadBox)}>
            Submit a photo
          </button>
          <div className="more-button">
            <HiOutlineBars3 />
          </div>
        </div>
        <div
          className="more-mob-button"
          onClick={() => setPhoneMenu(!phoneMenu)}
        >
          <HiOutlineBars3 />
        </div>
        {phoneMenu && (
          <div className="topbar-mobile-menu">
            <ul>
              <li onClick={() => setShowSignup(!showSignup)}>
                <span>Sign up</span>
              </li>
              <li onClick={() => setShowLogin(!showLogin)}>
                <span>Login</span>
              </li>
              <li>
                <Link to="/profile">
                  <span>Profile</span>
                </Link>
              </li>
              <li onClick={() => setShowUploadBox(!showUploadBox)}>
                <span>Upload a photo</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
