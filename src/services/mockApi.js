

// src/services/mockApi.js

// Paste your actual MockAPI URL here
const BASE_URL = 'https://6aa2d7d9ccb3db9689a7133a.mockapi.io/api/v1/tasks';

export const api = {
  getTasks: async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
  },
  
  addTask: async (task) => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error('Failed to create task');
    return res.json();
  },
  
  updateTask: async (id, updates) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update task status');
    return res.json();
  },
  
  deleteTask: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete task');
    return res.json();
  }
};