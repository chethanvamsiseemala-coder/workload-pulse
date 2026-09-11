
import React from 'react';

export default function UrgentSpotlight({ tasks }) {
  const activeTasks = tasks.filter(t => t.status === 'active');

 
  if (activeTasks.length === 0) return null;

  const urgentTask = activeTasks.reduce((max, task) => 
    Number(task.hours) > Number(max.hours) ? task : max
  , activeTasks[0]);

  return (
    <div className="card bg-warning text-warning-content shadow-xl border-none transition-all hover:scale-[1.02]">
      <div className="card-body p-5 flex flex-row items-center gap-4">
        <div className="text-4xl drop-shadow-md">🔥</div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-xs font-bold uppercase tracking-wider opacity-80">Highest Impact Task</h3>
          <p className="font-bold text-lg leading-tight mt-1 truncate whitespace-normal break-words">
            {urgentTask.title}
          </p>
          <div className="badge badge-neutral mt-2 shadow-sm border-none font-semibold">
            {urgentTask.hours} hrs required
          </div>
        </div>
      </div>
    </div>
  );
}