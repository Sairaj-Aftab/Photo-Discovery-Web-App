import { BsDownload, BsBookmarks } from "react-icons/bs";
import "./imagebox.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { photosData } from "../../features/photos/photosSlice";
import Avatar from "../Avatar";

// const API_KEY = "B7H7H2rBWApijlw6PP3C2ma73GIxKelmyJR78PDq6tpA11niXaS8u5c2";
// const client = createClient(API_KEY);

const ImageBox = () => {
  const { photos, loader } = useSelector(photosData);

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

  const firstCol = Math.ceil(photos?.length / 3);

  return (
    <div>
      <div className="image-box">
        <div className="column">
          {photos &&
            [...photos].slice(0, firstCol).map((data, index) => {
              return (
                <div key={index} className="box-inner">
                  <button className="save">
                    <BsBookmarks />
                  </button>
                  <img src={data?.filename?.secure_url} alt="" />
                  <Link to={`${data?.userId?.userName}`} className="user-pro">
                    <Avatar
                      classList="user-pro-img"
                      link={data?.userId?.profilePhoto?.secure_url}
                      alt={data?.userId?.fullName}
                    />
                    <h3>{data?.userId?.fullName}</h3>
                  </Link>
                  <button
                    onClick={() => handleDownload(data?.filename?.secure_url)}
                    className="download"
                  >
                    <BsDownload />
                  </button>
                </div>
              );
            })}
        </div>
        <div className="column">
          {photos &&
            [...photos].slice(firstCol, firstCol * 2).map((data, index) => {
              return (
                <div key={index} className="box-inner">
                  <button className="save">
                    <BsBookmarks />
                  </button>
                  <img src={data?.filename?.secure_url} alt="" />
                  <Link to={`${data?.userId?.userName}`} className="user-pro">
                    <Avatar
                      classList="user-pro-img"
                      link={data?.userId?.profilePhoto?.secure_url}
                      alt={data?.userId?.fullName}
                    />
                    <h3>{data?.userId?.fullName}</h3>
                  </Link>
                  <button
                    onClick={() => handleDownload(data?.filename?.secure_url)}
                    className="download"
                  >
                    <BsDownload />
                  </button>
                </div>
              );
            })}
        </div>
        <div className="column">
          {photos &&
            [...photos].slice(firstCol * 2, firstCol * 3).map((data, index) => {
              return (
                <div key={index} className="box-inner">
                  <button className="save">
                    <BsBookmarks />
                  </button>
                  <img src={data?.filename?.secure_url} alt="" />
                  <Link to={`${data?.userId?.userName}`} className="user-pro">
                    <Avatar
                      classList="user-pro-img"
                      link={data?.userId?.profilePhoto?.secure_url}
                      alt={data?.userId?.fullName}
                    />
                    <h3>{data?.userId?.fullName}</h3>
                  </Link>
                  <button
                    onClick={() => handleDownload(data?.filename?.secure_url)}
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
  );
};

export default ImageBox;
