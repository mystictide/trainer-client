import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CMSBrowser from "../components/cms/cmsbrowser";
import CMSLogin from "../components/cms/cmsLogin";

function CMS() {
  const dispatch = useDispatch();
  const { filteredData } = useSelector((state) => state.cms);
  const [data, setData] = useState(filteredData ? filteredData : null);

  return (
    <div className="main cms">
      <section className="content content-wrapper access">
        {filteredData ? (
          <CMSBrowser filteredData={filteredData} />
        ) : (
          <CMSLogin />
        )}
      </section>
    </div>
  );
}

export default CMS;
