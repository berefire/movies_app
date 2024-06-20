import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import ExplorePage from "../pages/ExplorePage";
import DetailsPage from "../pages/DetailsPage";
import SearchPage from "../pages/SearchPage";

const aboutExplorePaths = ['tv', 'movie'];
const aboutExploreIdPaths = ['tv/:id', '/movie/:id'];

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:  [ 
            {
                path : "",
                element : <Home />
            },
            ...aboutExplorePaths.map(path => ({ 
                path,
                element: <ExplorePage />
            })),
            ...aboutExploreIdPaths.map(path => ({
                path,
                element: <DetailsPage />
            })),
            {
                path : "search",
                element : <SearchPage /> 
            }
        ]
    }
]);

export default router;