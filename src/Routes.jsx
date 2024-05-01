//@ts-check
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Error from "./pages/Error.jsx";
import Auth from "./components/Auth.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/signin',
                element: <Auth isLogin={false}/>,
            },
            {
                path: '/login',
                element: <Auth isLogin={true}/>,
            }
        ]
    }, 
]);

export default router;