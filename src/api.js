const BASE_URL =
  import.meta.env.VITE_MOCKAPI_BASE_URL ||
  'https://6aa2d7d9ccb3db9689a7133a.mockapi.io/api/v1/student_tasks';

async function request(path = '', options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  if (response.status === 204) return null;

  return response.json();
}

export const taskApi = {
  list: () => request(),

  create: (task) =>
    request('', {
      method: 'POST',
      body: JSON.stringify(task),
    }),

  update: (id, task) =>
    request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    }),

  remove: (id) =>
    request(`/${id}`, {
      method: 'DELETE',
    }),
};

export { BASE_URL };