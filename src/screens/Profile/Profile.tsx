import React from 'react';
import { ArrowLeft, Bell, ChevronRight, LogOut, Moon, User, Lock, HelpCircle, Info } from 'lucide-react';
import './Profile.css';
import { mockUsers } from '../../data/mockData';
import { useTheme } from '../../context';

interface ProfileProps {
    onBack?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onBack }) => {
    const user = mockUsers[0];
    const { isDark, toggleTheme } = useTheme();

    const menuItems = [
        { icon: User, label: 'Edit Profile', action: () => { } },
        { icon: Bell, label: 'Notifications', action: () => { } },
        { icon: Moon, label: 'Dark Mode', action: toggleTheme, toggle: true, isActive: isDark },
        { icon: Lock, label: 'Privacy & Security', action: () => { } },
        { icon: HelpCircle, label: 'Help & Support', action: () => { } },
        { icon: Info, label: 'About', action: () => { } },
    ];

    return (
        <div className="profile">
            <header className="profile__header">
                <button className="profile__back-btn" onClick={onBack}>
                    <ArrowLeft size={20} />
                </button>
                <h1 className="profile__title">Profile</h1>
                <div style={{ width: 44 }} />
            </header>

            <section className="profile__user">
                <div className="profile__avatar-container">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="profile__avatar"
                    />
                    <button className="profile__edit-avatar">
                        <User size={14} />
                    </button>
                </div>
                <h2 className="profile__name">{user.name}</h2>
                <p className="profile__email">{user.email}</p>
            </section>

            <section className="profile__stats">
                <div className="profile__stat">
                    <span className="profile__stat-value">24</span>
                    <span className="profile__stat-label">Tasks</span>
                </div>
                <div className="profile__stat-divider" />
                <div className="profile__stat">
                    <span className="profile__stat-value">18</span>
                    <span className="profile__stat-label">Completed</span>
                </div>
                <div className="profile__stat-divider" />
                <div className="profile__stat">
                    <span className="profile__stat-value">75%</span>
                    <span className="profile__stat-label">Rate</span>
                </div>
            </section>

            <section className="profile__menu">
                {menuItems.map((item, index) => (
                    <button key={index} className="profile__menu-item" onClick={item.action}>
                        <div className="profile__menu-left">
                            <div className="profile__menu-icon">
                                <item.icon size={20} />
                            </div>
                            <span className="profile__menu-label">{item.label}</span>
                        </div>
                        {item.toggle ? (
                            <div className={`profile__toggle ${item.isActive ? 'profile__toggle--active' : ''}`}>
                                <div className="profile__toggle-track">
                                    <div className="profile__toggle-thumb" />
                                </div>
                            </div>
                        ) : (
                            <ChevronRight size={20} className="profile__menu-chevron" />
                        )}
                    </button>
                ))}
            </section>

            <button className="profile__logout">
                <LogOut size={20} />
                <span>Log Out</span>
            </button>
        </div>
    );
};

export default Profile;
