import React from 'react';
import { Home, CheckSquare, Calendar, Settings } from 'lucide-react';
import './FloatingNav.css';

type NavItem = 'home' | 'tasks' | 'calendar' | 'settings';

interface FloatingNavProps {
    activeItem: NavItem;
    onNavigate: (item: NavItem) => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
    activeItem,
    onNavigate
}) => {
    const navItems: { id: NavItem; icon: React.ReactNode }[] = [
        { id: 'home', icon: <Home size={20} /> },
        { id: 'tasks', icon: <CheckSquare size={20} /> },
        { id: 'calendar', icon: <Calendar size={20} /> },
        { id: 'settings', icon: <Settings size={20} /> }
    ];

    return (
        <nav className="floating-nav">
            <div className="floating-nav__container">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`floating-nav__item ${activeItem === item.id ? 'floating-nav__item--active' : ''}`}
                        onClick={() => onNavigate(item.id)}
                    >
                        {item.icon}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default FloatingNav;
