import { useState } from "react";
import Anatomy from "../../components/main/anatomy";

function Home() {
  const [bodyPart, setBodyPart] = useState(null);

  const setPart = (e) => {
    setBodyPart(e);
  };

  return (
    <section className="content content-wrapper">
      <div className="anatomy">
        <h2>{bodyPart ? bodyPart.toUpperCase() : ""}</h2>
        <Anatomy func={setPart} />
      </div>
    </section>
  );
}

export default Home;
