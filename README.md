# ⚡ Workload Pulse

> **See the pressure before it becomes a problem.**

**Workload Pulse** is a workload-awareness platform built for **final-year engineering students** juggling academic submissions, placements, interviews, projects, certifications, and personal commitments.

Instead of discovering an overloaded week only when deadlines start colliding, Workload Pulse turns upcoming commitments into a **clear, actionable workload picture** — helping students identify pressure points, prioritize urgent work, and stay ahead of their deadlines.

---

## 🎯 The Problem

Final-year engineering students rarely struggle because they have *nothing to do*.

They struggle because **everything becomes due at the same time**.

Assignments overlap with project milestones.
Project work overlaps with placement preparation.
Interviews collide with exams.
Certifications compete with everything else.

The real challenge is not simply tracking tasks — it is understanding:

> **"Do I actually have enough time this week to handle everything I've planned?"**

Traditional to-do lists tell students **what** they need to do.

**Workload Pulse tells them whether their workload is becoming unmanageable.**

---

## 👨‍🎓 Target User

### Final-year engineering students

Students managing multiple simultaneous responsibilities such as:

* 📚 Academic assignments
* 🧪 Projects and labs
* 💼 Placement preparation
* 🧑‍💻 Coding practice
* 🎯 Interviews
* 📜 Certifications
* 🏆 Hackathons
* 👤 Personal commitments

Workload Pulse is designed around the reality of students who have **limited weekly capacity but constantly changing priorities**.

---

# 🚀 Core Features

## 1. 📝 Smart Task Creation

Add tasks quickly through a **validated task form** containing:

* Task title
* Category

  * Academic
  * Career
  * Personal
* Due date
* Estimated effort in hours
* Task status

  * Not Started
  * In Progress
  * Completed

The form includes validation to prevent incomplete or invalid task entries.

### Rapid-submit protection

Accidental duplicate submissions are prevented when users rapidly click the submit action.

This keeps the task ledger clean while maintaining a fast workflow.

---

## 2. 📊 Real-Time Weekly Workload Gauge

Workload Pulse continuously calculates the student's **planned effort for the current week**.

Instead of simply counting tasks, it measures their estimated workload in **hours**.

For example:

```text
Weekly Capacity
        ↓
     40 hours

Planned Work
        ↓
     32 hours

Remaining Capacity
        ↓
      8 hours
```

As tasks are created, edited, completed, or removed, the workload picture updates dynamically.

This transforms a simple task list into a **capacity-aware planning system**.

---

## 3. 🚨 Dynamic Workload Alert

The system continuously compares:

> **Planned weekly effort vs available weekly capacity**

When the workload crosses the student's capacity threshold, Workload Pulse immediately highlights the situation.

### 🟢 Healthy

Workload is comfortably within capacity.

### 🟡 Warning

The student's available capacity is becoming tight.

### 🔴 Overloaded

Planned effort exceeds available weekly capacity.

This gives students an immediate answer to one of the most important planning questions:

> **"Am I taking on more work than I can realistically complete?"**

---

## 4. ⏰ 48-Hour Urgent Task Spotlight

Deadlines that are approaching within **48 hours** receive special attention.

Instead of forcing students to scan the entire task list, Workload Pulse surfaces the tasks that require immediate action.

The spotlight provides:

* 🚨 Deadline visibility
* ⏳ Remaining-time awareness
* 📌 Task details
* ⚡ Quick status updates

A student can quickly move an urgent task from:

`Not Started → In Progress → Completed`

without navigating through unnecessary screens.

### Why 48 hours?

Because the final two days before a deadline are often where workload collisions become most dangerous.

Workload Pulse makes that pressure visible **before the deadline arrives**.

---

## 5. 📋 Live Task Ledger

The task ledger provides a centralized view of every workload item.

Each task displays important information such as:

