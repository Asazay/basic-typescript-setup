import {createBrowserRouter} from "react-router-dom";
import {Layout} from "./layout.tsx";
import Homepage from "../components/Homepage/Homepage.tsx";


export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Homepage/>
            },
            {
                path: '/test',
                element: <h1>This is a test page</h1>
            }
        ],
    }
])