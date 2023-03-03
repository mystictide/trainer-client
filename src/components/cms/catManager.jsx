import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function CatManager({ data, modalControl }) {
  const dispatch = useDispatch();
  const { isSuccess, isError } = useSelector((state) => state.cms);
  const [formData, setFormData] = useState({
    id: data ? data.ID : "",
    name: "",
  });

  const { name } = formData;

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      modalControl(false);
    }
    if (isError) {
      toast.error(message);
    }
  }, [setFormData, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const reqData = { id: data ? data.ID : null, name };
    if (name != "") {
      dispatch(manage(reqData));
    } else {
      toast.error("Please fill all the necessary properties.");
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <section className="heading">
          <h1>Manage Category</h1>
          <FaTimes
            onClick={() => {
              modalControl(false);
            }}
          />
        </section>
        <section>
          <form className="v-items r-gap-10" onSubmit={onSubmit}>
            <label>Category Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="enter a category name"
              className="main-border"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <div className="functions">
              <button type="submit" className="btn-function">
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default CatManager;
