import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalBox from "../../components/ModalBox/ModalBox";
import "./login.css";
import { toastify } from "../../utility/toast";
import { login } from "../../features/auth/authApiSlice";
import { authData, setMessageEmpty } from "../../features/auth/authSlice";

const Login = ({ close }) => {
  const dispatch = useDispatch();
  const { error, message, success } = useSelector(authData);
  const [input, setInput] = useState({
    auth: "",
    password: "",
  });
  const handleValueChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Login
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (!input.auth || !input.password) {
      toastify("All fields are required!");
    } else {
      dispatch(login(input));
    }
  };

  useEffect(() => {
    if (message) {
      toastify(message, "success");
    }
    if (error) {
      toastify(error);
    }
    if (message || error || success) {
      dispatch(setMessageEmpty());
    }
  }, [error, message, success]);

  return (
    <div>
      <ModalBox title="Log in" close={close}>
        <form onSubmit={handleSubmitLogin} className="login-form">
          <input
            type="text"
            placeholder="Email or user name"
            name="auth"
            value={input.auth}
            onChange={handleValueChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleValueChange}
          />
          <button type="submit">Log in</button>
        </form>
      </ModalBox>
    </div>
  );
};

export default Login;
