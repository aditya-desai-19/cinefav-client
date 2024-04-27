//@ts-check
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Error from "./pages/Error.jsx";
import SignIn from "./components/SignIn.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/signin',
                element: <SignIn />,
            }
        ]
    }, 
]);

export default router;