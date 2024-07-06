//@ts-check
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Error from "./components/Error.jsx";
import SignIn from "./components/SignIn.jsx";
import Watchlist from "./components/Watchlist.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Movies from "./components/Movies.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/movies',
                element: <Movies />,
            },
            {
                path: '/signup',
                element: <SignIn isSignIn={false}/>,
            },
            {
                path: '/signin',
                element: <SignIn isSignIn={true}/>,
            },
            {
                path: '/watchlist',
                element: <Watchlist />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            } 
        ]
    }
]);

export default router;