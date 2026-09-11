// src/App.jsx
import { useState, useEffect } from 'react';
import { getTasks, addTask, deleteTask } from './services/mockApi';
import TaskForm from './components/TaskForm';
import TaskLedger from './components/TaskLedger';
import OverloadGauge from './components/OverloadGauge';
import UrgentSpotlight from './components/UrgentSpotlight';
import StretchFeatures from './components/StretchFeatures';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    document.documentElement.setAttribute('data-theme', selectedTheme);
  };

  const handleAddTask = async (newTask) => {
    const created = await addTask(newTask);
    setTasks((prev) => [...prev, created]);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleClearCompleted = () => {
    // Local cleanup logic for stretch feature button
    setTasks([]);
  };

  return (
    
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header & Theme Switcher */}
        <div className="flex justify-between items-center bg-base-100 p-6 rounded-box shadow-md">
          <div>
            <h1 className="text-3xl font-black">WorkloadPulse</h1>
            <p className="text-sm text-base-content/70">Real-time Task & Engineering Capacity Tracker</p>
          </div>
          <h1 className="text-3xl font-black bg-red-500 text-white">WorkloadPulse</h1>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase">Theme:</span>
            <select className="select select-bordered select-sm" value={theme} onChange={handleThemeChange}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="synthwave">Synthwave</option>
            </select>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <TaskForm onAddTask={handleAddTask} />
            <OverloadGauge tasks={tasks} />
            <UrgentSpotlight tasks={tasks} />
          </div>

          <div className="md:col-span-2 space-y-6">
            <StretchFeatures tasks={tasks} onClearCompleted={handleClearCompleted} />
            <TaskLedger tasks={tasks} onResolve={handleDeleteTask} onDelete={handleDeleteTask} />
          </div>
        </div>

      </div>
    </div>
  );
}