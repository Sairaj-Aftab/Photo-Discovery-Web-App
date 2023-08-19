import ModalBox from "../../components/ModalBox/ModalBox";
import "./editprofile.css";

const EditProfile = ({ close }) => {
  return (
    <div className="edit-profile">
      <ModalBox title="Edit profile" close={close}>
        <div className="edit-profile">
          <div className="edit-profile-wraper">
            <form>
              <input type="text" placeholder="Name" />
            </form>
          </div>
        </div>
      </ModalBox>
    </div>
  );
};

export default EditProfile;
