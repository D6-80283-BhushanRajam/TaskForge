import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewAllProjects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(3); // Number of projects to display per page
  const navigate = useNavigate();

  useEffect(() => {
    getAllProjects();
  }, [currentPage]); // Reload projects when the current page changes

  const getAllProjects = async () => {
    const response = await axios.get("http://localhost:8080/api/project/fetch");
    console.log(response.data);
    setAllProjects(response.data.projects);
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = allProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const assignToManager = (project) => {
    navigate("/project/assign/manager", { state: project });
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const handleSearchByName = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) {
      toast.error("Project Name cannot be empty");
      return;
    }

    const response = await axios.get(`http://localhost:8080/api/project/search?projectName=${projectName}`);
    console.log(response.data);
    if (response.data.projects.length === 0) {
      toast.error("No projects found with the given name");
    } else {
      setAllProjects(response.data.projects);
    }
  };

  const handleSearchById = async (e) => {
    e.preventDefault();
    if (!projectId.trim()) {
      toast.error("Project ID cannot be empty");
      return;
    }

    const response = await axios.get(`http://localhost:8080/api/project/search/id?projectId=${projectId}`);
    console.log(response.data);
    if (response.data.projects.length === 0) {
      toast.error("No projects found with the given ID");
    } else {
      setAllProjects(response.data.projects);
    }
  };

  return (
    <div className="mt-3">
      <ToastContainer />
      <div className="card form-card ms-2 me-2 mb-5 custom-bg border-color " style={{ height: "45rem" }}>
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>All Projects</h2>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          <div className="row g-3">
            <div className="col-auto">
              <form className="row g-3" onSubmit={handleSearchByName}>
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Project Name..."
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                  />
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn bg-color custom-bg-text mb-3">
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="col-auto">
              <form className="row g-3" onSubmit={handleSearchById}>
                <div className="col-auto">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Project Id..."
                    onChange={(e) => setProjectId(e.target.value)}
                    value={projectId}
                    required
                  />
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn bg-color custom-bg-text mb-3">
                    Search
                  </button>
                </div>
                <div className="col-auto">
                  <button className="btn btn-danger custom-bg-text mb-3" onClick={reloadPage}>
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Project Name</th>
                  <th scope="col">Project Description</th>
                  <th scope="col">Project Requirement</th>
                  <th scope="col">Manager Assign Status</th>
                  <th scope="col">Manager Name</th>
                  <th scope="col">Employee Assign Status</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Project Created Date</th>
                  <th scope="col">Project Assign Date</th>
                  <th scope="col">Project Deadline</th>
                  <th scope="col">Project Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentProjects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{project.requirement}</td>
                    <td>{project.assignedToManager}</td>
                    <td>{project.managerName}</td>
                    <td>{project.assignedToEmployee}</td>
                    <td>{project.employeeName}</td>
                    <td>{project.createdDate}</td>
                    <td>{project.assignedDate}</td>
                    <td>{project.deadlineDate}</td>
                    <td>{project.projectStatus}</td>
                    <td>
                      {project.assignedToManager === "Not Assigned" && (
                        <button onClick={() => assignToManager(project)} className="btn btn-sm bg-color custom-bg-text">
                          Assign To Manager
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(allProjects.length / projectsPerPage) }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button onClick={() => paginate(i + 1)} className="page-link">
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewAllProjects;

