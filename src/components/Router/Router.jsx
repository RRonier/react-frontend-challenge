import LoginPage from "../../pages/auth.jsx"
import {
    createBrowserRouter,
} from "react-router-dom";
import UsersDashboard from "../../pages/users.jsx";
import { PrivateRoute } from "../PrivateRoute.jsx";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/dashboard",
        element: <PrivateRoute />,
        children: [{
            path: "/dashboard",
            element: <UsersDashboard />
        }]
    }
]);