| Information | Purpose                       |
| ----------- | ----------------------------- |
| Task        | What needs to be done         |
| Category    | Academic, Career, or Personal |
| Due Date    | When it is due                |
| Effort      | Estimated hours required      |
| Status      | Current progress              |

The ledger supports full **CRUD operations**:

* ➕ Create tasks
* 👀 Read tasks
* ✏️ Update tasks
* 🗑️ Delete tasks

Changes are synchronized through the application's asynchronous backend.

---

# 🧠 The Workload Pulse Experience

The application follows a simple decision-making flow:

```text
        ADD TASK
           ↓
   Estimate the effort
           ↓
    Set the deadline
           ↓
   ┌─────────────────┐
   │ Workload Pulse  │
   │ calculates load │
   └─────────────────┘
           ↓
   ┌─────────────────┐
   │ Within Capacity │
   │       or        │
   │    Overloaded   │
   └─────────────────┘
           ↓
    PRIORITIZE WORK
           ↓
    ACT BEFORE IT
      BECOMES A
       CRISIS
```

The goal is not simply to help students **record tasks**.

The goal is to help them **make better workload decisions**.

---

# ✨ Stretch Features

The core experience solves workload visibility.

The stretch features take it one step further by helping students **act on that information**.

---

## 🤖 Gemini AI Workload Re-Balancing

When workload becomes difficult to manage, the application can use **Google Gemini** to generate workload re-balancing suggestions.

Instead of merely saying:

> 🔴 "You are overloaded."

The AI can help answer:

> **"What should I do about it?"**

The system can analyze the current workload and suggest ways to rebalance priorities based on:

* Upcoming deadlines
* Estimated effort
* Task status
* Workload concentration
* Task categories

This turns Workload Pulse from a **workload monitoring tool** into an **AI-assisted planning companion**.

### Resilient fallback

The Gemini integration is optional.

If an API key is unavailable, the application uses a **local fallback mechanism**, ensuring that the core demonstration continues to work without depending entirely on an external AI service.

---

## ⚡ One-Click Demo Data Loader

Demonstrating a workload-management application is much easier when the dashboard already contains realistic data.

The demo data loader can populate the application with representative tasks so users can immediately experience:

* Normal workload
* Approaching deadlines
* Overloaded weeks
* Different task categories
* Different completion states

This makes the project **hackathon-demo friendly** while still allowing users to create their own tasks.

---

## 🔎 Dynamic Search & Category Filtering

As the number of tasks grows, finding a specific task becomes easier with dynamic filtering.

Users can narrow their task ledger using:

### Search

Search tasks by title or relevant task information.

### Category

Filter by:

* 📚 Academic
* 💼 Career
* 👤 Personal

This allows students to answer questions such as:

> "Show me everything related to placements."

or:

> "What academic work do I still have?"

---

## 🎨 Green / White Theme Switcher

Workload Pulse includes a lightweight theme switcher designed around a clean **green-and-white visual identity**.

The theme preference is persisted locally so that the user's preferred appearance survives page refreshes.

The visual system is intentionally designed to keep the workload information easy to scan while giving the product its own identity.

---

# 🗄️ Data Architecture

Workload Pulse uses **MockAPI** for asynchronous CRUD operations.

### Default endpoint

```text
https://6aa2d7d9ccb3db9689a7133a.mockapi.io/api/v1/tasks
```

### Task schema

```text
id        → MockAPI generated ID
title     → Task title
category  → Academic | Career | Personal
duedate   → YYYY-MM-DD
hours     → Estimated effort
status    → Not Started | In Progress | Completed
```

The application combines:

```text
React UI
    │
    ▼
API Layer
    │
    ▼
MockAPI
    │
    ▼
Persistent Task Data
```

LocalStorage is also used for:

* Refresh resilience
* Theme persistence
* Client-side state continuity

---

# 🛠️ Tech Stack

