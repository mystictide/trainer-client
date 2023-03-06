import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropagateLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import Browser from "../../components/helpers/browser";
import Anatomy from "../../components/main/anatomy";
import { exercisesByCategory, reset } from "../../features/main/mainSlice";

function Home() {
  const dispatch = useDispatch();
  const [bodyPart, setBodyPart] = useState(null);
  const { exercises, isLoading, isError } = useSelector((state) => state.main);

  const setPart = (e) => {
    setBodyPart(e);
  };

  const resetEx = () => {
    dispatch(reset());
    setBodyPart(null);
  };

  useEffect(() => {
    if (bodyPart) {
      const reqData = { category: bodyPart };
      dispatch(exercisesByCategory(reqData));
    }
    if (isError) {
      toast("Couldn't get any exercises.");
    }
  }, [bodyPart, isError, dispatch]);

  return (
    <div className="main">
      <section className="content content-wrapper">
        {exercises ? (
          <>
            <div className="t-margin-5">
              <button className="btn-function" onClick={() => resetEx()}>
                Go Back
              </button>
            </div>
            <div className="t-margin-1">
              <Browser data={exercises} />
            </div>
          </>
        ) : (
          <div className="anatomy">
            <h2>
              {isLoading ? (
                <div className="loading">
                  <PropagateLoader
                    color="#6f5773"
                    size={30}
                    speedMultiplier={0.5}
                  />
                </div>
              ) : (
                ""
              )}
            </h2>
            <Anatomy func={setPart} />
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
