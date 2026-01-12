import React, { useState } from 'react';
import { Plus, Bell } from 'lucide-react';
import './Dashboard.css';
import type { Task, TaskStatus as TStatus } from '../../types';
import {
    Avatar,
    IconButton,
    StatusPillRow,
    MeetingCard,
    TeamMeetingCard,
    TaskCard
} from '../../components';
import { mockMeeting, mockTeamMeeting, mockUsers, getStatusCounts } from '../../data/mockData';

interface DashboardProps {
    tasks?: Task[];
    onAddTask?: () => void;
    onAvatarClick?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
    tasks = [],
    onAddTask,
    onAvatarClick
}) => {
    const [activeFilter, setActiveFilter] = useState<TStatus | null>(null);

    const statusCounts = getStatusCounts(tasks);

    const filteredTasks = activeFilter
        ? tasks.filter(t => t.status === activeFilter)
        : tasks;

    const handleStatusClick = (status: TStatus) => {
        setActiveFilter(activeFilter === status ? null : status);
    };

    return (
        <div className="dashboard">
            <header className="dashboard__header">
                <div onClick={onAvatarClick} style={{ cursor: 'pointer' }}>
                    <Avatar
                        src={mockUsers[0].avatar}
                        alt={mockUsers[0].name}
                        size="lg"
                    />
                </div>
                <div className="dashboard__header-actions">
                    <IconButton
                        icon={<Plus size={20} />}
                        variant="dark"
                        onClick={onAddTask}
                    />
                    <IconButton icon={<Bell size={20} />} variant="light" />
                </div>
            </header>

            <h1 className="dashboard__title">Manage your task</h1>

            <section className="dashboard__meeting">
                <MeetingCard meeting={mockMeeting} />
            </section>

            <section className="dashboard__filters">
                <StatusPillRow
                    counts={statusCounts}
                    activeStatus={activeFilter}
                    onStatusClick={handleStatusClick}
                />
            </section>

            <section className="dashboard__tasks">
                {filteredTasks.slice(0, 5).map((task, index) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        variant={index % 2 === 0 ? 'purple' : 'green'}
                    />
                ))}
            </section>

            <section className="dashboard__team-meeting">
                <TeamMeetingCard meeting={mockTeamMeeting} />
            </section>
        </div>
    );
};

export default Dashboard;
