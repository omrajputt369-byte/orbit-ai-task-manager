import React from 'react';
import './PriorityBadge.css';
import type { Priority } from '../../types';

interface PriorityBadgeProps {
    priority: Priority;
    className?: string;
}

const priorityLabels: Record<Priority, string> = {
    low: 'Low Priority',
    medium: 'Medium Priority',
    high: 'High Priority'
};

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
    priority,
    className = ''
}) => {
    return (
        <span className={`priority-badge priority-badge--${priority} ${className}`}>
            {priorityLabels[priority]}
        </span>
    );
};

export default PriorityBadge;
