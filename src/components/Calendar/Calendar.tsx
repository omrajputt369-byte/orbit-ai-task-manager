import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import './Calendar.css';

interface CalendarProps {
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
    highlightedDates?: Date[];
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export const Calendar: React.FC<CalendarProps> = ({
    selectedDate,
    onDateSelect,
    highlightedDates = []
}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
    const [isExpanded, setIsExpanded] = useState(false);

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        const days: (Date | null)[] = [];

        // Add empty slots for days before the first of the month
        for (let i = 0; i < startingDay; i++) {
            days.push(null);
        }

        // Add the days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const isHighlighted = (date: Date | null) => {
        if (!date) return false;
        return highlightedDates.some(
            (d) => d.getDate() === date.getDate() && d.getMonth() === date.getMonth()
        );
    };

    const isSelected = (date: Date | null) => {
        if (!date) return false;
        return (
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear()
        );
    };

    const isToday = (date: Date | null) => {
        if (!date) return false;
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const formatDate = (date: Date) => {
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentMonth((prev) => {
            const newMonth = new Date(prev);
            if (direction === 'prev') {
                newMonth.setMonth(newMonth.getMonth() - 1);
            } else {
                newMonth.setMonth(newMonth.getMonth() + 1);
            }
            return newMonth;
        });
    };

    const days = getDaysInMonth(currentMonth);

    return (
        <div className="calendar">
            <div className="calendar__header">
                <button
                    className="calendar__date-picker"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <CalendarIcon size={16} />
                    <span>{formatDate(selectedDate)}</span>
                    <ChevronDown size={16} className={isExpanded ? 'rotated' : ''} />
                </button>

                <div className="calendar__nav">
                    <button onClick={() => navigateMonth('prev')}>
                        <ChevronLeft size={18} />
                    </button>
                    <button onClick={() => navigateMonth('next')}>
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="calendar__month-label">
                    {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </div>
            )}

            <div className="calendar__weekdays">
                {DAYS.map((day, i) => (
                    <div key={i} className="calendar__weekday">{day}</div>
                ))}
            </div>

            {isExpanded && (
                <div className="calendar__grid">
                    {days.map((date, i) => (
                        <button
                            key={i}
                            className={`calendar__day ${date ? '' : 'calendar__day--empty'} ${isSelected(date) ? 'calendar__day--selected' : ''} ${isHighlighted(date) ? 'calendar__day--highlighted' : ''} ${isToday(date) ? 'calendar__day--today' : ''}`}
                            onClick={() => date && onDateSelect(date)}
                            disabled={!date}
                        >
                            {date?.getDate()}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

interface WeekViewProps {
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
    highlightedDates?: Date[];
}

export const WeekView: React.FC<WeekViewProps> = ({
    selectedDate,
    onDateSelect,
    highlightedDates = []
}) => {
    const getWeekDays = (date: Date) => {
        const start = new Date(date);
        start.setDate(start.getDate() - start.getDay());

        const days: Date[] = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(start);
            day.setDate(start.getDate() + i);
            days.push(day);
        }
        return days;
    };

    const isSelected = (date: Date) => {
        return (
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth()
        );
    };

    const isHighlighted = (date: Date) => {
        return highlightedDates.some(
            (d) => d.getDate() === date.getDate() && d.getMonth() === date.getMonth()
        );
    };

    const weekDays = getWeekDays(selectedDate);

    return (
        <div className="week-view">
            <div className="week-view__header">
                {DAYS.map((day, i) => (
                    <div key={i} className="week-view__day-name">{day}</div>
                ))}
            </div>
            <div className="week-view__days">
                {weekDays.map((date, i) => (
                    <button
                        key={i}
                        className={`week-view__day ${isSelected(date) ? 'week-view__day--selected' : ''} ${isHighlighted(date) ? 'week-view__day--highlighted' : ''}`}
                        onClick={() => onDateSelect(date)}
                    >
                        {date.getDate()}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
