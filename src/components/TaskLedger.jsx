// src/components/TaskLedger.jsx
import React from 'react';

// src/components/TaskLedger.jsx
export default function TaskLedger({ tasks, onResolve, onDelete }) {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200">
      <div className="card-body p-6">
        <h2 className="card-title text-xl font-bold mb-4">Task Ledger</h2>
        
        {tasks.length === 0 ? (
          <p className="text-base-content/60 text-sm italic">No active tasks. Add one to start tracking capacity.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Task Details</th>
                  <th className="text-center">Hours</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="hover">
                    <td>
                      <div className="font-semibold">{task.title}</div>
                      <div className="text-xs text-base-content/50">ID: {task.id}</div>
                    </td>
                    <td className="text-center">
                      <span className="badge badge-ghost font-mono font-bold">
                        {task.hours} hrs
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => onResolve(task.id)}
                          className="btn btn-xs btn-success btn-outline"
                        >
                          Resolve
                        </button>
                        <button
                          onClick={() => onDelete(task.id)}
                          className="btn btn-xs btn-error btn-outline"
                        >
                          Drop
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}