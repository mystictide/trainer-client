import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { favourites } = useSelector((state) => state.main);

  return (
    <>
      <header id="header">
        <nav className="content-wrapper">
          <Link to="/" className="logo">
            Trainer!
          </Link>
          {favourites ? (
            <button
              onClick={() => navigate("/favourites")}
              className="btn-function nav"
            >
              Favourites
            </button>
          ) : (
            ""
          )}
        </nav>
        <div className="seperator" />
      </header>
    </>
  );
};

export default Header;
