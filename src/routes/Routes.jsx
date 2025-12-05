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

const router = createBrowserRouter([
{
    path:'/',
    Component:MainLayout,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
            index:true,
            path:'/',
            Component:Home,
        },
        {
            path:'/register',
            Component:Register
        },
        {
            path:'/login',
            Component:Login
        },
        {
            path:'/all-loans',
            Component:AllLoans
        },
        {
            path:'/about',
            Component:About
        },
        {
            path:'/contact',
            Component:Contact
        },
    ]
    
},
{
    path:'/dashboard',
    Component:DashboardLayout,
}


])

export default router