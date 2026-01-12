import React from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import './TaskCard.css';
import type { Task } from '../../types';
import { AvatarStack } from '../Avatar';
import { PriorityBadge } from '../PriorityBadge';
import { formatTimeRange } from '../../data/mockData';

interface TaskCardProps {
    task: Task;
    variant?: 'green' | 'purple';
    onClick?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
    task,
    variant = 'purple',
    onClick
}) => {
    const showStripes = task.status === 'in_progress';

    return (
        <div className={`task-card task-card--${variant}`} onClick={onClick}>
            <div className="task-card__header">
                <h3 className="task-card__title">{task.title}</h3>
                <div className="task-card__actions">
                    {task.reviewCount > 0 && (
                        <span className="task-card__review-count">
                            {task.reviewCount} Review
                        </span>
                    )}
                    <button className="task-card__expand-btn">
                        <ArrowUpRight size={16} />
                    </button>
                </div>
            </div>

            <div className="task-card__meta">
                <div className="task-card__time">
                    <Clock size={14} />
                    <span>{formatTimeRange(task.startTime, task.endTime)}</span>
                </div>
                <PriorityBadge priority={task.priority} />
            </div>

            <div className="task-card__footer">
                <AvatarStack users={task.assignedUsers} max={3} size="sm" />
                {showStripes && (
                    <div className="task-card__status-stripe">
                        <span>Work In Progress</span>
                    </div>
                )}
            </div>
        </div>
    );
};

interface TaskCardCompactProps {
    task: Task;
    variant?: 'green' | 'purple' | 'dark';
}

export const TaskCardCompact: React.FC<TaskCardCompactProps> = ({
    task,
    variant = 'green'
}) => {
    return (
        <div className={`task-card-compact task-card-compact--${variant}`}>
            <div className="task-card-compact__content">
                <span className="task-card-compact__title">{task.title}</span>
                {task.reviewCount > 0 && (
                    <span className="task-card-compact__count">{task.reviewCount}</span>
                )}
            </div>
            <span className="task-card-compact__time">
                {formatTimeRange(task.startTime, task.endTime).split(' - ')[0]} -{' '}
                {formatTimeRange(task.startTime, task.endTime).split(' - ')[1]}
            </span>
        </div>
    );
};

export default TaskCard;
