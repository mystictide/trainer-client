import { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { manageFavorites } from "../../assets/js/helpers";
import { updateFav } from "../../features/main/mainSlice";
import ExManager from "../cms/exManager";
import VideoModal from "../modals/videoModal";

function ExerciseBoxes({ data, isCMS }) {
  const dispatch = useDispatch();
  const [selectedItem, setItem] = useState(null);
  const [exModal, setExModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const { favourites } = useSelector((state) => state.main);

  const onEdit = (item) => {
    setItem(item);
    setExModal(true);
  };

  const handleClick = (item) => {
    setItem(item);
    setVideoModal(true);
  };

  const addFav = (e, item) => {
    e.classList.toggle("active");
    manageFavorites(item, false);
    dispatch(updateFav());
  };

  const removeFav = (e, item) => {
    e.classList.toggle("active");
    manageFavorites(item, true);
    dispatch(updateFav());
  };

  const getConfirm = (item) => {
    setItem(item);
    setExModal(true);
  };

  //   const deleteListing = () => {
  //     const reqData = {
  //       id: selectedItem.ID,
  //     };
  //     dispatch(DeleteListing(reqData));
  //     setItem(null);
  //   };

  return (
    <>
      <ul className="h-list c-gap-10 r-gap-10 boxes">
        {data.map((item, index) => (
          <li key={index} className={`main-border ${isCMS ? "" : "main-box"}`}>
            <div className="info">
              <h4>{item.Name}</h4>
            </div>
            {isCMS ? (
              <div className="preview">
                <img src={item.PreviewURL} />
              </div>
            ) : (
              <div className="preview" onClick={() => handleClick(item)}>
                <img src={item.PreviewURL} />
              </div>
            )}

            {isCMS ? (
              <div className="functions c-gap-5">
                <button
                  className="btn-function"
                  onClick={() => {
                    onEdit(item);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn-function"
                  onClick={() => {
                    getConfirm(item);
                  }}
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className="functions c-gap-5">
                {favourites ? (
                  <>
                    {favourites.some((o) => o.ID === item.ID) ? (
                      <button
                        className="btn-icon active"
                        onClick={(e) => {
                          removeFav(e.target, item);
                        }}
                      >
                        <BsFillStarFill />
                      </button>
                    ) : (
                      <button
                        className="btn-icon"
                        onClick={(e) => {
                          addFav(e.target, item);
                        }}
                      >
                        <BsFillStarFill />
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    className="btn-icon"
                    onClick={(e) => {
                      addFav(e.target, item);
                    }}
                  >
                    <BsFillStarFill />
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {exModal ? (
        <ExManager modalControl={setExModal} data={selectedItem} />
      ) : (
        ""
      )}
      {videoModal ? (
        <VideoModal modalControl={setVideoModal} data={selectedItem} />
      ) : (
        ""
      )}
    </>
  );
}

export default ExerciseBoxes;
