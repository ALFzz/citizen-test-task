import {createBrowserRouter} from "react-router-dom";
import {Layout} from "../widgets/Layout/Layout.tsx";
import {CitizensPage} from "../pages/Citizens/CitizensPage.tsx";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <CitizensPage />,
            },
            {
                path: '/citizens',
                element: <CitizensPage />,
            },
        ],
    },
]);