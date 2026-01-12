import React, { useState } from 'react';
import { X, Calendar, Clock, Flag } from 'lucide-react';
import './AddTaskModal.css';
import type { Priority } from '../../types';
import { Button } from '../Button';

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (task: {
        title: string;
        description: string;
        date: string;
        startTime: string;
        endTime: string;
        priority: Priority;
    }) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');
    const [priority, setPriority] = useState<Priority>('medium');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSubmit({
            title,
            description,
            date,
            startTime,
            endTime,
            priority
        });

        // Reset form
        setTitle('');
        setDescription('');
        setDate('');
        setStartTime('09:00');
        setEndTime('17:00');
        setPriority('medium');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <h2 className="modal__title">Add New Task</h2>
                    <button className="modal__close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form className="modal__form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Task Title</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Enter task title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-textarea"
                            placeholder="Add description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <Calendar size={16} />
                            Date
                        </label>
                        <input
                            type="date"
                            className="form-input"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                <Clock size={16} />
                                Start Time
                            </label>
                            <input
                                type="time"
                                className="form-input"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                <Clock size={16} />
                                End Time
                            </label>
                            <input
                                type="time"
                                className="form-input"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <Flag size={16} />
                            Priority
                        </label>
                        <div className="priority-options">
                            {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    className={`priority-option priority-option--${p} ${priority === p ? 'active' : ''}`}
                                    onClick={() => setPriority(p)}
                                >
                                    {p.charAt(0).toUpperCase() + p.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="modal__actions">
                        <Button variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => { }}>
                            Add Task
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
