import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const ViewAllProjects = () => {
  const [allProjects, setAllProjects] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getAllProject = async () => {
      const allProject = await retrieveAllProject();
      if (allProject) {
        setAllProjects(allProject.projects);
      }
    };

    getAllProject();
  }, []);

  const retrieveAllProject = async () => {
    const response = await axios.get("http://localhost:8080/api/project/fetch");
    console.log(response.data);
    return response.data;
  };

  const getProjectsByName = async () => {
    const allProject = await retrieveProjectByName();
    if (allProject) {
      setAllProjects(allProject.projects);
    }
  };

  const retrieveProjectByName = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/project/search?projectName=" + projectName
    );
    console.log(response.data);
    return response.data;
  };

  const searchProjectbyName = (e) => {
    getProjectsByName();
    setProjectName("");
    e.preventDefault();
  };

  const getProjectsById = async () => {
    const allProject = await retrieveProjectById();
    if (allProject) {
      setAllProjects(allProject.projects);
    }
  };

  const retrieveProjectById = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/project/search/id?projectId=" + projectId
    );
    console.log(response.data);
    return response.data;
  };

  const searchProjectbyId = (e) => {
    getProjectsById();
    setProjectId("");
    e.preventDefault();
  };

  const assignToManager = (project) => {
    navigate("/project/assign/manager", { state: project });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>All Projects</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="row g-3">
            <div class="col-auto">
              <form class="row g-3">
                <div class="col-auto">
                  <input
                    type="text"
                    class="form-control"
                    id="inputPassword2"
                    placeholder="Enter Project Name..."
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                  />
                </div>
                <div class="col-auto">
                  <button
                    type="submit"
                    class="btn bg-color custom-bg-text mb-3"
                    onClick={searchProjectbyName}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div class="col-auto">
              <form class="row g-3">
                <div class="col-auto">
                  <input
                    type="number"
                    class="form-control"
                    id="inputPassword2"
                    placeholder="Enter Project Id..."
                    onChange={(e) => setProjectId(e.target.value)}
                    value={projectId}
                    required
                  />
                </div>
                <div class="col-auto">
                  <button
                    type="submit"
                    class="btn bg-color custom-bg-text mb-3"
                    onClick={searchProjectbyId}
                  >
                    Search
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
                {allProjects.map((project) => {
                  return (
                    <tr>
                      <td>
                        <b>{project.name}</b>
                      </td>

                      <td>
                        <b>{project.description}</b>
                      </td>
                      <td>
                        <b>{project.requirement}</b>
                      </td>
                      <td>
                        <b>{project.assignedToManager}</b>
                      </td>
                      <td>
                        <b>{project.managerName}</b>
                      </td>
                      <td>
                        <b>{project.assignedToEmployee}</b>
                      </td>
                      <td>
                        <b>{project.employeeName}</b>
                      </td>
                      <td>
                        <b>{project.createdDate}</b>
                      </td>
                      <td>
                        <b>{project.assignedDate}</b>
                      </td>
                      <td>
                        <b>{project.deadlineDate}</b>
                      </td>
                      <td>
                        <b>{project.projectStatus}</b>
                      </td>
                      <td>
                        {(() => {
                          if (project.assignedToManager === "Not Assigned") {
                           
                              return (
                                <button
                                  onClick={() => assignToManager(project)}
                                  className="btn btn-sm bg-color custom-bg-text"
                                >
                                  <b>Assign To Manager</b>
                                </button>
                              );
                            
                          }
                        })()}
                      </td>

                     
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllProjects;
