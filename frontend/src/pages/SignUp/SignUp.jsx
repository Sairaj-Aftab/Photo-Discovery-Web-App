import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalBox from "../../components/ModalBox/ModalBox";
import { Dna } from "react-loader-spinner";
import { toastify } from "../../utility/toast";
import { register } from "../../features/auth/authApiSlice";
import { authData, setMessageEmpty } from "../../features/auth/authSlice";

const SignUp = ({ close }) => {
  const dispatch = useDispatch();
  const { success, message, error } = useSelector(authData);
  const [input, setInput] = useState({
    fullName: "",
    auth: "",
    password: "",
  });
  const handleChangeValue = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit Form for Register
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (!input.fullName || !input.auth || !input.password) {
      toastify("All fields are required!");
    } else {
      dispatch(register(input));
      dispatch(setMessageEmpty());
    }
  };

  useEffect(() => {
    if (message) {
      toastify(message, "success");
    }
    if (error) {
      toastify(error);
    }
    if (success) {
      close();
      setInput({ fullName: "", auth: "", password: "" });
    }
    if (success || message || error) {
      dispatch(setMessageEmpty());
    }
  }, [success, message, error]);

  // let loading = "";
  // if (isLoading) {
  //   loading = (
  //     <Dna
  //       visible={true}
  //       height="80"
  //       width="80"
  //       ariaLabel="dna-loading"
  //       wrapperStyle={{}}
  //       wrapperClass="dna-wrapper"
  //     />
  //   );
  // }

  return (
    <div>
      <ModalBox title="Sign up" close={close}>
        {/* {loading} */}
        <form onSubmit={handleSubmitRegister} className="login-form">
          <input
            type="text"
            placeholder="Full name"
            name="fullName"
            value={input.fullName}
            onChange={handleChangeValue}
          />
          <input
            type="text"
            placeholder="Email address"
            name="auth"
            value={input.auth}
            onChange={handleChangeValue}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleChangeValue}
          />
          <button type="submit">Sign up</button>
        </form>
      </ModalBox>
    </div>
  );
};

export default SignUp;
