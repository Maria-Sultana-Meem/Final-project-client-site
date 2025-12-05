import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../component/Home/Home";
import Register from "../auth/Register";
import ErrorPage from "../pages/ErrorPage";
import Login from "../auth/Login";

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
    ]
}


])

export default router