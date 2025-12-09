import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../component/Home/Home";
import Register from "../auth/Register";
import ErrorPage from "../pages/ErrorPage";
import Login from "../auth/Login";
import AllLoans from "../pages/AllLoans";
import About from "../pages/About";
import Contact from "../pages/Contact";
import DashboardLayout from "../layout/DashboardLayout";

import LoanApplicationForm from "../pages/LoanApplicationForm";
import LoanDetails from "../pages/loanDetails";
import PrivateRoute from "./PrivateRoute";
import BorrowerProfile from "../component/dashboard/borrower/BorrowerProfile";
import MyLoans from "../component/dashboard/borrower/MyLoans";
import PaymentSuccess from "../component/dashboard/borrower/PaymentSuccess";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../component/dashboard/admin/ManageUsers";
import DashboardHome from "../component/dashboard/DashboardHome";
import ManageLoans from "../component/dashboard/admin/ManageLoans";
import LoanApplications from "../component/dashboard/admin/LoanApplications";
import ManagerRoute from "./ManagerRoute";
import AddLoan from "../component/dashboard/manager/Addloan";
import ManagerManageLoans from "../component/dashboard/manager/ManagerManageLoans";
import UpdateLoan from "../component/dashboard/manager/UpdateLoan";
import PendingLoans from "../component/dashboard/manager/PendingLoans";
import ApprovedLoans from "../component/dashboard/manager/ApprovedLoans";
import ManagerProfile from "../component/dashboard/manager/ManagersProfile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/all-loans",
        Component: AllLoans,
      },
      {
        path: "/all-loans/:id",
        element: (
          <PrivateRoute>
            <LoanDetails></LoanDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/loan-application/:id",
        element: (
          <PrivateRoute>
            <LoanApplicationForm />
          </PrivateRoute>
        ),
      },
      {
        path:'/loan-application',
        element:<PrivateRoute><LoanApplicationForm></LoanApplicationForm></PrivateRoute>
      }
    ],
  },
  {
    path: "/dashboard",
  element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        index:true,
        
        element:<DashboardHome></DashboardHome>
      },

      { path:'borrower-profile',
        element:<BorrowerProfile></BorrowerProfile>
    },
      { path:'my-loans',
        element:<MyLoans></MyLoans>
    },
    {
        path: 'payment-success',
        element: <PaymentSuccess />,
      },
    {
        path: 'manage-users',
        element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
    {
        path: 'all-loan',
        element:<AdminRoute><ManageLoans></ManageLoans></AdminRoute>
      },
    {
        path: 'loan-applications',
        element:<AdminRoute><LoanApplications></LoanApplications></AdminRoute>
      },
      {
        path:'add-loan',
        element:<ManagerRoute><AddLoan></AddLoan></ManagerRoute>
      },
      {
        path:'manage-loans',
        element:<ManagerRoute><ManagerManageLoans></ManagerManageLoans></ManagerRoute>
      },
      {
        path:'update-loan/:id',
        element:<ManagerRoute><UpdateLoan></UpdateLoan></ManagerRoute>
      },
      {
        path:'pending-loans',
        element:<ManagerRoute><PendingLoans></PendingLoans></ManagerRoute>
      },
      {
        path:'approved-loans',
        element:<ManagerRoute><ApprovedLoans></ApprovedLoans></ManagerRoute>
      },
      {
        path:'manager-profile',
        element:<ManagerRoute><ManagerProfile></ManagerProfile></ManagerRoute>
      }
  
  
  
  ]
  },
]);

export default router;
