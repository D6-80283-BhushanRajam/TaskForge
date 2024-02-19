import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  let navigate = useNavigate();
  
  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  const adminLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("admin-jwtToken");
    
    
    
    navigate("/");
    window.location.reload(true);
  };

  return (
  <div>
    <div>
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
        <li className="nav-item">
          <Link
            to="/user/manager/register"
            className="nav-link active"
            aria-current="page"
          >
            <b className="text-color">Register Manager</b>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/user/admin/project/add"
            className="nav-link active"
            aria-current="page"
          >
            <b className="text-color">Add Project</b>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/user/admin/project/all"
            className="nav-link active"
            aria-current="page"
          >
            <b className="text-color">All Projects</b>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/user/admin/manager/all"
            className="nav-link active"
            aria-current="page"
          >
            <b className="text-color">View Managers</b>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/user/employee/all"
            className="nav-link active"
            aria-current="page"
          >
            <b className="text-color">View All Employees</b>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/user/change/password"
            className="nav-link active"
            aria-current="page"
          >
            <b className="text-color">Change Password</b>
          </Link>
        </li>

      

        <li className="nav-item">
          <Link
            to="/"
            className="nav-link active"
            aria-current="page"
            onClick={adminLogout}
          >
            <b className="text-color">Logout</b>
          </Link>
          <ToastContainer />
        </li>
      </ul>

    </div>
   
     
  </div>
  );
};

export default AdminHeader;
