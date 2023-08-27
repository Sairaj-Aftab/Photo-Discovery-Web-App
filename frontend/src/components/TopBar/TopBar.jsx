import { useEffect, useState } from "react";
import { FcCameraIdentification } from "react-icons/fc";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import UploadPhoto from "../UploadPhoto/UploadPhoto";
import "./topbar.css";
import { useDispatch, useSelector } from "react-redux";
import { authData, setMessageEmpty } from "../../features/auth/authSlice";
import { logOut } from "../../features/auth/authApiSlice";
import swal from "sweetalert";

const TopBar = () => {
  const dispatch = useDispatch();
  const { auth, success } = useSelector(authData);
  const navigate = useNavigate();
  const [showUploadBox, setShowUploadBox] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [phoneMenu, setPhoneMenu] = useState(false);
  const handleSearch = () => {
    navigate("/");
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
        dispatch(logOut());
        swal("Successfully log out!", {
          icon: "success",
        });
      }
    });
  };

  // Submit Button
  const submitButton = () => {
    if (auth) {
      setShowUploadBox(true);
    }
    if (!auth) {
      setShowLogin(true);
    }
  };
  useEffect(() => {
    if (success) {
      dispatch(setMessageEmpty());
    }
  }, [success]);
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
                <img src={Avatar()} alt="" />
              </Link>
            </div>
          )}

          <button onClick={submitButton}>Submit a photo</button>

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
