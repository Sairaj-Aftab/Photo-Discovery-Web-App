import { useEffect, useState } from "react";
import { FcCameraIdentification } from "react-icons/fc";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import UploadPhoto from "../UploadPhoto/UploadPhoto";
import "./topbar.css";
import { useDispatch, useSelector } from "react-redux";
import { authData, setMessageEmpty } from "../../features/auth/authSlice";
import { logOut } from "../../features/auth/authApiSlice";
import swal from "sweetalert";
import Avatar from "../Avatar";
import {
  getAllPhotos,
  searchPhotos,
} from "../../features/photos/photosApiSlice";
import {
  photosData,
  setPhotoMessageEmpty,
} from "../../features/photos/photosSlice";

const TopBar = () => {
  const dispatch = useDispatch();
  const { auth, success } = useSelector(authData);
  const {
    message,
    loader,
    error,
    success: photoSuccess,
  } = useSelector(photosData);
  const navigate = useNavigate();
  const [showUploadBox, setShowUploadBox] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [phoneMenu, setPhoneMenu] = useState(false);
  const handleSearch = (e) => {
    navigate("/");
    if (e.target.value) {
      dispatch(searchPhotos({ search: e.target.value }));
    }
    if (!e.target.value) {
      dispatch(getAllPhotos());
    }
  };

  const userLogOut = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure do you want to do log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setPhoneMenu(false);
        dispatch(logOut());
        navigate("/");
        swal("Successfully log out!", {
          icon: "success",
        });
      }
    });
  };

  // Submit Button
  const submitButton = () => {
    if (auth) {
      setPhoneMenu(false);
      setShowUploadBox(true);
    }
    if (!auth) {
      setPhoneMenu(false);
      setShowLogin(true);
    }
  };
  useEffect(() => {
    if (success) {
      dispatch(setMessageEmpty());
    }
    if (photoSuccess || message || error) {
      dispatch(setPhotoMessageEmpty());
    }
  }, [success, photoSuccess, message, error]);
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
            onChange={handleSearch}
            type="text"
            placeholder="Search what you want..."
          />
        </div>
        <div className="upload-button">
          {auth ? (
            <div className="signup-login-button">
              <span onClick={userLogOut}>Log out</span>
            </div>
          ) : (
            <div className="signup-login-button">
              <span onClick={() => setShowLogin(!showLogin)}>Log in</span> /{" "}
              <span onClick={() => setShowSignup(!showSignup)}>Sign up</span>
            </div>
          )}
          {auth && (
            <div className="profile-button">
              <Link to="/profile">
                <Avatar
                  link={auth?.profilePhoto?.secure_url}
                  alt={auth?.fullName}
                />
              </Link>
            </div>
          )}

          <button onClick={submitButton}>Submit a photo</button>

          {/* <div className="more-button">
            <HiOutlineBars3 />
          </div> */}
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
              <li onClick={submitButton}>
                <span>Upload a photo</span>
              </li>
              {auth && (
                <li onClick={() => setPhoneMenu(false)}>
                  <Link to="/profile">
                    <span>Profile</span>
                  </Link>
                </li>
              )}
              {auth ? (
                <li onClick={userLogOut}>
                  <span>Log out</span>
                </li>
              ) : (
                <>
                  <li
                    onClick={() => {
                      setShowSignup(!showSignup), setPhoneMenu(false);
                    }}
                  >
                    <span>Sign up</span>
                  </li>
                  <li
                    onClick={() => {
                      setShowLogin(!showLogin), setPhoneMenu(false);
                    }}
                  >
                    <span>Login</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
