import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CatManager from "./cms/catManager";
import ExManager from "./cms/exManager";

const Header = () => {
  const { filteredData } = useSelector((state) => state.cms);
  const [catModal, setCatModal] = useState(false);
  const [exModal, setExModal] = useState(false);

  return (
    <>
      <header id="header">
        <nav className="content-wrapper">
          <Link to="/" className="logo">
            Trainer!
          </Link>
          {filteredData ? (
            <ul className="h-list c-gap-10">
              <li>
                <button
                  type="button"
                  className="btn-regular"
                  onClick={() => {
                    setCatModal(true);
                  }}
                >
                  Add Category
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn-regular"
                  onClick={() => {
                    setExModal(true);
                  }}
                >
                  Add Exercise
                </button>
              </li>
            </ul>
          ) : (
            ""
          )}
        </nav>
        <div className="seperator" />
      </header>
      {catModal ? <CatManager modalControl={setCatModal} /> : ""}
      {exModal ? <ExManager modalControl={setExModal} /> : ""}
    </>
  );
};

export default Header;
