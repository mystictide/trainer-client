import { ReactComponent as AnatomySVG } from "../../assets/img/misc/anatomy.svg";

function Anatomy({func}) {
  const handleClick = (e) => {
    if (e.target.parentElement.dataset.part != null) {
      func(e.target.parentElement.dataset.part);
    }
  };

  return (
    <div className="anatomy-body">
      <AnatomySVG onClick={(e) => handleClick(e)} />
    </div>
  );
}

export default Anatomy;
