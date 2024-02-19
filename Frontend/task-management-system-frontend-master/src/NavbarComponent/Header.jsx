import { Link } from "react-router-dom";
import logo from "../images/task_logo.png";
import RoleNav from "./RoleNav";

const Header = () => {
  const adminuser = JSON.parse(sessionStorage.getItem("active-admin"));
  const manageruser =  JSON.parse(sessionStorage.getItem("active-manager"));
  const empuser =  JSON.parse(sessionStorage.getItem("active-employee"));
  // console.log(adminuser);
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-color3 text-color2" >
        <div className="container-fluid text-color">
          <img
            src={logo}
            width="65"
            height="auto"
            className="d-inline-block align-top"
            alt=""
          />
          <Link to="/" className="navbar-brand ms-1">
            <i> 
              <b className="text-color">TaskForge  
</b>
<h6 className="text-color">"Forging the Future of Task Management."
</h6>
            </i>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link active"
                  aria-current="page"
                  style={{ alignContent:"end" }}
                >
                  <b className="text-color">About Us</b>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link active"
                  aria-current="page"
                >
                  <b className="text-color">Contact Us</b>
                </Link>
              </li>
            </ul>

            <RoleNav />
          </div>
        </div>
      </nav>
      <div className="curruser">
           {adminuser && (
          <p>
            Welcome, {adminuser.firstName} {adminuser.lastName} 
          </p>
        )|| manageruser && (
          <p>
            Welcome, {manageruser.firstName} {manageruser.lastName} 
          </p>
        )|| empuser && (
          <p>
            Welcome, {empuser.firstName} {empuser.lastName} 
          </p>
        )
        }</div>
    </div>
  );
};

export default Header;
