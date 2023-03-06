import { FaTimes } from "react-icons/fa";

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
            <iframe
              width="560"
              height="400"
              src={data.VideoURL}
              type="video/mp4"
              autoPlay
              controls
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}

export default VideoModal;
