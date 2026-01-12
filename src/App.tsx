import { useState } from 'react';
import { Onboarding, Dashboard, Schedule, Analytics, Profile } from './screens';
import { FloatingNav, AddTaskModal } from './components';
import type { Task, Priority } from './types';
import { mockTasks, mockUsers } from './data/mockData';

type Screen = 'onboarding' | 'dashboard' | 'schedule' | 'analytics' | 'profile';
type NavItem = 'home' | 'tasks' | 'calendar' | 'settings';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [activeNav, setActiveNav] = useState<NavItem>('home');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleGetStarted = () => {
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (item: NavItem) => {
    setActiveNav(item);
    switch (item) {
      case 'home':
        setCurrentScreen('dashboard');
        break;
      case 'tasks':
        setCurrentScreen('dashboard');
        break;
      case 'calendar':
        setCurrentScreen('schedule');
        break;
      case 'settings':
        setCurrentScreen('analytics');
        break;
    }
  };

  const handleBack = () => {
    setCurrentScreen('dashboard');
    setActiveNav('home');
  };

  const handleOpenAddTask = () => {
    setIsAddTaskOpen(true);
  };

  const handleCloseAddTask = () => {
    setIsAddTaskOpen(false);
  };

  const handleAddTask = (taskData: {
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    priority: Priority;
  }) => {
    const now = new Date();
    const newTask: Task = {
      id: `task_${Date.now()}`,
      title: taskData.title,
      description: taskData.description,
      startTime: new Date(`${taskData.date}T${taskData.startTime}`),
      endTime: new Date(`${taskData.date}T${taskData.endTime}`),
      priority: taskData.priority,
      status: 'in_progress',
      assignedUsers: [mockUsers[0]],
      reviewCount: 0,
      createdAt: now,
      updatedAt: now
    };
    setTasks([newTask, ...tasks]);
    setIsAddTaskOpen(false);
  };

  const handleAvatarClick = () => {
    setCurrentScreen('profile');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onGetStarted={handleGetStarted} />;
      case 'dashboard':
        return (
          <Dashboard
            tasks={tasks}
            onAddTask={handleOpenAddTask}
            onAvatarClick={handleAvatarClick}
          />
        );
      case 'schedule':
        return <Schedule onBack={handleBack} tasks={tasks} />;
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return <Profile onBack={handleBack} />;
      default:
        return <Dashboard tasks={tasks} onAddTask={handleOpenAddTask} onAvatarClick={handleAvatarClick} />;
    }
  };

  return (
    <div className="app-container">
      {renderScreen()}
      {currentScreen !== 'onboarding' && currentScreen !== 'profile' && (
        <FloatingNav activeItem={activeNav} onNavigate={handleNavigate} />
      )}
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={handleCloseAddTask}
        onSubmit={handleAddTask}
      />
    </div>
  );
}

export default App;
