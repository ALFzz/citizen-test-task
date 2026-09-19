import {Outlet} from "react-router-dom";
import './Layout.css'
import {Sidebar} from "../Sidebar/Sidebar.tsx";

export function Layout() {
    return (
        <div className="app-layout">
            <Sidebar />

            <div className="app-content">
                <Header/>

                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}