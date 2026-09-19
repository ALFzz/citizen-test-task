import {Outlet} from "react-router-dom";

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