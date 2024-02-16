import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [addProjectRequest, setAddProjectRequest] = useState({
    name: "",
    description: "",
    requirement: "",
    deadlineDate: "",
  });

  const navigate = useNavigate();

  const handleUserInput = (e) => {
    setAddProjectRequest({
      ...addProjectRequest,
      [e.target.name]: e.target.value,
    });
  };

  const saveProject = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/project/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addProjectRequest),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);

        if (res.success) {
          console.log("Got the success response");

          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/user/admin/project/all");
          }, 1000); // Redirect after 3 seconds
        } else {
          console.log("Didn't got success response");
          toast.error("It seems server is down", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 1000); // Redirect after 3 seconds
        }
      });
    });
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color text-center custom-bg-text">
            <h5 className="card-title">Add Project</h5>
          </div>
          <div className="card-body text-color">
            <form onSubmit={saveProject}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Project Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="enter name.."
                  name="name"
                  onChange={handleUserInput}
                  value={addProjectRequest.name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Project Description</b>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  name="description"
                  onChange={handleUserInput}
                  value={addProjectRequest.description}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Project Requirement</b>
                </label>
                <textarea
                  className="form-control"
                  id="requirement"
                  rows="3"
                  name="requirement"
                  onChange={handleUserInput}
                  value={addProjectRequest.requirement}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Project Deadline</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="deadlineDate"
                  placeholder="select deadline date.."
                  name="deadlineDate"
                  onChange={handleUserInput}
                  value={addProjectRequest.deadlineDate}
                />
              </div>

              <input
                type="submit"
                className="btn bg-color custom-bg-text"
                value="Add Project"
              />

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
