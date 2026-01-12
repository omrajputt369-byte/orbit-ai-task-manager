import React from 'react';
import './StatusPill.css';
import type { TaskStatus } from '../../types';

interface StatusPillProps {
    status: TaskStatus;
    count?: number;
    active?: boolean;
    onClick?: () => void;
}

const statusLabels: Record<TaskStatus, string> = {
    in_progress: 'In progress',
    in_review: 'In review',
    on_hold: 'On hold',
    completed: 'Completed'
};

export const StatusPill: React.FC<StatusPillProps> = ({
    status,
    count,
    active = false,
    onClick
}) => {
    return (
        <button
            className={`status-pill status-pill--${status} ${active ? 'status-pill--active' : ''}`}
            onClick={onClick}
        >
            <span className="status-pill__label">{statusLabels[status]}</span>
            {count !== undefined && (
                <span className="status-pill__count">{count}</span>
            )}
        </button>
    );
};

interface StatusPillRowProps {
    counts: {
        inProgress: number;
        inReview: number;
        onHold: number;
    };
    activeStatus?: TaskStatus | null;
    onStatusClick?: (status: TaskStatus) => void;
}

export const StatusPillRow: React.FC<StatusPillRowProps> = ({
    counts,
    activeStatus,
    onStatusClick
}) => {
    return (
        <div className="status-pill-row">
            <StatusPill
                status="in_progress"
                count={counts.inProgress}
                active={activeStatus === 'in_progress'}
                onClick={() => onStatusClick?.('in_progress')}
            />
            <StatusPill
                status="in_review"
                count={counts.inReview}
                active={activeStatus === 'in_review'}
                onClick={() => onStatusClick?.('in_review')}
            />
            <StatusPill
                status="on_hold"
                count={counts.onHold}
                active={activeStatus === 'on_hold'}
                onClick={() => onStatusClick?.('on_hold')}
            />
        </div>
    );
};

export default StatusPill;
