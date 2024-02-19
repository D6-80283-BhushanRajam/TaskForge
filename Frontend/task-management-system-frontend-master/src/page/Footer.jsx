import React from "react";
import youtube from "../images/youtube-logo.png";
import facebook from "../images/facebook-logo.png";
import instagram from "../images/instagram.png";
import twitter from "../images/twitter-logo.png";
import thread from "../images/thread-logo.png";
import gmail from "../images/gmail-logo.png";

const Footer = () => {
  return (
    <div>
      <div className="container my-5">
        <footer className="text-center text-lg-start text-color">
          <div className="container-fluid p-4 pb-0">
            <section className="">
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase text-color">
                    TaskForge
                  </h5>
                  <p>
                    "TaskForge is a robust Task Management solution crafted
                    to assist individuals and teams in effectively coordinating,
                    monitoring, and completing their projects and tasks."
                  </p>
                </div>
                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase text-color-4">About us</h5>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-color">
                        Link 1
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase text-color-4">Contact us</h5>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-color">
                        Link 1
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        Link 2
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase text-color-4">Careers</h5>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-color">
                        Link 1
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        Link 2
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        Link 3
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase text-color-4">Links</h5>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-color">
                        Link 1
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        Link 2
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <hr className="mb-4" />
          </div>
          <div className="text-center">
            <a href="https://www.youtube.com/" className="logos">
              <img
                src={youtube} // Replace with the actual path to your YouTube logo
                alt="YouTube"
                height="30"
              />
            </a>
            <a href="https://mail.google.com/mail" className="logos">
              <img
                src={gmail} // Replace with the actual path to your Gmail logo
                alt="Gmail"
                height="30"
              />
            </a>
            <a href="https://twitter.com/" className="logos">
              <img
                src={twitter} // Replace with the actual path to your Twitter logo
                alt="Twitter"
                height="30"
              />
            </a>
            <a href="https://www.facebook.com/" className="logos">
              <img
                src={facebook} // Replace with the actual path to your Facebook logo
                alt="Facebook"
                height="30"
              />
            </a>
            <a href="https://www.instagram.com/" className="logos">
              <img
                src={instagram} // Replace with the actual path to your Instagram logo
                alt="Instagram"
                height="30"
              />
            </a>
            <a href="https://www.threads.net/@facebook?hl=en" className="logos">
              <img
                src={thread} // Replace with the actual path to your Thread logo
                alt="Thread"
                height="30"
              />
              <br />
            </a>
            © 2024 Copyright:{" "}
            <a className="text-color-3" href="#">
              SunbeamCdac-Sept23
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
