import type { Task, User, Meeting, AnalyticsData } from '../types';

export const mockUsers: User[] = [
    {
        id: '1',
        name: 'Om Rajput',
        avatar: '/avatars/om-rajput.jpg',
        email: 'om.rajput@example.com'
    },
    {
        id: '2',
        name: 'Sarah Miller',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        email: 'sarah@company.com'
    },
    {
        id: '3',
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        email: 'mike@company.com'
    },
    {
        id: '4',
        name: 'Emily Davis',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        email: 'emily@company.com'
    }
];

export const mockTasks: Task[] = [
    {
        id: '1',
        title: 'Web application user registration process',
        description: 'Design and implement the user registration flow for the web application',
        startTime: new Date('2026-01-12T10:00:00'),
        endTime: new Date('2026-01-12T17:30:00'),
        priority: 'high',
        status: 'in_review',
        assignedUsers: [mockUsers[0], mockUsers[1], mockUsers[2]],
        reviewCount: 6,
        createdAt: new Date('2026-01-10T09:00:00'),
        updatedAt: new Date('2026-01-12T08:00:00')
    },
    {
        id: '2',
        title: 'User flow admin panel',
        description: 'Create the admin panel user flow documentation',
        startTime: new Date('2026-01-12T10:00:00'),
        endTime: new Date('2026-01-12T17:30:00'),
        priority: 'high',
        status: 'in_review',
        assignedUsers: [mockUsers[1], mockUsers[3]],
        reviewCount: 8,
        createdAt: new Date('2026-01-09T14:00:00'),
        updatedAt: new Date('2026-01-12T07:00:00')
    },
    {
        id: '3',
        title: 'Dashboard design for admin panel',
        description: 'Design the main dashboard view for the admin panel',
        startTime: new Date('2026-01-12T10:00:00'),
        endTime: new Date('2026-01-12T17:30:00'),
        priority: 'high',
        status: 'in_progress',
        assignedUsers: [mockUsers[0], mockUsers[1], mockUsers[2], mockUsers[3]],
        reviewCount: 1,
        createdAt: new Date('2026-01-08T10:00:00'),
        updatedAt: new Date('2026-01-12T06:00:00')
    },
    {
        id: '4',
        title: 'Design registration process',
        description: 'Create wireframes for the registration flow',
        startTime: new Date('2026-01-13T08:00:00'),
        endTime: new Date('2026-01-13T10:00:00'),
        priority: 'medium',
        status: 'in_progress',
        assignedUsers: [mockUsers[2]],
        reviewCount: 6,
        createdAt: new Date('2026-01-11T09:00:00'),
        updatedAt: new Date('2026-01-12T05:00:00')
    },
    {
        id: '5',
        title: 'Web application design',
        description: 'Overall web application design system',
        startTime: new Date('2026-01-13T11:00:00'),
        endTime: new Date('2026-01-13T14:00:00'),
        priority: 'medium',
        status: 'on_hold',
        assignedUsers: [mockUsers[0], mockUsers[3]],
        reviewCount: 8,
        createdAt: new Date('2026-01-07T11:00:00'),
        updatedAt: new Date('2026-01-12T04:00:00')
    },
    {
        id: '6',
        title: 'Dashboard design',
        description: 'Main dashboard component design',
        startTime: new Date('2026-01-13T14:00:00'),
        endTime: new Date('2026-01-13T18:00:00'),
        priority: 'low',
        status: 'in_review',
        assignedUsers: [mockUsers[1]],
        reviewCount: 1,
        createdAt: new Date('2026-01-06T16:00:00'),
        updatedAt: new Date('2026-01-12T03:00:00')
    }
];

export const mockMeeting: Meeting = {
    id: '1',
    title: 'Next Meeting',
    startTime: new Date('2026-01-12T14:15:00'),
    endTime: new Date('2026-01-12T14:30:00'),
    host: mockUsers[0],
    participants: [mockUsers[0], mockUsers[1], mockUsers[2]]
};

export const mockTeamMeeting: Meeting = {
    id: '2',
    title: 'Team Meeting',
    startTime: new Date('2026-01-12T15:00:00'),
    endTime: new Date('2026-01-12T15:30:00'),
    host: mockUsers[1],
    participants: mockUsers
};

export const mockAnalytics: AnalyticsData[] = [
    { date: new Date('2026-01-05'), inProgress: 3, inReview: 4, onHold: 2, completed: 5 },
    { date: new Date('2026-01-06'), inProgress: 5, inReview: 3, onHold: 1, completed: 6 },
    { date: new Date('2026-01-07'), inProgress: 4, inReview: 5, onHold: 2, completed: 4 },
    { date: new Date('2026-01-08'), inProgress: 6, inReview: 4, onHold: 1, completed: 7 },
    { date: new Date('2026-01-09'), inProgress: 3, inReview: 6, onHold: 2, completed: 5 },
    { date: new Date('2026-01-10'), inProgress: 4, inReview: 3, onHold: 3, completed: 6 },
    { date: new Date('2026-01-11'), inProgress: 5, inReview: 5, onHold: 1, completed: 8 }
];

export const getStatusCounts = (tasks: Task[]) => {
    return tasks.reduce(
        (acc, task) => {
            switch (task.status) {
                case 'in_progress':
                    acc.inProgress++;
                    break;
                case 'in_review':
                    acc.inReview++;
                    break;
                case 'on_hold':
                    acc.onHold++;
                    break;
                case 'completed':
                    acc.completed++;
                    break;
            }
            return acc;
        },
        { inProgress: 0, inReview: 0, onHold: 0, completed: 0 }
    );
};

export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

export const formatTimeRange = (start: Date, end: Date): string => {
    return `${formatTime(start)} - ${formatTime(end)}`;
};

export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
