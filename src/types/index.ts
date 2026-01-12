export interface User {
    id: string;
    name: string;
    avatar: string;
    email?: string;
}

export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'in_progress' | 'in_review' | 'on_hold' | 'completed';

export interface Task {
    id: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    priority: Priority;
    status: TaskStatus;
    assignedUsers: User[];
    reviewCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Meeting {
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    host: User;
    participants: User[];
}

export interface AnalyticsData {
    date: Date;
    inProgress: number;
    inReview: number;
    onHold: number;
    completed: number;
}

export interface StatusCount {
    inProgress: number;
    inReview: number;
    onHold: number;
    completed: number;
}
