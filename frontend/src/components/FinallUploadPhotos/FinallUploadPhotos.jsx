import ModalBox from "../ModalBox/ModalBox";
import "./finalluploadphotos.css";

const FinallUploadPhotos = ({ photos, close }) => {
  return (
    <div>
      <ModalBox title="Upload photos" close={close}>
        <div className="finall-images">
          {photos?.map((item, index) => {
            const urlImage = URL.createObjectURL(item);
            return <img key={index} src={urlImage} alt="" />;
          })}
        </div>
        <div className="finall-button">
          <div className="cancel" onClick={close}>
            Cancel
          </div>
          <div className="upload">Upload</div>
        </div>
      </ModalBox>
    </div>
  );
};

export default FinallUploadPhotos;