| Technology       | Purpose                           |
| ---------------- | --------------------------------- |
| ⚛️ React         | Frontend UI                       |
| ⚡ Vite           | Development & build tooling       |
| 🌐 MockAPI       | Asynchronous CRUD backend         |
| 💾 LocalStorage  | Local persistence & preferences   |
| 🎨 CSS           | Responsive interface & theming    |
| 🧩 Lucide React  | UI icons                          |
| 🤖 Google Gemini | Optional AI workload re-balancing |

---

# 🔐 Optional Gemini Configuration

Gemini functionality is optional.

Create a local environment file:

```bash
.env.local
```

Add:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

Without the API key, the application continues to function using its local fallback.

---

# 💻 Run Locally

Clone the repository:

```bash
git clone https://github.com/chethanvamsiseemala-coder/workload-pulse.git
```

Navigate into the project:

```bash
cd workload-pulse
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the Vite URL displayed in the terminal.

---

# 🚀 Production Build

Create a production build:

```bash
npm run build
```

The generated production files are placed in:

```text
dist/
```

---

# ☁️ Deployment

Workload Pulse can be deployed as a modern frontend application using platforms such as:

* Vercel
* Netlify

### Build command

```bash
npm run build
```

### Output directory

```text
dist
```

---

# 🧩 Feature Overview

| Feature                  | Type    | Purpose                            |
| ------------------------ | ------- | ---------------------------------- |
| Validated Task Form      | Core    | Quickly create reliable tasks      |
| Rapid-submit Protection  | Core    | Prevent duplicate submissions      |
| Weekly Workload Gauge    | Core    | Measure planned weekly effort      |
| Dynamic Workload Alert   | Core    | Detect capacity overload           |
| 48-Hour Urgent Spotlight | Core    | Surface approaching deadlines      |
| Live Task Ledger         | Core    | Manage all workload items          |
| CRUD Operations          | Core    | Create, update & delete tasks      |
| MockAPI Integration      | Core    | Asynchronous backend persistence   |
| Gemini Re-balancing      | Stretch | AI-assisted workload planning      |
| Demo Data Loader         | Stretch | Instantly populate realistic tasks |
| Dynamic Search           | Stretch | Quickly find tasks                 |
| Category Filtering       | Stretch | Focus on specific workload areas   |
| Theme Switcher           | Stretch | Personalize the interface          |

---

# 💡 What Makes Workload Pulse Different?

Most productivity applications answer:

> **"What do I need to do?"**

Workload Pulse asks a more important question:

> **"Can I realistically handle everything I need to do?"**

That distinction is the heart of the project.

By combining **deadlines + estimated effort + weekly capacity + urgency**, Workload Pulse gives students a workload perspective rather than just another checklist.

---

# 🎓 Designed for the Final-Year Student Reality

A final-year student may have:

```text
📚 Assignment          6 hrs
🧪 Major Project      12 hrs
💼 Placement Prep      8 hrs
💻 DSA Practice        6 hrs
🎯 Interview           4 hrs
📜 Certification       7 hrs
────────────────────────────
Total                 43 hrs
```

If the student's realistic weekly capacity is:

```text
40 hours
```

then the problem is no longer hidden.

**Workload Pulse makes the overload visible.**

And when a deadline is approaching within 48 hours, it makes that urgency impossible to miss.

---

# 🏆 Project Vision

Workload Pulse is built around a simple idea:

> ### **Don't wait for burnout to tell you that you're overloaded.**
>
> ### **See the pressure. Understand the workload. Act early.**

The project aims to evolve from a simple workload tracker into an **intelligent student workload management system** capable of helping students understand not only *what* they need to do, but **when their workload is becoming unrealistic and how they can rebalance it.**

---

# 🤖 AI-Tool Disclosure

This project was developed with assistance from **ChatGPT and AI-assisted coding workflows**.

All team members should read, understand, and be able to explain the files and functionality they are responsible for before presenting or evaluating the project.

---

## ❤️ Built for Students Who Have Too Much to Do

**Workload Pulse**

> **Plan smarter. Spot pressure earlier. Stay in control.**
