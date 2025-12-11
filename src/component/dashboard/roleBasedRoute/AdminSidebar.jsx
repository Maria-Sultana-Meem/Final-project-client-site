import { Link } from "react-router";
import { Users, FileText, Layers } from "lucide-react";

const AdminSidebar = () => {
  return (
    <ul className="menu space-y-2">

      <li>
        <Link to="/dashboard/manage-users" className="flex items-center gap-2">
          <Users size={22} />
          <span className="hidden md:inline">Manage Users</span>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/all-loan" className="flex items-center gap-2">
          <Layers size={22} />
          <span className="hidden md:inline">All Loan</span>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/loan-applications" className="flex items-center gap-2">
          <FileText size={22} />
          <span className="hidden md:inline">Loan Applications</span>
        </Link>
      </li>
      
    </ul>
  );
};

export default AdminSidebar;
