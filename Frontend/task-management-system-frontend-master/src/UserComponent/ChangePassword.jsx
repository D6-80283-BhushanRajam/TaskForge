import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [user, setUser] = useState({});
  const [sessionUserName, setSessionUserName] = useState("");
  const [sessionJWTName, setSessionJWTName] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const manager = JSON.parse(sessionStorage.getItem("active-manager"));
  const employee = JSON.parse(sessionStorage.getItem("active-employee"));

  const [loginRequest, setLoginRequest] = useState({
    userId: "",
    oldPassword: "",
    password: "",
  });

  useEffect(() => {
    if (admin !== null) {
      loginRequest.userId = admin.id;
      setSessionJWTName("admin-jwtToken");
      setSessionUserName("active-admin");
      setUser(admin);
    } else if (manager !== null) {
      loginRequest.userId = manager.id;
      setSessionJWTName("manager-jwtToken");
      setSessionUserName("active-manager");
      setUser(manager);
    } else if (employee !== null) {
      loginRequest.userId = employee.id;
      setSessionJWTName("employee-jwtToken");
      setSessionUserName("active-employee");
      setUser(employee);
    }
  }, []);

  const navigate = useNavigate();

  const handleUserInput = (e) => {
    setLoginRequest({
      ...loginRequest,
      [e.target.name]: e.target.value,
    });
  };

  const userChangePassword = (e) => {
    e.preventDefault();

     // Check if old password and new password are the same
     if (oldPassword === loginRequest.password) {
      toast.error("New password cannot be the same as old password", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    
    fetch("http://localhost:8080/api/user/changePassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
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
            sessionStorage.removeItem(sessionJWTName);
            sessionStorage.removeItem(sessionUserName);
            navigate("/user/login");
            window.location.reload(true);
          }, 3000); // Redirect after 3 seconds
        } else if(res.responseMessage==="Old password doesn't match") {
          console.log("Didn't get success response");
          toast.error("Old password doesn't match. Please try again!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 3000); // Redirect after 3 seconds
        }
        else {
          console.log("Didn't get success response");
          toast.error("It seems the server is down", {
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
            <h5 className="card-title">Change Password</h5>
          </div>
          <div className="card-body text-color">
            <div className="mb-3 mt-1">
              <label htmlFor="quantity" className="form-label">
                <b>User Email Id</b>
              </label>
              <input
                type="text"
                className="form-control"
                value={user.emailId}
                required
                readOnly
              />
            </div>

            <div className="mb-3 mt-1">
              <label htmlFor="quantity" className="form-label">
                <b>User Contact No</b>
              </label>
              <input
                type="text"
                className="form-control"
                value={user.contact}
                required
                readOnly
              />
            </div>

            <form>
              <div className="mb-3 text-color">
                <label htmlFor="oldPassword" className="form-label">
                  <b>Old Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="oldPassword"
                  name="oldPassword"
                  onChange={handleUserInput}
                  value={loginRequest.oldPassword}
                />
              </div>

              <div className="mb-3 text-color">
                <label htmlFor="newPassword" className="form-label">
                  <b>New Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={loginRequest.password}
                />
              </div>

              <div className="col">
                <button
                  type="submit"
                  className="btn bg-color btn-sm custom-bg-text mt-4"
                  onClick={userChangePassword}
                >
                  Change Password
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
