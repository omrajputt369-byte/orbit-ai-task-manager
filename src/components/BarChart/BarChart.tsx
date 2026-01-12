import React from 'react';
import './BarChart.css';
import type { AnalyticsData } from '../../types';

interface BarChartProps {
    data: AnalyticsData[];
    maxHeight?: number;
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const BarChart: React.FC<BarChartProps> = ({
    data,
    maxHeight = 200
}) => {
    const getMaxTotal = () => {
        return Math.max(...data.map((d) => d.inProgress + d.inReview + d.onHold + d.completed));
    };

    const maxTotal = getMaxTotal();

    const getBarHeight = (value: number) => {
        return (value / maxTotal) * maxHeight;
    };

    return (
        <div className="bar-chart">
            <div className="bar-chart__bars">
                {data.map((item, index) => {
                    const total = item.inProgress + item.inReview + item.onHold + item.completed;

                    return (
                        <div key={index} className="bar-chart__column">
                            <div
                                className="bar-chart__bar"
                                style={{ height: `${getBarHeight(total)}px` }}
                            >
                                <div
                                    className="bar-chart__segment bar-chart__segment--completed"
                                    style={{ height: `${(item.completed / total) * 100}%` }}
                                />
                                <div
                                    className="bar-chart__segment bar-chart__segment--in-review"
                                    style={{ height: `${(item.inReview / total) * 100}%` }}
                                />
                                <div
                                    className="bar-chart__segment bar-chart__segment--in-progress"
                                    style={{ height: `${(item.inProgress / total) * 100}%` }}
                                />
                                <div
                                    className="bar-chart__segment bar-chart__segment--on-hold"
                                    style={{ height: `${(item.onHold / total) * 100}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bar-chart__labels">
                {data.map((item, index) => (
                    <div key={index} className="bar-chart__label">
                        <span className="bar-chart__day">{DAYS[item.date.getDay()]}</span>
                        <span className="bar-chart__date">{item.date.getDate()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

interface ViewToggleProps {
    activeView: 'day' | 'week' | 'month';
    onViewChange: (view: 'day' | 'week' | 'month') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
    activeView,
    onViewChange
}) => {
    return (
        <div className="view-toggle">
            <button
                className={`view-toggle__btn ${activeView === 'day' ? 'view-toggle__btn--active' : ''}`}
                onClick={() => onViewChange('day')}
            >
                Day
            </button>
            <button
                className={`view-toggle__btn ${activeView === 'week' ? 'view-toggle__btn--active' : ''}`}
                onClick={() => onViewChange('week')}
            >
                Week
            </button>
            <button
                className={`view-toggle__btn ${activeView === 'month' ? 'view-toggle__btn--active' : ''}`}
                onClick={() => onViewChange('month')}
            >
                Month
            </button>
        </div>
    );
};

export default BarChart;
