import {createBrowserRouter} from "react-router-dom";
import {Layout} from "../widgets/Layout/Layout.tsx";
import {CitizensPage} from "../pages/Citizens/CitizensPage.tsx";
import {DashboardPage} from "../pages/DashboardPage/DashboardPage.tsx";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/citizens',
                element: <CitizensPage />,
            },
            {
                path: '/',
                element: <DashboardPage />,
            },
        ],
    },
]);