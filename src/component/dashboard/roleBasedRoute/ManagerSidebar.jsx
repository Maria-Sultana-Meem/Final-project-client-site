import { Link } from "react-router";
import { PlusCircle, ClipboardList, ClipboardCheck, User2 } from "lucide-react";

const ManagerSidebar = () => {
  return (
    <ul className="menu space-y-2">
      <li>
        <Link to="/dashboard/add-loan" className="flex items-center gap-2">
          <PlusCircle size={20} color="blue"/> Add Loan
        </Link>
      </li>

      <li>
        <Link to="/dashboard/manage-loans" className="flex items-center gap-2">
          <ClipboardList size={20} color="orange"/> Manage Loans
        </Link>
      </li>

      <li>
        <Link to="/dashboard/pending-loans" className="flex items-center gap-2">
          <ClipboardList size={25} color="red"/> Pending Applications
        </Link>
      </li>

      <li>
        <Link to="/dashboard/approved-loans" className="flex items-center gap-2">
          <ClipboardCheck size={25} color="green"/> Approved Applications
        </Link>
      </li>

      <li>
        <Link to="/dashboard/manager-profile" className="flex items-center gap-2">
          <User2 size={20} color="blue"/> My Profile
        </Link>
      </li>
    </ul>
  );
};

export default ManagerSidebar;
