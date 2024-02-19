import Carousel from "./Carousel";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Link } from "react-router-dom";
import employees from "../images/employees.png";
import managers from "../images/managers.png";
import Footer from "./Footer";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    // Check if user is logged in
    const admin = JSON.parse(sessionStorage.getItem("active-admin"));
    const manager =JSON.parse(sessionStorage.getItem("active-manager"));
    const employee =JSON.parse(sessionStorage.getItem("active-employee"));
    if (admin||manager||employee) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      // If user is logged in, redirect to dashboard or show a message
      navigate("/dashboard"); // Update the path accordingly
    } else {
      // If user is not logged in, redirect to the login page
      navigate("/user/login");
    }
  };

  return (
    <div className="container-fluid mb-2 ">
      <Carousel />

      <div className="container mt-5 bg"style={{ backgroundColor: '#f0f0f0' }}>
        <div className="row">
          <div className="col-md-4">
            <img
              src={employees}
              alt="Logo"
              width="400"
              height="400"
              className="home-image"
            />
          </div>
          <div className="col-md-8">
            <h1 className="text-color3">Welcome to Our Employee Task Management System</h1>
            <p>
            In a dynamic work environment, efficient employee task management is crucial for achieving organizational goals. A well-structured Employee Task Management System helps streamline workflow, assign tasks, monitor progress, and ensure that projects are completed on time. This project aims to develop a web-based Employee Task Management System to enhance productivity and collaboration within the organization.
            </p>
            <p>
              Additionally, the system's data analytics provide valuable
              insights into productivity trends, enabling users to identify
              areas for improvement and optimize their workflows. Whether for
              personal use or within organizations, a task management system
              enhances productivity, reduces stress, and empowers individuals
              and teams to achieve their goals efficiently.
            </p>
            <button
              className="btn bg-color custom-bg-text"
              onClick={handleGetStarted}
              disabled={isLoggedIn} // Disable the button if user is logged in
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <h1 className="text-color3 ms-5">
              Handle Multiple Projects Efficiently
            </h1>
            <p className="ms-5">
           
               <ul className="ulist">
               The primary objectives of the Employee Task Management System are:
                <li className="text-color4"> Efficiently assign tasks to employees.</li>
                <li className="text-color4"> Monitor task progress and deadlines.</li>
                <li className="text-color4"> Facilitate better communication and collaboration.</li>
                <li className="text-color4"> Improve overall task management and productivity.</li>
               </ul>
                
                
                
                
            </p>
            <p className="ms-5">
              Utilizing project management tools, such as online task management
              systems, can centralize all project-related information, enabling
              seamless collaboration and progress tracking. Regularly reviewing
              and updating project status, communicating with stakeholders, and
              adapting to changing circumstances ensures that all projects stay
              on track.
            </p>
            <button
              className="btn bg-color custom-bg-text ms-5"
              onClick={handleGetStarted}
              disabled={isLoggedIn} // Disable the button if user is logged in
            >
              Get Started
            </button>
          </div>
          <div className="col-md-4">
            <img
              src={managers}
              alt="Logo"
              width="400"
              height="400"
              className="home-image1"
            />
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
