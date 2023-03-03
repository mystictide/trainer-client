import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import {
  FilteredListing,
  FilteredSelfListing,
  reset,
  resetBrowser
} from "../../features/listing/listingSlice";
import ListingBoxes from "../listing/listingboxes";
import Pager from "./pager";
import Search from "./search";

function Browser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filter, setFilterModel] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { browser, isLoading, isSuccess } = useSelector(
    (state) => state.listing
  );

  useEffect(() => {
    return () => {
      dispatch(reset());
      dispatch(resetBrowser());
    };
  }, [dispatch]);

  useEffect(() => {
    if (browser && self) {
      setKeyword(param);
      const reqData = { keyword: keyword, page: 1, token: user.Token };
      dispatch(FilteredSelfListing(reqData));
    }
    if (browser && !self) {
      setKeyword(param);
      const reqData = { keyword: param, page: 1 };
      dispatch(FilteredListing(reqData));
    }
  }, [location.key]);

  useEffect(() => {
    if (!browser && self) {
      const reqData = { keyword: keyword, page: 1, token: user.Token };
      dispatch(FilteredSelfListing(reqData));
    }
    if (!browser && !self) {
      const reqData = { keyword: keyword, page: 1 };
      dispatch(FilteredListing(reqData));
    }
    if (isSuccess) {
      dispatch(reset());
    }
  }, [browser, self, navigate, dispatch]);

  const setFilter = (e, page, filter) => {
    setFilterModel(filter);
    if (self) {
      let reqData = "";
      if (filter) {
        reqData = {
          keyword: keyword,
          page: page,
          token: user.Token,
          filterModel: filter,
        };
      } else {
        reqData = { keyword: keyword, page: page, token: user.Token };
      }
      dispatch(FilteredSelfListing(reqData));
    }
    if (!self) {
      let reqData = "";
      if (filter) {
        reqData = { keyword: keyword, page: page, filterModel: filter };
      } else {
        reqData = { keyword: keyword, page: page };
      }
      dispatch(FilteredListing(reqData));
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <PropagateLoader color="#2b3a55" size={10} speedMultiplier={0.6} />
        </div>
      ) : (
        <>
          <div className="h-items form-gap r-gap-10">
            <div className="v-items sidebar">
              {browser && browser.filterModel ? (
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
              {browser && browser.data ? (
                <>
                  <span>
                    {browser.filter.Keyword
                      ? browser.totalItems > 0
                        ? `Found ${browser.totalItems} offers for "${browser.filter.Keyword}"`
                        : `No matching results found for "${keyword}"`
                      : `Showing latest ${browser.totalItems} offer(s)`}
                  </span>
                  <Pager
                    data={browser}
                    setFilter={setFilter}
                    filterModel={filter}
                  />
                  <ListingBoxes data={browser.data} self={self} />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Browser;
