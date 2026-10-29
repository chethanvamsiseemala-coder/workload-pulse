
const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/tasks'
).replace(/\/$/, '');

async function request(path = '', options = {}) {
  let response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new Error('Cannot connect to the backend. Check that the server is running and VITE_API_BASE_URL is correct.');
  }

  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || `Request failed (${response.status})`);
  }

  return data;
}

export const taskApi = {
  list: () => request(),
  create: (task) => request('', { method: 'POST', body: JSON.stringify(task) }),
  update: (id, task) => request(`/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(task) }),
  remove: (id) => request(`/${encodeURIComponent(id)}`, { method: 'DELETE' }),
};

export { BASE_URL };
