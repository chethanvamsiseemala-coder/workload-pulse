import React from 'react';

// src/components/OverloadGauge.jsx
export default function OverloadGauge({ tasks }) {
  const totalHours = tasks.reduce((sum, task) => sum + Number(task.hours || 0), 0);
  const maxCapacity = 30;
  const isOverloaded = totalHours > maxCapacity;
  const percentage = Math.min(Math.round((totalHours / maxCapacity) * 100), 100);

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg flex items-center gap-2">
          ⚡ Overload Gauge
        </h3>
        <span className={`badge ${isOverloaded ? 'badge-error' : 'badge-success'} font-bold`}>
          {isOverloaded ? 'CRITICAL OVERLOAD' : 'CAPACITY OK'}
        </span>
      </div>

      <div className="text-3xl font-extrabold my-2">
        {totalHours} <span className="text-base text-base-content/60 font-normal">/ {maxCapacity} hrs</span>
      </div>

      <progress 
        className={`progress w-full h-3 ${isOverloaded ? 'progress-error' : 'progress-primary'}`} 
        value={totalHours} 
        max={maxCapacity}
      ></progress>
      
      <div className="flex justify-between text-xs text-base-content/50 mt-1">
        <span>0 hrs</span>
        <span>{percentage}% utilized</span>
        <span>{maxCapacity} hrs max</span>
      </div>
    </div>
  );
}