import AdminHeader from "./AdminHeader";
import EmployeeHeader from "./EmployeeHeader";
import ManagerHeader from "./ManagerHeader";
import NormalHeader from "./NormalHeader";

const RoleNav = () => {
  const employee = JSON.parse(sessionStorage.getItem("active-employee"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const manager = JSON.parse(sessionStorage.getItem("active-manager"));

  if (admin != null) {
    return <AdminHeader />;
  } else if (manager != null) {
    return <ManagerHeader />;
  } else if (employee != null) {
    return <EmployeeHeader />;
  } else {
    return <NormalHeader />;
  }
};

export default RoleNav;
