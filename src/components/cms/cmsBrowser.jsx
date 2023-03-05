import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterExercises } from "../../features/cms/cmsSlice";
import Pager from "../helpers/pager";
import Search from "../helpers/search";
import ExerciseBoxes from "../main/exerciseBoxes";
import CatManager from "./catManager";
import ExManager from "./exManager";

function CMSBrowser({ filteredData }) {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [filter, setFilterModel] = useState(null);
  const [catModal, setCatModal] = useState(false);
  const [exModal, setExModal] = useState(false);
  const { exercise } = useSelector((state) => state.cms);

  const setFilter = (e, page, filter) => {
    setFilterModel(filter);
    let reqData = "";
    if (filter) {
      reqData = { keyword: keyword, page: page, filterModel: filter };
    } else {
      reqData = { keyword: keyword, page: page };
    }
    dispatch(filterExercises(reqData));
  };

  return (
    <>
      <div className="h-items form-gap c-gap-10">
        <div className="v-items sidebar">
          {filteredData && filteredData.filterModel ? (
            <Search
              setFilter={setFilter}
              setKeyword={setKeyword}
              keyword={keyword}
            />
          ) : (
            ""
          )}
        </div>
        <div className="h-items single c-gap-10 r-gap-10">
          <ul className="h-list c-gap-10 f-end">
            <li>
              <button
                type="button"
                className="btn-function"
                onClick={() => {
                  setCatModal(true);
                }}
              >
                Add Category
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn-function"
                onClick={() => {
                  setExModal(true);
                }}
              >
                Add Exercise
              </button>
            </li>
          </ul>
          {filteredData && filteredData.data ? (
            <>
              <span className="f-end">
                {filteredData.filter.Keyword
                  ? filteredData.totalItems > 0
                    ? `Found ${filteredData.totalItems} items for "${filteredData.filter.Keyword}"`
                    : `No matching results found for "${keyword}"`
                  : `Showing latest ${filteredData.totalItems} items`}
              </span>
              <Pager
                data={filteredData}
                setFilter={setFilter}
                filterModel={filter}
              />
              <ExerciseBoxes
                data={filteredData.data}
                ex={exercise}
                isCMS={true}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      {catModal ? <CatManager modalControl={setCatModal} /> : ""}
      {exModal ? <ExManager modalControl={setExModal} /> : ""}
    </>
  );
}

export default CMSBrowser;
