import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterExercises } from "../../features/cms/cmsSlice";
import Pager from "../helpers/pager";
import Search from "../helpers/search";

function CMSBrowser({ filteredData }) {
  const dispatch = useDispatch();

  const [filter, setFilterModel] = useState(null);
  const { isLoading } = useSelector((state) => state.cms);
  const [keyword, setKeyword] = useState("");

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
        <div className="h-items single">
          {filteredData && filteredData.data ? (
            <>
              <span>
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
              {/* <ListingBoxes data={filteredData.data} /> */}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default CMSBrowser;
