import {createBrowserRouter} from "react-router-dom";
import {Layout} from "../widgets/Layout/Layout.tsx";

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/citizens',
                element: <CitizensPage/>,
            }
        ]
    }
])