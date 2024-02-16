import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import Header from "./NavbarComponent/Header";
import { Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import ContactUs from "./page/ContactUs";
import UserRegister from "./UserComponent/UserRegister";
import AboutUs from "./page/AboutUs";
import UserLoginForm from "./UserComponent/UserLoginForm";
import ViewAllManagers from "./UserComponent/ViewAllManagers";
import ViewAllEmployees from "./UserComponent/ViewAllEmployees";
import AddProject from "./ProjectComponent/AddProject";
import ViewAllProjects from "./ProjectComponent/ViewAllProjects";
import AssignProjectToManager from "./ProjectComponent/AssignProjectToManager";
import ViewAllManagerProjects from "./ProjectComponent/ViewAllManagerProjects";
import AssignProjectToEmployee from "./ProjectComponent/AssignProjectToEmployee";
import ViewAllEmployeeProjects from "./ProjectComponent/ViewAllEmployeeProjects";
import UpdateProjectStatus from "./ProjectComponent/UpdateProjectStatus";
import ChangePassword from "./UserComponent/ChangePassword";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="user/admin/register" element={<UserRegister />} />
        <Route path="user/employee/register" element={<UserRegister />} />
        <Route path="user/manager/register" element={<UserRegister />} />
        <Route path="user/admin/manager/all" element={<ViewAllManagers />} />
        <Route path="user/employee/all" element={<ViewAllEmployees />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/user/admin/project/add" element={<AddProject />} />
        <Route path="/user/admin/project/all" element={<ViewAllProjects />} />
        <Route
          path="/user/manager/project/all"
          element={<ViewAllManagerProjects />}
        />
        <Route
          path="/user/employee/project/all"
          element={<ViewAllEmployeeProjects />}
        />
        <Route
          path="/project/assign/manager"
          element={<AssignProjectToManager />}
        />
        <Route
          path="/project/assign/employee"
          element={<AssignProjectToEmployee />}
        />
        <Route
          path="/employee/project/status/update"
          element={<UpdateProjectStatus />}
        />
        <Route path="/user/change/password" element={<ChangePassword />} />
      </Routes>
    </div>
  );
}

export default App;
