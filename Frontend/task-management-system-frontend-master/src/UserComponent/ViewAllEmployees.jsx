import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ViewAllEmployees = () => {
  const manageruser =  JSON.parse(sessionStorage.getItem("active-manager"));
  const [allEmployees, setAllEmployees] = useState([]);
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5); // Change the number of employees per page as needed

  useEffect(() => {
    getAllEmployee(); // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const getAllEmployee = async () => {
    try {
      const allEmployee = await retrieveAllEmployees();
      if (allEmployee) {
        setAllEmployees(allEmployee.users);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const retrieveAllEmployees = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/employee/all"
    );
    console.log(response.data);
    return response.data;
  };

  const retrieveDeletedEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/employee/deletedAll"
      );
      console.log(response.data);
      setDeletedEmployees(response.data.users);
    } catch (error) {
      console.error(error);
      toast.error("Failed to retrieve deleted employees", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const deleteEmployee = (userId) => {
    fetch("http://localhost:8080/api/user/delete?userId=" + userId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        result.json().then((res) => {
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
            retrieveDeletedEmployees(); // Fetch updated deleted employees after successful deletion
          } else {
            console.log("Failed to delete the employee");
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    setTimeout(() => {
      window.location.reload(true);
    }, 2000); // Reload after 3 seconds 3000
  };

  // Logic for displaying current employees
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = allEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to check if the logged-in user is a manager
  const isUserManager = () => {
      if(manageruser!==null)
    return true; 
  };

  // Function to check if an employee is a manager
  const isEmployeeManager = (employee) => {
    return employee.role === "manager"; // Replace "manager" with the actual role name for managers
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "30rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>All Employee</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Employee ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee) => {
                  return (
                    <tr key={employee.id}>
                      <td>
                          <b>{employee.id}</b>
                      </td>
                      <td>
                        <b>{employee.firstName}</b>
                      </td>
                      <td>
                        <b>{employee.lastName}</b>
                      </td>
                      <td>
                        <b>{employee.emailId}</b>
                      </td>
                      <td>
                        <b>{employee.contact}</b>
                      </td>
                      <td>
                        <b>
                          {employee.street +
                            " " +
                            employee.city +
                            " " +
                            employee.pincode}
                        </b>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteEmployee(employee.id)}
                          className="btn btn-sm bg-color custom-bg-text"
                          disabled={isUserManager() && isEmployeeManager(employee)}
                        >
                          Remove
                        </button>
                        <ToastContainer />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <button
        onClick={retrieveDeletedEmployees}
        className="btn btn-sm bg-color custom-bg-text2"
      >
        Load Deleted Employees
      </button>
      <button
        onClick={() => window.location.reload(true)}
        className="btn btn-sm bg-color custom-bg-text2"
      >
        Reset
      </button>
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from(
            { length: Math.ceil(allEmployees.length / employeesPerPage) },
            (_, i) => (
              <li
                key={i}
                className={`page-item ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                <button
                  onClick={() => paginate(i + 1)}
                  className="page-link"
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
      {
        deletedEmployees.length > 0 && 
        <div className="mt-3">
        <div
          className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
          style={{
            height: "20rem",
          }}
        >
          <div className="card-header custom-bg-text text-center bg-color">
            <h2>Deleted Employees</h2>
          </div>
          <div
            className="card-body"
            style={{
              overflowY: "auto",
            }}
          >
            <div className="table-responsive">
              <table className="table table-hover text-color text-center">
                <thead className="table-bordered border-color bg-color custom-bg-text">
                  <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email Id</th>
                    <th scope="col">Phone No</th>
                    <th scope="col">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedEmployees.map((employee) => {
                    return (
                      <tr key={employee.id}>
                       <td>
                          <b>{employee.id}</b>
                        </td>
                        <td>
                          <b>{employee.firstName}</b>
                        </td>
                        <td>
                          <b>{employee.lastName}</b>
                        </td>
                        <td>
                          <b>{employee.emailId}</b>
                        </td>
                        <td>
                          <b>{employee.contact}</b>
                        </td>
                        <td>
                          <b>
                            {employee.street +
                              " " +
                              employee.city +
                              " " +
                              employee.pincode}
                          </b>
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
      }
      
    </div>
  );
};

export default ViewAllEmployees;
