import { FaTimes } from "react-icons/fa";
import YouTube from "react-youtube";

function VideoModal({ modalControl, data }) {
  return (
    <div className="modal-container">
      <div className="modal-overlay"></div>
      <div className="modal-content video">
        <section className="heading">
          <h1>{data.Name}</h1>
          <FaTimes
            onClick={() => {
              modalControl(false);
            }}
          />
        </section>
        <section>
          <div className="v-items r-gap-10">
            <YouTube
              videoId={data.VideoURL}
              id={data.Name}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default VideoModal;
