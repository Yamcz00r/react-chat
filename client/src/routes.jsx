import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/RegistrationPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    }
    ,
    {
        path:'/registration',
        element: <Registration />
    }
]);

export default router;