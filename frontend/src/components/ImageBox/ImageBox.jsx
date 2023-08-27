import { useEffect, useState } from "react";
import { BsDownload } from "react-icons/bs";
import axios from "axios";
import { createClient } from "pexels";
import "./imagebox.css";

const API_KEY = "B7H7H2rBWApijlw6PP3C2ma73GIxKelmyJR78PDq6tpA11niXaS8u5c2";
const client = createClient(API_KEY);

const ImageBox = () => {
  const [query, setSearch] = useState();
  const [photos, setPhotos] = useState([]);

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

  const searchSubmit = (e) => {
    e.preventDefault();
    client.photos
      .search({ query, per_page: 10 })
      .then((photos) => setPhotos(photos.photos));
  };

  return (
    <div>
      <form onSubmit={searchSubmit}>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">search</button>
      </form>
      {photos.length < 1 && (
        <div>
          <h2>Photos not found</h2>
        </div>
      )}
      {photos.length > 0 && (
        <div className="image-box">
          <div className="column">
            {photos.slice(0, 3).map((data, index) => {
              return (
                <div className="box-inner">
                  <img src={data.src.medium} alt="" />
                  <button
                    onClick={() => handleDownload(data.src.original)}
                    className="download"
                  >
                    <BsDownload />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="column">
            {photos.slice(3, 6).map((data, index) => {
              return (
                <div className="box-inner">
                  <img src={data.src.medium} alt="" />
                  <button
                    onClick={() => handleDownload(data.src.original)}
                    className="download"
                  >
                    <BsDownload />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="column">
            {photos.slice(6, 10).map((data, index) => {
              return (
                <div className="box-inner">
                  <img src={data.src.medium} alt="" />
                  <button
                    onClick={() => handleDownload(data.src.original)}
                    className="download"
                  >
                    <BsDownload />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageBox;
