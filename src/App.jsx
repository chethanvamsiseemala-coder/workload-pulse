// src/App.jsx
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskLedger from './components/TaskLedger';
import OverloadGauge from './components/OverloadGauge';
import UrgentSpotlight from './components/UrgentSpotlight';
import StretchFeatures from './components/StretchFeatures';
import { api } from './services/mockApi';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial Fetch
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (newTask) => {
    const createdTask = await api.addTask(newTask);
    setTasks(prev => [...prev, createdTask]);
  };

  const handleComplete = async (id) => {
    const updated = await api.updateTask(id, { status: 'completed' });
    setTasks(prev => prev.map(t => t.id === id ? updated : t));
  };

  const handleDelete = async (id) => {
    await api.deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8 text-base-content font-sans">
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center pb-6 border-b border-base-300 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">WorkloadPulse</h1>
          <p className="text-sm md:text-base opacity-70 mt-1">Real-time Task & Engineering Capacity Tracker</p>
        </div>
        <div className="badge badge-success gap-2 py-3 px-4 shadow-sm text-white font-semibold">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
          System Online
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input & Analytics */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <TaskForm onAddTask={handleAddTask} />
          <OverloadGauge tasks={tasks} />
          {/* PASA'S SPOTLIGHT PLACED HERE */}
          <UrgentSpotlight tasks={tasks} />
        </div>

        {/* Right Column: Ledger & History */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
          ) : (
            <>
              <TaskLedger 
                tasks={tasks} 
                onComplete={handleComplete} 
                onDelete={handleDelete} 
              />
              {/* ASS'S STRETCH FEATURE PLACED HERE */}
              <StretchFeatures tasks={tasks} />
            </>
          )}
        </div>

      </main>
    </div>
  );
}