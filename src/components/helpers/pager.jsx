function Pager({ data, setFilter, filterModel }) {
  return (
    <>
      {data.filter.pager.TotalPages > 1 ? (
        <div className="t-margin-1 h-items c-gap-10">
          <div className="multi pager-container">
            <ul className="pager-data">
              {data.filter.pager.CurrentPage > 1 ? (
                <li className="pager-item">
                  <button
                    className="pager-button"
                    onClick={(e) => setFilter(e, 1, filterModel)}
                  >
                    {"<<"}
                  </button>{" "}
                </li>
              ) : (
                ""
              )}
              {data.filter.pager.CurrentPage > 1 ? (
                <li className="pager-item">
                  <button
                    className="pager-button"
                    onClick={(e) =>
                      setFilter(
                        e,
                        data.filter.pager.CurrentPage - 1,
                        filterModel
                      )
                    }
                  >
                    Previous
                  </button>
                </li>
              ) : (
                ""
              )}
              {data.filter.pager.CurrentPage ===
              data.filter.pager.TotalPages ? (
                ""
              ) : (
                <li className="pager-item">
                  <button
                    className="pager-button"
                    onClick={(e) =>
                      setFilter(
                        e,
                        data.filter.pager.CurrentPage + 1,
                        filterModel
                      )
                    }
                  >
                    Next
                  </button>
                </li>
              )}
              {data.filter.pager.CurrentPage ===
              data.filter.pager.TotalPages ? (
                ""
              ) : (
                <li className="pager-item">
                  <button
                    className="pager-button"
                    onClick={(e) =>
                      setFilter(e, data.filter.pager.TotalPages, filterModel)
                    }
                  >
                    {">>"}
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Pager;
