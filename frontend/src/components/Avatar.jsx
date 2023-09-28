import profileImg from "../assets/profile.png";

const Avatar = ({ classList, link, alt }) => {
  return (
    <img
      className={classList}
      src={link ? link : profileImg}
      alt={alt ? alt : ""}
    />
  );
};

export default Avatar;
