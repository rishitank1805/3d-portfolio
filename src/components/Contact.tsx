import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="mailto:mail.rishitank@gmail.com"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                mail.rishitank@gmail.com
              </a>
            </p>
            <p>Hamburg, Germany</p>
            <p>
              <a href="tel:+4917660477766" data-cursor="disable">
                +49 1766 0477766
              </a>
            </p>
            <h4>Education</h4>
            <p>
              M.S. Data Science, Technical University of Hamburg — 2023–2025
            </p>
            <p>
              B.Tech Computer Science, University of Mumbai — 2019–2023
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/rishitank1805"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/rishi-tank18/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Rishi Tank</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
