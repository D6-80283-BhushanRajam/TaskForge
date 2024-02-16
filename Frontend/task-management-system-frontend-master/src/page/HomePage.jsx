import Carousel from "./Carousel";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import employees from "../images/employees.png";
import managers from "../images/managers.png";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div className="container-fluid mb-2">
      <Carousel />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <h1 className="text-color">Welcome to Task Management System</h1>
            <p>
              A task management system is a powerful tool designed to help
              individuals and teams efficiently organize, track, and accomplish
              their tasks and projects. By centralizing tasks in one place, it
              allows users to easily create, assign, and prioritize assignments,
              ensuring that nothing falls through the cracks. With features such
              as deadlines, reminders, and progress tracking, the system
              promotes accountability and keeps everyone on the same page.
            </p>
            <p>
              Additionally, the system's data analytics provide valuable
              insights into productivity trends, enabling users to identify
              areas for improvement and optimize their workflows. Whether for
              personal use or within organizations, a task management system
              enhances productivity, reduces stress, and empowers individuals
              and teams to achieve their goals efficiently.
            </p>
            <Link to="/user/login" className="btn bg-color custom-bg-text">
              Get Started
            </Link>
          </div>
          <div className="col-md-4">
            <img
              src={employees}
              alt="Logo"
              width="400"
              height="400"
              className="home-image"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <img
              src={managers}
              alt="Logo"
              width="400"
              height="400"
              className="home-image"
            />
          </div>
          <div className="col-md-8">
            <h1 className="text-color ms-5">
              Handle Multiple Projects Efficiently
            </h1>
            <p className="ms-5">
              Handling multiple projects efficiently is a skill that requires
              effective organization, prioritization, and time management. The
              key to success lies in establishing a systematic approach to
              balance and execute tasks across various projects. Breaking down
              each project into manageable tasks, setting clear deadlines, and
              prioritizing based on urgency and importance can help prevent
              feeling overwhelmed.
            </p>
            <p className="ms-5">
              Utilizing project management tools, such as online task management
              systems, can centralize all project-related information, enabling
              seamless collaboration and progress tracking. Regularly reviewing
              and updating project status, communicating with stakeholders, and
              adapting to changing circumstances ensures that all projects stay
              on track.
            </p>
            <Link to="/user/login" className="btn bg-color custom-bg-text ms-5">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
