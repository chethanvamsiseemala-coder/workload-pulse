// src/components/TaskLedger.jsx
import React from 'react';

export default function TaskLedger({ tasks, onComplete, onDelete }) {
  const activeTasks = tasks.filter(t => t.status === 'active');

  if (activeTasks.length === 0) {
    return (
      <div className="card bg-base-100 shadow-xl border border-base-300 text-center py-12">
        <p className="text-lg opacity-60">No active tasks in the ledger.</p>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200 text-base-content">
              <th>Task Details</th>
              <th>Impact</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeTasks.map((task) => (
              <tr key={task.id} className="hover">
                <td className="whitespace-normal break-words max-w-xs">
                  <div className="font-semibold">{task.title}</div>
                  <div className="text-xs opacity-60 mt-1">ID: {task.id}</div>
                </td>
                <td>
                  <span className="badge badge-neutral">{task.hours} hrs</span>
                </td>
                <td className="text-right space-x-2">
                  <button 
                    onClick={() => onComplete(task.id)}
                    className="btn btn-sm btn-success btn-outline hover:scale-105"
                  >
                    Resolve
                  </button>
                  <button 
                    onClick={() => onDelete(task.id)}
                    className="btn btn-sm btn-error btn-outline hover:scale-105"
                  >
                    Drop
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}