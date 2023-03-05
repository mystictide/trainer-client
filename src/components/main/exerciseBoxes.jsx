import { useState } from "react";
import { useDispatch } from "react-redux";
import ExManager from "../cms/exManager";

function ExerciseBoxes({ data, ex, isCMS }) {
  const dispatch = useDispatch();
  const [selectedItem, setItem] = useState(null);
  const [exModal, setExModal] = useState(false);

  const onEdit = (item) => {
    setItem(item);
    setExModal(true);
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
        {ex ? (
          <li key={ex.ID} className="main-border">
            <div className="info">
              <h4>{ex.Name}</h4>
            </div>
            <div className="preview">
              <img src={ex.PreviewURL} />
            </div>
            {isCMS ? (
              <div className="functions c-gap-10">
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
              ""
            )}
          </li>
        ) : (
          ""
        )}

        {data.map((item, index) => (
          <li key={index} className="main-border">
            <div className="info">
              <h4>{item.Name}</h4>
            </div>
            <div className="preview">
              <img src={item.PreviewURL} />
            </div>
            {isCMS ? (
              <div className="functions c-gap-10">
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
              ""
            )}
          </li>
        ))}
      </ul>
      {exModal ? (
        <ExManager modalControl={setExModal} data={selectedItem} />
      ) : (
        ""
      )}
    </>
  );
}

export default ExerciseBoxes;
