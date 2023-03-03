import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterExercises, getCategories } from "../../features/cms/cmsSlice";

function CMSLogin() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    secret: "",
  });

  const { secret } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const reqData = { secret: secret, categoryID: 0 };
    dispatch(filterExercises(reqData));
    dispatch(getCategories());
  };

  return (
    <div className="cms login">
      <section className="heading">
        <h1>SECRET</h1>
      </section>
      <section>
        <form className="v-items r-gap-10" onSubmit={onSubmit}>
          <input
            type="text"
            id="secret"
            name="secret"
            value={secret}
            placeholder="enter the secret"
            className="main-border"
            onChange={onChange}
          />
          <div className="functions">
            <button type="submit" className="btn-function">
              Request Access
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CMSLogin;
