//@ts-check
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Error from "./components/Error.jsx";
import SignIn from "./components/SignIn.jsx";
import Movies from "./components/Movies.jsx";
import Watchlist from "./components/Watchlist.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/signup',
                element: <SignIn isSignIn={false}/>,
            },
            {
                path: '/signin',
                element: <SignIn isSignIn={true}/>,
            },
            {
                path: '/movies',
                element: <Movies />,
            },
            {
                path: '/watchlist',
                element: <Watchlist />,
            }
        ]
    }, 
]);

export default router;