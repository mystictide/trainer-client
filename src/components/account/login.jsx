import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../features/auth/authSlice";

function Login({ modalControl }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || (user !== null && user.Token !== null)) {
      modalControl(false);
      navigate("/");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  const { email, password } = formData;

  return (
    <div className="modal-container">
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <section className="heading">
          <h1>Come aboard</h1>
          <FaTimes
            onClick={() => {
              modalControl(false);
            }}
          />
        </section>
        <section>
          <form className="v-items r-gap-10" onSubmit={onSubmit}>
            <label>Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="enter your email address"
              onChange={onChange}
            />
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="enter your password"
              onChange={onChange}
            />
            <div className="functions">
              <button type="submit" className="btn-function">
                Sign in
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
