import { Link } from "react-router";
import { Users, FileText, Layers } from "lucide-react";

const AdminSidebar = () => {
  return (
    <ul className="menu space-y-2">
      <li>
        <Link to="/dashboard/manage-users" className="flex items-center gap-2">
          <Users size={20} color="blue"/> Manage Users
        </Link>
      </li>

      <li>
        <Link to="/dashboard/all-loan" className="flex items-center gap-2">
          <Layers size={20} color="orange"/> All Loan
        </Link>
      </li>

      <li>
        <Link to="/dashboard/loan-applications" className="flex items-center gap-2">
          <FileText size={25} color="green"/> Loan Applications
        </Link>
      </li>
    </ul>
  );
};

export default AdminSidebar;
