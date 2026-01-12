import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import './MeetingCard.css';
import type { Meeting } from '../../types';
import { Avatar } from '../Avatar';
import { formatTimeRange } from '../../data/mockData';

interface MeetingCardProps {
    meeting: Meeting;
    onClick?: () => void;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({
    meeting,
    onClick
}) => {
    return (
        <div className="meeting-card" onClick={onClick}>
            <div className="meeting-card__avatar">
                <Avatar src={meeting.host.avatar} alt={meeting.host.name} size="md" />
                <div className="meeting-card__avatar-indicator" />
            </div>

            <div className="meeting-card__content">
                <h4 className="meeting-card__title">{meeting.title}</h4>
                <div className="meeting-card__time">
                    <Clock size={12} />
                    <span>{formatTimeRange(meeting.startTime, meeting.endTime)}</span>
                </div>
            </div>

            <button className="meeting-card__action">
                <ArrowRight size={20} />
            </button>
        </div>
    );
};

interface TeamMeetingCardProps {
    meeting: Meeting;
    onClick?: () => void;
}

export const TeamMeetingCard: React.FC<TeamMeetingCardProps> = ({
    meeting,
    onClick
}) => {
    return (
        <div className="team-meeting-card" onClick={onClick}>
            <div className="team-meeting-card__icon">
                <div className="team-meeting-card__icon-inner" />
            </div>

            <div className="team-meeting-card__content">
                <h4 className="team-meeting-card__title">{meeting.title}</h4>
                <div className="team-meeting-card__time">
                    <Clock size={12} />
                    <span>{formatTimeRange(meeting.startTime, meeting.endTime)}</span>
                </div>
            </div>

            <div className="team-meeting-card__checkbox" />
        </div>
    );
};

export default MeetingCard;
