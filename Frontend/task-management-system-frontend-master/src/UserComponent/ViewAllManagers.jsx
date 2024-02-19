import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ViewAllManagers = () => {
  const [allManagers, setAllManagers] = useState([]);
  const [deletedManagers, setDeletedManagers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [managersPerPage] = useState(5); // Change the number of managers per page as needed
  const [fetchingDeletedManagers, setFetchingDeletedManagers] = useState(false);

  useEffect(() => {
    getAllManagers();
  }, []);

  const getAllManagers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/manager/all");
      console.log(response.data);
      setAllManagers(response.data.users);
    } catch (error) {
      console.error("Error fetching managers:", error);
      toast.error("Failed to fetch managers", {
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

  const getDeletedManagers = async () => {
    setFetchingDeletedManagers(true);
    try {
      const response = await axios.get("http://localhost:8080/api/user/manager/deletedAll");
      console.log(response.data);
      setDeletedManagers(response.data.users);
    } catch (error) {
      console.error("Error fetching deleted managers:", error);
      toast.error("Failed to fetch deleted managers", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setFetchingDeletedManagers(false);
    }
  };

  const deleteManager = (userId) => {
    fetch(`http://localhost:8080/api/user/delete?userId=${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          console.log("Successfully deleted manager:", res.responseMessage);
          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          getAllManagers(); // Refresh managers list after deletion
        } else {
          console.error("Failed to delete manager:", res.responseMessage);
          toast.error("Failed to delete manager", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting manager:", error);
        toast.error("Failed to delete manager", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  // Logic for displaying current managers
  const indexOfLastManager = currentPage * managersPerPage;
  const indexOfFirstManager = indexOfLastManager - managersPerPage;
  const currentManagers = allManagers.slice(indexOfFirstManager, indexOfLastManager);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset function to reset all managers and reload the page
  const resetAllManagers = () => {
    setAllManagers([]);
    setCurrentPage(1);
    window.location.reload();
  };

  return (
    <div className="mt-3">
      <div className="card form-card ms-2 me-2 mb-5 custom-bg border-color">
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>All Managers</h2>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
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
                {currentManagers.map((manager) => (
                  <tr key={manager.id}>
                    <td><b>{manager.id}</b></td>
                    <td><b>{manager.firstName}</b></td>
                    <td><b>{manager.lastName}</b></td>
                    <td><b>{manager.emailId}</b></td>
                    <td><b>{manager.contact}</b></td>
                    <td><b>{manager.street} {manager.city} {manager.pincode}</b></td>
                    <td>
                      <button onClick={() => deleteManager(manager.id)} className="btn btn-sm bg-color custom-bg-text">Remove</button>
                      <ToastContainer />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(allManagers.length / managersPerPage) }, (_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
      <button onClick={getDeletedManagers} className="btn btn-sm bg-color custom-bg-text2" disabled={fetchingDeletedManagers}>
        {fetchingDeletedManagers ? "Loading Deleted Managers..." : "Load Deleted Managers"}
      </button>
      <button onClick={resetAllManagers} className="btn btn-sm bg-color custom-bg-text2">
        Reset Managers
      </button>
      {deletedManagers.length > 0 && (
        <div className="mt-3">
          <div className="table-responsive">
            <h3 className="text-center">Deleted Managers</h3>
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
                {deletedManagers.map((manager) => (
                  <tr key={manager.id}>
                    <td><b>{manager.id}</b></td>
                    <td><b>{manager.firstName}</b></td>
                    <td><b>{manager.lastName}</b></td>
                    <td><b>{manager.emailId}</b></td>
                    <td><b>{manager.contact}</b></td>
                    <td><b>{manager.street} {manager.city} {manager.pincode}</b></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default ViewAllManagers;
