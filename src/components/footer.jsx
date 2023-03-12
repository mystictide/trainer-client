import { GiMuscleUp } from "react-icons/gi";
import { ImGithub } from "react-icons/im";

function Footer() {
  return (
    <footer>
      <div className="seperator half" />
      <div className="footer-wrapper content-wrapper">
        <div className="socials">
          <ul>
            {/* <li>
              <a href="https://twitter.com/not_orpheus" target={"_blank"}>
                <ImTwitter />
              </a>
            </li> */}
            <li>
              <a href="https://github.com/mystictide" target={"_blank"}>
                <ImGithub />
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
