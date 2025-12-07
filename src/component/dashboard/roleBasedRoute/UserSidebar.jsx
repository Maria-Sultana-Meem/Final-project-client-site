import { Link } from "react-router";
import { Wallet, User2 } from "lucide-react";

const UserSidebar = () => {
  return (
    <ul className="menu space-y-2">
      <li>
        <Link to="/dashboard/my-loans" className="flex items-center gap-2">
          <Wallet size={20} color="blue" /> My Loans
        </Link>
      </li>

      <li>
        <Link to="/dashboard/borrower-profile" className="flex items-center gap-2">
          <User2 size={20} color="green"/> My Profile
        </Link>
      </li>
    </ul>
  );
};

export default UserSidebar;
