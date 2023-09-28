import { useEffect, useState } from "react";
import ModalBox from "../../components/ModalBox/ModalBox";
import { skillsList } from "../../utility/skillList";
import { useDispatch, useSelector } from "react-redux";
import "./editprofile.css";
import { authData } from "../../features/auth/authSlice";
import { editProfile } from "../../features/auth/authApiSlice";
import { toastify } from "../../utility/toast";
import Loading from "../../components/Loading/Loading";

const EditProfile = ({ close }) => {
  const dispatch = useDispatch();
  const { auth, loader, error, success } = useSelector(authData);
  const [proPic, setProPic] = useState();
  const [coverPic, setCoverPic] = useState();
  const [seletSkills, setSkill] = useState([...auth?.skills]);

  const changeCheckBox = (e) => {
    const value = e.target.value;

    const arr = [...seletSkills];
    if (seletSkills.includes(value)) {
      arr.splice(seletSkills.indexOf(value), 1);
    } else {
      arr.push(value);
    }
    setSkill([...arr]);
  };

  const [input, setInput] = useState({
    fullName: auth?.fullName,
    email: auth?.email,
    location: auth?.location,
  });

  const changeInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // console.log(seletSkills);

  const submitEdit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < seletSkills.length; i++) {
      data.append("skills", seletSkills[i]);
    }
    data.append("avatar", proPic);
    data.append("cover_photo", coverPic);
    data.append("fullName", input.fullName);
    data.append("email", input.email);
    data.append("location", input.location);

    dispatch(editProfile({ data: data }));
  };

  useEffect(() => {
    if (error) {
      toastify(error);
    }
    if (success) {
      close();
    }
  }, [error, success]);
  return (
    <div className="edit-profile">
      <ModalBox title="Edit profile" close={close}>
        <div className="edit-profile">
          <div className="edit-profile-wraper">
            <form
              onSubmit={submitEdit}
              encType="multipart/form-data"
              method="put"
            >
              <div className="form-list">
                {loader && (
                  <div className="edit-loading">
                    <Loading />
                  </div>
                )}
                <div className="edit-image-upload">
                  <div>
                    Profile picture{" "}
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={(e) => setProPic(e.target.files[0])}
                    />
                  </div>
                  <div>
                    Cover photo{" "}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCoverPic(e.target.files[0])}
                    />
                  </div>
                </div>
                {(proPic || coverPic) && (
                  <div className="edit-img-name">
                    {proPic && <p>{proPic.name}</p>}
                    {coverPic && <p>{coverPic.name}</p>}
                  </div>
                )}
                <input
                  type="text"
                  name="fullName"
                  value={input.fullName}
                  placeholder="Name"
                  onChange={changeInput}
                />
                <input
                  type="text"
                  name="email"
                  value={input.email}
                  placeholder="Email"
                  onChange={changeInput}
                />
                <input
                  type="text"
                  name="location"
                  value={input.location}
                  placeholder="Location"
                  onChange={changeInput}
                />
                <div className="skill-list">
                  <p>Skills</p>
                  {skillsList.map((skill, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={skill}
                        value={skill}
                        onChange={changeCheckBox}
                        checked={seletSkills.includes(skill)}
                      />
                      <label htmlFor={skill}> {skill}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="edit-pro-footer">
                <button onClick={() => close()}>Cancel</button>
                <button type="submit">
                  {loader ? "Submitting....." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </ModalBox>
    </div>
  );
};

export default EditProfile;
