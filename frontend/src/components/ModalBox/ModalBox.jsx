import React from "react";
import { RxCross2 } from "react-icons/rx";
import "./modalbox.css";

const ModalBox = ({ children, title, close }) => {
  return (
    <div className="modal-box">
      <div
        className="modal-box-wraper"
        data-aos="fade-down"
        // data-aos-easing="linear"
        data-aos-duration="500"
      >
        <div className="header">
          <h1>{title}</h1>
          <div className="icon" onClick={close}>
            <RxCross2 />
          </div>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
};

export default ModalBox;
