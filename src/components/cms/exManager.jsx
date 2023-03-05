import { useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { manageExercise } from "../../features/cms/cmsSlice";

function ExManager({ data, modalControl }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: data ? data.ID : "",
    name: data ? data.Name : "",
    type: data ? data.Type : "",
    previewurl: data ? data.PreviewURL : "",
    videourl: data ? data.VideoURL : "",
  });

  const { cats } = useSelector((state) => state.cms);
  const [cat, setCats] = useState(data ? data.Categories : "");
  const catOptions = useMemo(() => cats, []);
  const { name, type, previewurl, videourl } = formData;

  const onCatChange = (value) => {
    setCats(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const reqData = {
      id: data ? data.ID : null,
      name,
      type,
      previewurl,
      videourl,
      categories: cat,
    };
    if (name != "" && type != "" && previewurl != "" && videourl != "") {
      dispatch(manageExercise(reqData));
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
          <h1>Manage Exercise</h1>
          <FaTimes
            onClick={() => {
              modalControl(false);
            }}
          />
        </section>
        <section>
          <form className="v-items r-gap-10" onSubmit={onSubmit}>
            <label>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="enter exercise name"
              className="main-border"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <label>Categories</label>
            <Select
              isMulti
              className="select"
              id="cats"
              name="cats"
              placeholder={"select categories"}
              options={catOptions}
              getOptionLabel={(options) => options["Name"]}
              getOptionValue={(options) => options["ID"]}
              value={cat ? cat : data ? data.Categories : ""}
              onChange={onCatChange}
            />
            <label>Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={type}
              placeholder="enter exercise type"
              className="main-border"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <label>Preview URL</label>
            <input
              type="text"
              id="previewurl"
              name="previewurl"
              value={previewurl}
              placeholder="enter preview url"
              className="main-border"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <label>Video URL</label>
            <input
              type="text"
              id="videourl"
              name="videourl"
              value={videourl}
              placeholder="enter video url"
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

export default ExManager;
