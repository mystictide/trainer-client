import { useEffect, useState } from "react";
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
  const [category, setCategory] = useState(0);
  const [filter, setFilterModel] = useState(null);
  const [catModal, setCatModal] = useState(false);
  const [exModal, setExModal] = useState(false);
  const { exercise } = useSelector((state) => state.cms);

  useEffect(() => {
    if (exercise) {
      const reqData = {
        handle: true,
        filter: { Keyword: keyword, page: 1, CategoryID: 0 },
      };
      dispatch(filterExercises(reqData));
    }
  }, [exercise]);

  const setFilter = (e, page, filter) => {
    setFilterModel(filter);
    const reqData = {
      handle: true,
      filter: {
        Keyword: keyword,
        page: page,
        CategoryID: filter ? filter.category.ID : 0,
      },
    };
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
              setCategory={setCategory}
              keyword={keyword}
              category={category}
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
              <ExerciseBoxes data={filteredData.data} isCMS={true} />
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
