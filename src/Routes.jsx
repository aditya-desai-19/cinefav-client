//@ts-check
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Error from "./components/Error.jsx";
import SignIn from "./components/SignIn.jsx";
import Movies from "./components/Movies.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/signin',
                element: <SignIn />,
            },
            {
                path: '/movies',
                element: <Movies />,
            }
        ]
    }, 
]);

export default router;