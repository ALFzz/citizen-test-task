import {Outlet} from "react-router-dom";
import {Sidebar} from "../Sidebar/Sidebar.tsx";
import {Header} from "../Header/Header.tsx";
import './Layout.css'

export function Layout() {
    return (
        <div className="app-layout">
            <Sidebar />

            <div className="app-content">
                <Header/>

                <main className="app-main">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}