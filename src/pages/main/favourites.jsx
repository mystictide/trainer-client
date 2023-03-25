import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExerciseBoxes from "../../components/main/exerciseBoxes";

function Favourites() {
  const navigate = useNavigate();
  const { favourites } = useSelector((state) => state.main);

  useEffect(() => {
    if (!favourites) {
      navigate("/");
    }
  }, [favourites]);

  return (
    <div className="main">
      <section className="content content-wrapper">
        <>
          <div className="t-margin-5">
            <button className="btn-function" onClick={() => navigate("/")}>
              Go Back
            </button>
          </div>
          <div className="t-margin-1">
            {favourites ? (
              <ExerciseBoxes data={favourites} isCMS={false} />
            ) : (
              ""
            )}
          </div>
        </>
      </section>
    </div>
  );
}

export default Favourites;
