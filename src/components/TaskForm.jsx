import React, { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [hours, setHours] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !hours) {
      setError('Task description and estimated hours are required.');
      return;
    }

    if (title.length > 400) {
      setError('Task description exceeds 400 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddTask({
        title: title.trim(),
        hours: Number(hours),
        status: 'active',
        createdAt: new Date().toISOString()
      });
      setTitle('');
      setHours('');
    } catch (err) {
      setError('Network error: Failed to add task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 transition-all hover:shadow-2xl">
      <div className="card-body">
        <h2 className="card-title text-primary mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Deploy New Task
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Task Description</span>
              <span className="label-text-alt opacity-70">{title.length}/400</span>
            </label>
            <input 
              type="text" 
              placeholder="e.g., Optimize database queries..." 
              className="input input-bordered w-full focus:input-primary transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={400}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Estimated Hours</span>
            </label>
            <input 
              type="number" 
              placeholder="e.g., 2.5" 
              className="input input-bordered w-full focus:input-primary transition-all"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              min="0.5"
              step="0.5"
              max="100"
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="alert alert-error text-sm py-2 shadow-sm rounded-lg animate-pulse">
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary mt-2 shadow-md hover:scale-[1.02] active:scale-95 transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? <span className="loading loading-spinner"></span> : 'Initialize Task'}
          </button>
        </form>
      </div>
    </div>
  );
}