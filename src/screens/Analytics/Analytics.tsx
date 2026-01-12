import React, { useState } from 'react';
import { Plus, Bell } from 'lucide-react';
import './Analytics.css';
import { mockAnalytics, mockTasks, getStatusCounts, mockUsers } from '../../data/mockData';
import { Avatar, IconButton, StatusPillRow, BarChart, ViewToggle } from '../../components';
import type { TaskStatus } from '../../types';

interface AnalyticsProps {
    onNavigate?: (screen: string) => void;
}

export const Analytics: React.FC<AnalyticsProps> = () => {
    const [activeView, setActiveView] = useState<'day' | 'week' | 'month'>('week');
    const [activeFilter, setActiveFilter] = useState<TaskStatus | null>(null);

    const statusCounts = getStatusCounts(mockTasks);

    const handleStatusClick = (status: TaskStatus) => {
        setActiveFilter(activeFilter === status ? null : status);
    };

    return (
        <div className="analytics">
            <header className="analytics__header">
                <Avatar
                    src={mockUsers[0].avatar}
                    alt={mockUsers[0].name}
                    size="lg"
                />
                <div className="analytics__header-actions">
                    <IconButton icon={<Plus size={20} />} variant="dark" />
                    <IconButton icon={<Bell size={20} />} variant="light" />
                </div>
            </header>

            <h1 className="analytics__title">Manage your task</h1>

            <section className="analytics__filters">
                <StatusPillRow
                    counts={statusCounts}
                    activeStatus={activeFilter}
                    onStatusClick={handleStatusClick}
                />
            </section>

            <section className="analytics__toggle">
                <ViewToggle
                    activeView={activeView}
                    onViewChange={setActiveView}
                />
            </section>

            <section className="analytics__chart">
                <BarChart data={mockAnalytics} />
            </section>
        </div>
    );
};

export default Analytics;
