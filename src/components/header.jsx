import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./account/login";
import RegisterModal from "./account/register";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [loginActive, setLoginState] = useState(false);
  const [registerActive, setRegisterState] = useState(false);

  return (
    <>
      <header id="header">
        <nav className="content-wrapper">
          <Link to="/" className="logo">
            Trainer!
          </Link>
          <ul className="h-list c-gap-10">
            {user ? (
              <>
                <li style={{ position: "relative" }}>
                  <button
                    type="button"
                    className="btn-regular"
                    onMouseEnter={(e) => setUserDropdown(true)}
                    onClick={(e) => setUserDropdown(true)}
                  >
                    {user.Username}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="btn-function"
                    onClick={() => {
                      navigate("/listing/new");
                    }}
                  >
                    Create Listing
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    type="button"
                    className="btn-regular"
                    onClick={() => {
                      setLoginState(true);
                    }}
                  >
                    Sign in
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="btn-regular"
                    onClick={() => {
                      setRegisterState(true);
                    }}
                  >
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="seperator" />
      </header>
      {loginActive ? <LoginModal modalControl={setLoginState} /> : ""}
      {registerActive ? <RegisterModal modalControl={setRegisterState} /> : ""}
    </>
  );
};

export default Header;
