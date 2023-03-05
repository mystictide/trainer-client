import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Browser from "../../components/helpers/browser";
import Anatomy from "../../components/main/anatomy";

function Home() {
  const dispatch = useDispatch();
  const [bodyPart, setBodyPart] = useState(null);
  const { exercises } = useSelector((state) => state.cms);

  const setPart = (e) => {
    setBodyPart(e);
  };

  useEffect(() => {
    if (bodyPart) {
      const reqData = { category: bodyPart };
      dispatch(exercisesByCategory(reqData));
    }
  }, [bodyPart, dispatch]);

  return (
    <div className="main">
      <section className="content content-wrapper">
        {exercises ? (
          <Browser data={exercises} />
        ) : (
          <div className="anatomy">
            <h2>{bodyPart ? bodyPart.toUpperCase() : ""}</h2>
            <Anatomy func={setPart} />
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
