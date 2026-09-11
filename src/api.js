const BASE_URL =
  import.meta.env.VITE_MOCKAPI_BASE_URL ||
  'https://6aa2d7d9ccb3db9689a7133a.mockapi.io/api/v1/student_tasks';

const DEVICE_ID_KEY = 'workload_pulse_device_id';

export function getDeviceId() {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }

  return deviceId;
}

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
  list: async () => {
    const tasks = await request();
    const deviceId = getDeviceId();

    return tasks.filter((task) => task.deviceId === deviceId);
  },

  create: (task) =>
    request('', {
      method: 'POST',
      body: JSON.stringify({
        ...task,
        deviceId: getDeviceId(),
      }),
    }),

  update: async (id, task) => {
    const existingTask = await request(`/${id}`);

    return request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...existingTask,
        ...task,
        deviceId: existingTask.deviceId || getDeviceId(),
      }),
    });
  },

  remove: (id) =>
    request(`/${id}`, {
      method: 'DELETE',
    }),
};

export { BASE_URL };