import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { manageCategory } from "../../features/cms/cmsSlice";

function CatManager({ data, modalControl }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: data ? data.ID : "",
    name: "",
  });

  const { name } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    const reqData = { id: data ? data.ID : null, name };
    if (name != "") {
      dispatch(manageCategory(reqData));
      modalControl(false);
    } else {
      modalControl(false);
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
