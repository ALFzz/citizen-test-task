import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    FileText,
} from 'lucide-react';
import './Sidebar.css';



const navigation = [
    {
        label: 'Dashboard',
        path: '/',
        icon: LayoutDashboard,
    },
    {
        label: 'Граждане',
        path: '/citizens',
        icon: Users,
    },
    {
        label: 'Обращения',
        path: '/appeals',
        icon: MessageSquare,
    },
    {
        label: 'Отчёты',
        path: '/reports',
        icon: FileText,
    },
];

export function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="sidebar-logo-mark">C</div>

                <span>Citizen Registry</span>
            </div>

            <nav className="sidebar-navigation">
                <span className="sidebar-section-title">Рабочая область</span>

                {navigation.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`
                            }
                        >
                            <Icon className="sidebar-link-icon" />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}