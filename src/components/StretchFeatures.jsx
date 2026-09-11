import React from 'react';

export default function StretchFeatures({ tasks }) {
  const completedTasks = tasks.filter(t => t.status === 'completed');

  if (completedTasks.length === 0) return null;

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 mt-6">
      <div className="card-body">
        <h2 className="card-title text-base-content mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Completed Operations
        </h2>
        
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {completedTasks.map(task => (
            <div key={task.id} className="flex justify-between items-center p-3 bg-base-200 rounded-lg shadow-sm">
              <span className="font-semibold line-through opacity-60 truncate mr-4">{task.title}</span>
              <span className="badge badge-ghost whitespace-nowrap">{task.hours} hrs</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}