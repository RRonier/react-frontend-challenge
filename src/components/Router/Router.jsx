import LoginPage from "../../pages/auth.jsx"
import {
    createBrowserRouter,
} from "react-router-dom";
import UsersDashboard from "../../pages/users.jsx";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/dashboard",
        element: <UsersDashboard />,
    }
]);
