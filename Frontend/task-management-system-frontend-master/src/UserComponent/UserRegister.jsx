import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    age: "",
    sex: "",
  });

  const [errors, setErrors] = useState({});
  const [genders, setGenders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (document.URL.includes("admin")) {
      setUser((prevUser) => ({ ...prevUser, role: "admin" }));
    } else if (document.URL.includes("manager")) {
      setUser((prevUser) => ({ ...prevUser, role: "manager" }));
    } else if (document.URL.includes("employee")) {
      setUser((prevUser) => ({ ...prevUser, role: "employee" }));
    }
  }, []);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!user.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!user.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!user.emailId.trim()) {
      newErrors.emailId = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.emailId)) {
      newErrors.emailId = "Email is invalid";
      isValid = false;
    }

    if (!user.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (user.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!user.contact.trim()) {
      newErrors.contact = "Contact number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(user.contact.trim())) {
      newErrors.contact = "Contact number must be 10 digits";
      isValid = false;
    }

    if (!user.age.trim()) {
      newErrors.age = "Age is required";
      isValid = false;
    } else if (isNaN(user.age.trim()) || user.age.trim() < 0) {
      newErrors.age = "Age must be a positive number";
      isValid = false;
    }

    if (!user.sex.trim()) {
      newErrors.sex = "Gender is required";
      isValid = false;
    }

    if (!user.street.trim()) {
      newErrors.street = "Street is required";
      isValid = false;
    }

    if (!user.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }

    if (!user.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
      isValid = false;
    } else if (!/^\d{6}$/.test(user.pincode.trim())) {
      newErrors.pincode = "Pincode must be 6 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const retrieveAllGenders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/gender");
      return response.data.genders;
    } catch (error) {
      console.error("Error retrieving genders:", error);
      return [];
    }
  };

  useEffect(() => {
    retrieveAllGenders()
      .then((genders) => setGenders(genders))
      .catch((error) => console.error("Error setting genders:", error));
  }, []);

  const saveUser = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`http://localhost:8080/api/user/${user.role}/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.responseMessage, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          if (user.role === "manager") {
            navigate("/user/admin/manager/all");
          } else if (user.role === "employee") {
            navigate("/user/employee/all");
          }
        }, 1000);
      } else {
        toast.error(data.error || "An error occurred", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to save user", {
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

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2 ">
        <div className="card form-card border-color text-color custom-bg" style={{ width: "50rem" }}>
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Register {user.role}</h5>
          </div>
          <div className="card-body">
            <form className="row g-3" onSubmit={saveUser}>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="title" className="form-label">
                  <b>First Name</b>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName && "is-invalid"}`}
                  id="firstName"
                  name="firstName"
                  onChange={handleUserInput}
                  value={user.firstName}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Last Name</b>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName && "is-invalid"}`}
                  id="lastName"
                  name="lastName"
                  onChange={handleUserInput}
                  value={user.lastName}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Email Id</b>
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.emailId && "is-invalid"}`}
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={user.emailId}
                />
                {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  className={`form-control ${errors.password && "is-invalid"}`}
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={user.password}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Contact No</b>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.contact && "is-invalid"}`}
                  id="contact"
                  name="contact"
                  onChange={handleUserInput}
                  value={user.contact}
                />
                {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Age</b>
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.age && "is-invalid"}`}
                  id="age"
                  name="age"
                  onChange={handleUserInput}
                  value={user.age}
                />
                {errors.age && <div className="invalid-feedback">{errors.age}</div>}
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>User Gender</b>
                </label>
                <select
                  className={`form-control ${errors.sex && "is-invalid"}`}
                  onChange={handleUserInput}
                  name="sex"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.sex && <div className="invalid-feedback">{errors.sex}</div>}
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Street</b>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.street && "is-invalid"}`}
                  id="street"
                  name="street"
                  onChange={handleUserInput}
                  value={user.street}
                />
                {errors.street && <div className="invalid-feedback">{errors.street}</div>}
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>City</b>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.city && "is-invalid"}`}
                  id="city"
                  name="city"
                  onChange={handleUserInput}
                  value={user.city}
                />
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Pincode</b>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.pincode && "is-invalid"}`}
                  id="pincode"
                  name="pincode"
                  onChange={handleUserInput}
                  value={user.pincode}
                />
                {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
              </div>
              <div className="d-flex aligns-items-center justify-content-center">
                <input
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  value="Register User"
                />
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
