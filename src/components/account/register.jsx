import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../features/auth/authSlice";
import {
  checkExistingMail,
  checkExistingUsername
} from "../../features/auth/validationSlice";

function Register({ modalControl }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formValidation, setFormValidation] = useState({
    vPassword: true,
  });

  const { user, isError, message } = useSelector(
    (state) => state.auth
  );
  const { username, email, password } = formData;
  const { vPassword } = formValidation;
  const { usernameExists, emailExists } = useSelector(
    (state) => state.validation
  );

  useEffect(() => {
    if (user) {
      navigate("/");
      modalControl(false);
    }
    if (isError) {
      toast.error(message);
    }
  }, [
    user,
    isError,
    message,
    navigate,
    setFormData,
    setFormValidation,
    dispatch,
  ]);

  useEffect(() => {
    const validateUsername = setTimeout(() => {
      if (username.length > 0) {
        dispatch(checkExistingUsername(username));
      }
    }, 2000);
    return () => clearTimeout(validateUsername);
  }, [username, dispatch]);

  useEffect(() => {
    const validateMail = setTimeout(() => {
      if (email.length > 0) {
        dispatch(checkExistingMail(email));
      }
    }, 2000);
    return () => clearTimeout(validateMail);
  }, [email, dispatch]);

  useEffect(() => {
    const validatePassword = setTimeout(() => {
      if (password.length > 6) {
        setFormValidation((prevState) => ({
          ...prevState,
          vPassword: false,
        }));
      } else {
        setFormValidation((prevState) => ({
          ...prevState,
          vPassword: true,
        }));
      }
    }, 2000);
    return () => clearTimeout(validatePassword);
  }, [password, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { username, email, password };
    if (!vPassword) {
      dispatch(register(userData));
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <section className="heading">
          <h1>Join Moosx!</h1>
          <FaTimes
            onClick={() => {
              modalControl(false);
            }}
          />
        </section>
        <section>
          <form className="v-items r-gap-10" onSubmit={onSubmit}>
            <label>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              placeholder="enter a username"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            {usernameExists ? (
              <label className="error">Username already exists</label>
            ) : (
              ""
            )}
            <label>Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="enter an email address"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            {emailExists ? (
              <label className="error">Email address already registered</label>
            ) : (
              ""
            )}
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="set a password"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            {vPassword ? (
              <label className="error">
                Password requires more than 6 characters
              </label>
            ) : (
              ""
            )}
            <div className="functions">
              <button type="submit" className="btn-function">
                Sign up
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Register;
