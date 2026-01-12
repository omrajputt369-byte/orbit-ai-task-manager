import React, { useState } from 'react';
import { ArrowLeft, Plus, Bell } from 'lucide-react';
import './Schedule.css';
import type { Task } from '../../types';
import { IconButton, Calendar, WeekView, Timeline } from '../../components';

interface ScheduleProps {
    onBack?: () => void;
    tasks?: Task[];
}

export const Schedule: React.FC<ScheduleProps> = ({ onBack, tasks = [] }) => {
    const [selectedDate, setSelectedDate] = useState(new Date('2026-01-13'));
    const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

    // Get tasks for selected date
    const tasksForDate = tasks.filter((task) => {
        const taskDate = task.startTime;
        return (
            taskDate.getDate() === selectedDate.getDate() &&
            taskDate.getMonth() === selectedDate.getMonth()
        );
    });

    // Generate highlighted dates from tasks
    const highlightedDates = tasks.map((task) => task.startTime);

    return (
        <div className="schedule">
            <header className="schedule__header">
                <button className="schedule__back-btn" onClick={onBack}>
                    <ArrowLeft size={20} />
                </button>
                <div className="schedule__header-actions">
                    <IconButton icon={<Plus size={20} />} variant="dark" />
                    <IconButton icon={<Bell size={20} />} variant="light" />
                </div>
            </header>

            <h1 className="schedule__title">Task schedule</h1>

            <section className="schedule__calendar">
                {viewMode === 'week' ? (
                    <WeekView
                        selectedDate={selectedDate}
                        onDateSelect={setSelectedDate}
                        highlightedDates={highlightedDates}
                    />
                ) : (
                    <Calendar
                        selectedDate={selectedDate}
                        onDateSelect={setSelectedDate}
                        highlightedDates={highlightedDates}
                    />
                )}

                <div className="schedule__view-toggle">
                    <button
                        className={`schedule__toggle-btn ${viewMode === 'week' ? 'active' : ''}`}
                        onClick={() => setViewMode('week')}
                    >
                        Week
                    </button>
                    <button
                        className={`schedule__toggle-btn ${viewMode === 'month' ? 'active' : ''}`}
                        onClick={() => setViewMode('month')}
                    >
                        Month
                    </button>
                </div>
            </section>

            <section className="schedule__timeline">
                <Timeline tasks={tasksForDate.length > 0 ? tasksForDate : tasks.slice(0, 4)} />
            </section>
        </div>
    );
};

export default Schedule;
