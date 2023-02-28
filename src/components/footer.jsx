import { GiMuscleUp } from "react-icons/gi";
import { ImFacebook, ImInstagram, ImTwitter, ImYoutube } from "react-icons/im";

function Footer() {
  return (
    <footer>
      <div className="seperator half" />
      <div className="footer-wrapper content-wrapper">
        <nav className="footer-nav">
          <ul>
            <li>About</li>
            <li>Repository</li>
          </ul>
        </nav>
        <div className="socials">
          <ul>
            <li>
              <a href="a">
                <ImTwitter />
              </a>
            </li>
            <li>
              <a href="b">
                <ImFacebook />
              </a>
            </li>
            <li>
              <a href="c">
                <ImInstagram />
              </a>
            </li>
            <li>
              <a href="d">
                <ImYoutube />
              </a>
            </li>
          </ul>
        </div>
        <h6 className="copyright">
          © {new Date().getFullYear()} Trainer - Something you might need{" "}
          <GiMuscleUp />
        </h6>
      </div>
    </footer>
  );
}

export default Footer;
