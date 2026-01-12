import React from 'react';
import './Button.css';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'dark' | 'ghost' | 'icon';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    iconOnly?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconOnly = false,
    onClick,
    disabled = false,
    className = '',
    type = 'button'
}) => {
    return (
        <button
            type={type}
            className={`button button--${variant} button--${size} ${iconOnly ? 'button--icon-only' : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span className="button__icon">{icon}</span>}
            {!iconOnly && <span className="button__text">{children}</span>}
        </button>
    );
};

interface IconButtonProps {
    icon: React.ReactNode;
    variant?: 'light' | 'dark' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    active?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    variant = 'light',
    size = 'md',
    onClick,
    disabled = false,
    className = '',
    active = false
}) => {
    return (
        <button
            type="button"
            className={`icon-button icon-button--${variant} icon-button--${size} ${active ? 'icon-button--active' : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon}
        </button>
    );
};

export default Button;
