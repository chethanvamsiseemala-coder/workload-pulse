# ⚡ Workload Pulse

<div align="center">

  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&pause=1000&color=6366F1&center=true&vCenter=true&width=600&lines=Plan+Smarter.+Work+Better.;Your+Tasks%2C+Your+Progress.;Stay+Focused.+Stay+Productive." alt="Workload Pulse tagline" />

  <p><strong>A modern full-stack task management application to organize work, track tasks, and stay productive.</strong></p>

  <p>
    <a href="https://workload-pulse-tau.vercel.app/">
      <img src="https://img.shields.io/badge/🚀_Live_Demo-6366F1?style=for-the-badge" alt="Live Demo" />
    </a>
    <a href="https://github.com/chethanvamsiseemala-coder/workload-pulse">
      <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository" />
    </a>
    <a href="https://workload-pulse-api.onrender.com/api/health">
      <img src="https://img.shields.io/badge/API-Online-16A34A?style=for-the-badge&logo=render" alt="Backend API" />
    </a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" alt="Express.js" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
    <img src="https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black" alt="Render" />
  </p>

</div>

---

## 🌐 Live Application

> **Workload Pulse is deployed and operational.** Create, manage, and organize your tasks through the live application.

| Component | Link |
|:---|:---|
| 🌍 Live Frontend | [workload-pulse-tau.vercel.app](https://workload-pulse-tau.vercel.app/) |
| ⚙️ Backend API | [workload-pulse-api.onrender.com](https://workload-pulse-api.onrender.com) |
| ❤️ API Health Check | [Check API Status](https://workload-pulse-api.onrender.com/api/health) |
| 💻 Source Code | [GitHub Repository](https://github.com/chethanvamsiseemala-coder/workload-pulse) |

## ✨ Key Features

<table>
  <tr>
    <td width="50%">
      <h3>📋 Task Management</h3>
      Create, view, update, and delete tasks through the application.
    </td>
    <td width="50%">
      <h3>💾 Persistent Storage</h3>
      Store task data in MongoDB Atlas so changes remain available after refreshing.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔗 RESTful API</h3>
      Communicate between the frontend and backend using HTTP endpoints.
    </td>
    <td width="50%">
      <h3>🛡️ Error Handling</h3>
      Handle API errors and backend connectivity issues.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>☁️ Cloud Deployment</h3>
      Host the frontend on Vercel and the backend on Render.
    </td>
    <td width="50%">
      <h3>⚡ Modern Development</h3>
      Use Vite, Node.js, Express, and Mongoose for development and API integration.
    </td>
  </tr>
</table>

## 🧰 Technology Stack

<div align="center">

| Layer | Technologies |
|:---|:---|
| **Frontend** | React, Vite, JavaScript, CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Communication** | REST API, HTTP, CORS |
| **Deployment** | Vercel, Render |
| **Version Control** | Git, GitHub |

</div>

## 🏛️ System Architecture

<div align="center">

```mermaid
flowchart TD
    A["👤 User"] --> B["⚡ React + Vite Frontend"]
    B -->|"HTTP / REST API"| C["🟢 Node.js + Express Backend"]
    C -->|"Mongoose"| D[("🍃 MongoDB Atlas")]
    D -->|"Database Results"| C
    C -->|"JSON Response"| B
    B --> A
    style B fill:#6366f1,color:#fff,stroke:#4f46e5
    style C fill:#16a34a,color:#fff,stroke:#15803d
    style D fill:#0d9488,color:#fff,stroke:#0f766e
```

</div>

### 🔄 How It Works

1. The user interacts with the React frontend.
2. The frontend sends HTTP requests to the Express API.
3. The backend processes requests and interacts with MongoDB Atlas through Mongoose.
4. The API returns responses to the frontend.
5. The interface updates to reflect the latest task data.

## 🚀 Getting Started

Follow these steps to run Workload Pulse locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- A MongoDB Atlas account or a local MongoDB instance

### 1. Clone the Repository

```bash
git clone https://github.com/chethanvamsiseemala-coder/workload-pulse.git
cd workload-pulse
```

### 2. Install Dependencies

Install the frontend dependencies from the directory containing the frontend `package.json`:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

> Run each command in the directory containing the corresponding `package.json`.

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
```

Configure the frontend `.env` file in the frontend project root:

```env
VITE_API_BASE_URL=http://localhost:5000/api/tasks
```

**Important:** Replace the MongoDB connection string placeholder with your actual database connection string. If your backend uses a different port or environment variable name, use the values defined in your code.

Never commit `.env` files or database credentials to GitHub.

### 4. Start the Backend

From the backend directory, run the development script defined in its `package.json`, for example:

```bash
npm run dev
```

### 5. Start the Frontend

Open another terminal, navigate to the frontend project root, and run:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## 🔌 API Reference

**Production base URL**

```text
https://workload-pulse-api.onrender.com
```

| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/api/health` | Check backend health |
| `GET` | `/api/tasks` | Retrieve tasks |
| `POST` | `/api/tasks` | Create a task |
| `PUT` / `PATCH` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

<details>
  <summary><strong>❤️ Health Check Example</strong></summary>

  **Request**

  ```http
  GET /api/health
  ```

  **Example response**

  ```json
  {
    "status": "ok",
    "service": "Workload Pulse API"
  }
  ```

</details>

<details>
  <summary><strong>📋 Tasks Endpoint</strong></summary>

  Retrieve the current task collection:

  ```http
  GET /api/tasks
  ```

  The response structure depends on the implementation of the task routes.

</details>

> **Note:** Verify the exact update method, route parameters, and request body against `backend/src/routes/taskRoutes.js` before treating this table as the definitive API contract.

## ☁️ Deployment

Workload Pulse uses a separate deployment for each application layer.

| Service | Platform | Configuration |
|:---|:---|:---|
| Frontend | Vercel | `VITE_API_BASE_URL` |
| Backend | Render | `PORT`, `MONGODB_URI`, `CORS_ORIGIN` |
| Database | MongoDB Atlas | Database connection string |

### Frontend Environment Variable

Set the following in your Vercel project settings:

```env
VITE_API_BASE_URL=https://workload-pulse-api.onrender.com/api/tasks
```

### Backend Configuration

Configure the MongoDB connection string and allowed frontend origins in Render's environment settings.

Example `CORS_ORIGIN`:

```text
http://localhost:5173,https://workload-pulse-one.vercel.app,https://workload-pulse-tau.vercel.app
```

Only include origins that your application should allow.

## 🔐 Security Best Practices

- Keep database credentials and secrets out of source control.
- Never put private credentials in frontend environment variables prefixed with `VITE_`.
- Configure CORS to allow only trusted origins.
- Validate incoming data on the backend.
- Handle errors without exposing sensitive server information.

## 🗺️ Future Enhancements

- [ ] User authentication and authorization
- [ ] Task priorities and deadlines
- [ ] Search, filtering, and sorting
- [ ] Productivity analytics and dashboards
- [ ] Notifications and reminders
- [ ] Automated testing and CI/CD improvements

## 👨‍💻 Author

<div align="center">

  <h3>Chethan Vamsi</h3>
  <p>B.Tech — Computer Science and Engineering (AI &amp; ML)</p>
  <a href="https://github.com/chethanvamsiseemala-coder">
    <img src="https://img.shields.io/badge/GitHub-Chethan_Vamsi-181717?style=for-the-badge&logo=github" alt="GitHub Profile" />
  </a>

</div>

---

<div align="center">

  <h3>⚡ Workload Pulse</h3>
  <p><em>Plan smarter. Stay organized. Get things done.</em></p>
  <p>If you find this project useful, consider giving the repository a ⭐</p>

</div>
