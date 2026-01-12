import React from 'react';
import './Avatar.css';

interface AvatarProps {
    src: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
    src,
    alt,
    size = 'md',
    className = ''
}) => {
    return (
        <div className={`avatar avatar--${size} ${className}`}>
            <img src={src} alt={alt} className="avatar__image" />
        </div>
    );
};

interface AvatarStackProps {
    users: Array<{ id: string; avatar: string; name: string }>;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    showCount?: boolean;
}

export const AvatarStack: React.FC<AvatarStackProps> = ({
    users,
    max = 3,
    size = 'sm',
    showCount = true
}) => {
    const visibleUsers = users.slice(0, max);
    const remainingCount = users.length - max;

    return (
        <div className="avatar-stack">
            {visibleUsers.map((user) => (
                <Avatar
                    key={user.id}
                    src={user.avatar}
                    alt={user.name}
                    size={size}
                    className="avatar-stack__item"
                />
            ))}
            {showCount && remainingCount > 0 && (
                <div className={`avatar-stack__count avatar-stack__count--${size}`}>
                    +{remainingCount}
                </div>
            )}
            {showCount && (
                <span className="avatar-stack__label">{users.length} In team</span>
            )}
        </div>
    );
};

export default Avatar;
