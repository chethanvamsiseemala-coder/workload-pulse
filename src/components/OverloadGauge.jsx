import React from 'react';

export default function OverloadGauge({ tasks }) {
 
  const activeHours = tasks
    .filter(t => t.status === 'active')
    .reduce((sum, t) => sum + Number(t.hours), 0);
  
  const MAX_CAPACITY = 40;
  const percentage = Math.min((activeHours / MAX_CAPACITY) * 100, 100);
  
  let stressColor = 'bg-success';
  let textColor = 'text-success';
  let statusText = 'Optimal Capacity';

  if (percentage >= 90) {
    stressColor = 'bg-error';
    textColor = 'text-error animate-pulse';
    statusText = 'CRITICAL OVERLOAD';
  } else if (percentage >= 70) {
    stressColor = 'bg-warning';
    textColor = 'text-warning';
    statusText = 'Approaching Limit';
  }

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <h2 className="card-title text-primary mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          Overload Gauge
        </h2>
        
        <div className="flex justify-between items-end mb-2">
          <span className={`text-2xl font-bold ${textColor}`}>{activeHours} <span className="text-base text-base-content opacity-70 font-normal">/ {MAX_CAPACITY} hrs</span></span>
          <span className={`text-sm font-semibold ${textColor}`}>{statusText}</span>
        </div>

        <div className="w-full bg-base-200 rounded-full h-4 overflow-hidden">
          <div 
            className={`h-4 rounded-full transition-all duration-700 ease-out ${stressColor}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}