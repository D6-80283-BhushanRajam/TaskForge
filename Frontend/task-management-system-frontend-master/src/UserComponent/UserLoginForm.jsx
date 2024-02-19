import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onMouseOverHandler = (e) => {
    e.target.innerText = showPassword ? "Hide password" : "Show password";
  };

  const onMouseOutHandler = (e) => {
    e.target.innerText = showPassword ? "👁️" : "🔒";
  };

  const loginAction = (e) => {
    
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          console.log(res);
          
          if (res.success) {
            console.log("Got the success response");

            if (res.jwtToken !== null) {
              console.log("JWT TOKEN not null, positive response");
              if (res.user != null) {
                if (res.user.role === "admin") {
                  sessionStorage.setItem(
                    "active-admin",
                    JSON.stringify(res.user)
                  );
                  sessionStorage.setItem(
                    "admin-jwtToken",
                    res.user.jwtToken
                  );
                } else if (res.user.role === "employee") {
                  sessionStorage.setItem(
                    "active-employee",
                    JSON.stringify(res.user)
                  );
                  sessionStorage.setItem(
                    "employee-jwtToken",
                    res.user.jwtToken
                  );
                } else if (res.user.role === "manager") {
                  sessionStorage.setItem(
                    "active-manager",
                    JSON.stringify(res.user)
                  );
                  sessionStorage.setItem(
                    "manager-jwtToken",
                    res.user.jwtToken
                  );
                }
              } 
              
              
              else {
                setTimeout(() => {
                  window.location.href = "/user/login";
                }, 1000);
              }
            }
            
            if (res.jwtToken !== null) {
              
              console.log(res.jwtToken);
              if(res.responseMessage === "Failed to Log in..!!!")
                {toast.error(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });}
              else{
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
                window.location.href = "/home";
              }, 2000);
            } }
            else {
              
              toast.error(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          } else if(res.responseMessage==="Access Denied : Inactive User"){
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            console.log("Didn't get a success response");
            toast.error("It seems the server is down", {
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
        toast.error("It seems the server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    e.preventDefault();
  };

  const handleForgotPassword = () => {
    // Redirect user to the password recovery page
    navigate("/forgot-password");
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ">
        <div
          className="card form-card border-color custom-bg "
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color text-center custom-bg-text">
            <h4 className="card-title">User Login</h4>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3 text-color">
                <label htmlFor="role" className="form-label">
                  <b>User Role</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="role"
                >
                  <option value="0">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              <div className="mb-3 text-color">
                <label htmlFor="emailId" className="form-label">
                  <b>Email Id</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={loginRequest.emailId}
                />
              </div>
              <div className="mb-3 text-color">
                <label htmlFor="password" className="form-label">
                  <b>Password</b>
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"} // Conditionally set input type
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    value={loginRequest.password}
                    autoComplete="on"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={togglePasswordVisibility}
                    onMouseOver={onMouseOverHandler}
                    onMouseOut={onMouseOutHandler}
                  >
                    {showPassword ? "👁️" : "🔒"}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={loginAction}
              >
                Login
              </button>

              <button
                type="button"
                className="btn btn-link"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;
