import React from 'react';
import './Timeline.css';
import type { Task } from '../../types';
import { TaskCardCompact } from '../TaskCard';

interface TimelineProps {
    tasks: Task[];
    startHour?: number;
    endHour?: number;
}

export const Timeline: React.FC<TimelineProps> = ({
    tasks,
    startHour = 8,
    endHour = 18
}) => {
    const hours = Array.from(
        { length: endHour - startHour + 1 },
        (_, i) => startHour + i
    );

    const formatHour = (hour: number) => {
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        return `${displayHour.toString().padStart(2, '0')} ${suffix}`;
    };

    const getTasksByHour = (hour: number) => {
        return tasks.filter((task) => task.startTime.getHours() === hour);
    };

    const getVariant = (task: Task): 'green' | 'purple' | 'dark' => {
        switch (task.status) {
            case 'in_progress':
                return 'green';
            case 'in_review':
                return 'purple';
            default:
                return 'dark';
        }
    };

    return (
        <div className="timeline">
            {hours.map((hour) => {
                const hourTasks = getTasksByHour(hour);

                return (
                    <div key={hour} className="timeline__row">
                        <div className="timeline__hour">
                            {formatHour(hour)}
                        </div>
                        <div className="timeline__content">
                            <div className="timeline__line" />
                            {hourTasks.map((task) => (
                                <TaskCardCompact
                                    key={task.id}
                                    task={task}
                                    variant={getVariant(task)}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Timeline;
