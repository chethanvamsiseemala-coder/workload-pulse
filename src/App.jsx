import React from 'react'
import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  LoaderCircle,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  Trash2,
  WifiOff,
  X
} from 'lucide-react';

import { taskApi } from './api';
import './index.css';

const STORAGE_KEY = 'workload-pulse-cache-v1';
const THEME_KEY = 'workload-pulse-theme';
const CAPACITY = 30;

const categories = [
  'All',
  'Academic',
  'Career',
  'Personal'
];

const statuses = [
  'Not Started',
  'In Progress',
  'Completed'
];

const demoSeed = [
  {
    title: 'Capstone architecture review',
    category: 'Academic',
    duedate: '2026-09-12',
    hours: 9,
    status: 'In Progress'
  },
  {
    title: 'Machine learning assignment',
    category: 'Academic',
    duedate: '2026-09-13',
    hours: 8,
    status: 'Not Started'
  },
  {
    title: 'Graduate interview preparation',
    category: 'Career',
    duedate: '2026-09-14',
    hours: 7,
    status: 'Not Started'
  },
  {
    title: 'Portfolio case study polish',
    category: 'Career',
    duedate: '2026-09-15',
    hours: 6,
    status: 'In Progress'
  },
  {
    title: 'System design practice',
    category: 'Career',
    duedate: '2026-09-16',
    hours: 5,
    status: 'Not Started'
  },
  {
    title: 'Weekly recovery planning',
    category: 'Personal',
    duedate: '2026-09-17',
    hours: 3,
    status: 'Completed'
  }
];

const normalizeTask = (task) => ({
  ...task,

  title:
    task.title ??
    task.name ??
    'Untitled task',

  duedate:
    task.duedate ??
    task.dueDate ??
    '',

  hours:
    Number(task.hours ?? 0),

  category:
    task.category ??
    'Academic',

  status:
    typeof task.status === 'boolean'
      ? task.status
        ? 'Completed'
        : 'Not Started'
      : task.status ??
        'Not Started'
});

const toApiTask = (task) => ({
  title: task.title,
  category: task.category,
  duedate: task.duedate,
  hours: Number(task.hours),
  status: task.status
});

const formatDate = (value) => {
  if (!value) return 'No date';

  const date =
    new Date(`${value}T00:00:00`);

  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(
        undefined,
        {
          month: 'short',
          day: 'numeric'
        }
      );
};

const hoursUntil = (value) =>
  Math.round(
    (
      new Date(
        `${value}T23:59:59`
      ).getTime() -
      Date.now()
    ) / 36e5
  );

function App() {

  /* =====================================================
     TASK STATE
     ===================================================== */

  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(
          STORAGE_KEY
        ) || '[]'
      ).map(normalizeTask);
    } catch {
      return [];
    }
  });

  /* =====================================================
     FORM STATE
     ===================================================== */

  const [form, setForm] = useState({
    title: '',
    category: 'Academic',
    duedate: '',
    hours: '',
    status: 'Not Started'
  });

  /* =====================================================
     FILTER STATE
     ===================================================== */

  const [search, setSearch] =
    useState('');

  const [activeCategory, setActiveCategory] =
    useState('All');

  /* =====================================================
     THEME STATE
     ===================================================== */

  const [theme, setTheme] =
    useState(
      () =>
        localStorage.getItem(
          THEME_KEY
        ) || 'light'
    );

  /* =====================================================
     UI STATE
     ===================================================== */

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [actionId, setActionId] =
    useState(null);

  const [error, setError] =
    useState('');

  const [formError, setFormError] =
    useState('');

  /* =====================================================
     AI STATE
     ===================================================== */

  const [showAi, setShowAi] =
    useState(false);

  const [aiLoading, setAiLoading] =
    useState(false);

  const [aiAdvice, setAiAdvice] =
    useState('');

  /* =====================================================
     THEME
     ===================================================== */

  useEffect(() => {
    document.documentElement.dataset.theme =
      theme;

    localStorage.setItem(
      THEME_KEY,
      theme
    );
  }, [theme]);

  /* =====================================================
     SAVE TASKS
     ===================================================== */

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );
  }, [tasks]);

  /* =====================================================
     LOAD TASKS
     ===================================================== */

  const loadTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const data =
        await taskApi.list();

      const normalized =
        (
          Array.isArray(data)
            ? data
            : []
        ).map(normalizeTask);

      setTasks(normalized);

    } catch (err) {

      setError(
        `Could not reach MockAPI. ${err.message}. Showing saved data if available.`
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  /* =====================================================
     WORKLOAD CALCULATIONS
     ===================================================== */

  const activeTasks = useMemo(
    () =>
      tasks.filter(
        (t) =>
          t.status !==
          'Completed'
      ),
    [tasks]
  );

  const completedTasks =
    useMemo(
      () =>
        tasks.filter(
          (t) =>
            t.status ===
            'Completed'
        ),
      [tasks]
    );

  const totalHours =
    useMemo(
      () =>
        activeTasks.reduce(
          (sum, t) =>
            sum +
            Number(
              t.hours || 0
            ),
          0
        ),
      [activeTasks]
    );

  const workloadPercent =
    Math.min(
      Math.round(
        (totalHours /
          CAPACITY) *
          100
      ),
      100
    );

  const completionPercent =
    tasks.length
      ? Math.round(
          (completedTasks.length /
            tasks.length) *
            100
        )
      : 0;

  const overload =
    totalHours > CAPACITY;

  /* =====================================================
     URGENT TASKS
     ===================================================== */

  const urgentTasks =
    useMemo(
      () =>
        tasks
          .filter((task) => {

            if (
              task.status ===
                'Completed' ||
              !task.duedate
            ) {
              return false;
            }

            const h =
              hoursUntil(
                task.duedate
              );

            return (
              h >= -24 &&
              h <= 48
            );
          })
          .sort(
            (a, b) =>
              new Date(
                a.duedate
              ) -
              new Date(
                b.duedate
              )
          ),
      [tasks]
    );

  /* =====================================================
     FILTERED TASKS
     ===================================================== */

  const filteredTasks =
    useMemo(
      () =>
        tasks.filter((task) => {

          const matchesSearch =
            task.title
              .toLowerCase()
              .includes(
                search
                  .trim()
                  .toLowerCase()
              );

          const matchesCategory =
            activeCategory ===
              'All' ||
            task.category ===
              activeCategory;

          return (
            matchesSearch &&
            matchesCategory
          );
        }),
      [
        tasks,
        search,
        activeCategory
      ]
    );

  /* =====================================================
     ADD TASK
     ===================================================== */

  const submitTask = async (
    event
  ) => {

    event.preventDefault();

    if (submitting) return;

    const title =
      form.title.trim();

    const numericHours =
      Number(form.hours);

    if (
      !title ||
      !form.duedate ||
      !form.hours
    ) {

      setFormError(
        'Please complete task name, due date and effort hours.'
      );

      return;
    }

    if (
      title.length > 120
    ) {

      setFormError(
        'Task name must be 120 characters or fewer.'
      );

      return;
    }

    if (
      !Number.isFinite(
        numericHours
      ) ||
      numericHours <= 0 ||
      numericHours > 100
    ) {

      setFormError(
        'Effort must be between 1 and 100 hours.'
      );

      return;
    }

    setSubmitting(true);
    setFormError('');
    setError('');

    const optimistic = {
      ...form,
      title,
      hours: numericHours,
      id: `local-${Date.now()}`
    };

    try {

      const created =
        normalizeTask(
          await taskApi.create(
            toApiTask(
              optimistic
            )
          )
        );

      setTasks(
        (current) => [
          created,
          ...current.filter(
            (t) =>
              t.id !==
              optimistic.id
          )
        ]
      );

      setForm({
        title: '',
        category: 'Academic',
        duedate: '',
        hours: '',
        status: 'Not Started'
      });

    } catch (err) {

      setError(
        `Task was not saved to MockAPI. ${err.message}`
      );

    } finally {

      setSubmitting(false);

    }
  };

  /* =====================================================
     UPDATE STATUS
     ===================================================== */

  const updateStatus = async (
    task,
    status
  ) => {

    setActionId(task.id);
    setError('');

    const updated = {
      ...task,
      status
    };

    setTasks(
      (current) =>
        current.map((t) =>
          t.id === task.id
            ? updated
            : t
        )
    );

    try {

      await taskApi.update(
        task.id,
        toApiTask(updated)
      );

    } catch (err) {

      setTasks(
        (current) =>
          current.map((t) =>
            t.id === task.id
              ? task
              : t
          )
      );

      setError(
        `Status update failed. ${err.message}`
      );

    } finally {

      setActionId(null);

    }
  };

  /* =====================================================
     DELETE TASK
     ===================================================== */

  const deleteTask = async (
    task
  ) => {

    if (
      !window.confirm(
        `Delete “${task.title}”?`
      )
    ) {
      return;
    }

    setActionId(task.id);
    setError('');

    setTasks(
      (current) =>
        current.filter(
          (t) =>
            t.id !== task.id
        )
    );

    try {

      await taskApi.remove(
        task.id
      );

    } catch (err) {

      setTasks(
        (current) => [
          task,
          ...current
        ]
      );

      setError(
        `Delete failed. ${err.message}`
      );

    } finally {

      setActionId(null);

    }
  };

  /* =====================================================
     LOAD DEMO
     ===================================================== */

  const loadDemo = async () => {

    if (submitting) return;

    setSubmitting(true);
    setError('');

    try {

      const created =
        await Promise.all(
          demoSeed.map(
            (task) =>
              taskApi.create(
                task
              )
          )
        );

      setTasks(
        (current) => [
          ...created.map(
            normalizeTask
          ),
          ...current
        ]
      );

    } catch (err) {

      setError(
        `Demo data could not be fully saved. ${err.message}`
      );

    } finally {

      setSubmitting(false);

    }
  };

  /* =====================================================
     GEMINI AI
     ===================================================== */

  const getAiAdvice = async () => {

    setShowAi(true);
    setAiLoading(true);
    setAiAdvice('');

    const prompt =
      `You are a workload coach. Review these student tasks: ${activeTasks
        .map(
          (t) =>
            `${t.title}, ${t.hours}h, due ${t.duedate}`
        )
        .join(
          '; '
        )}. Give exactly two short actionable sentences about what to prioritize or postpone. Weekly total is ${totalHours} hours and safe capacity is ${CAPACITY}.`;

    const key =
      import.meta.env
        .VITE_GEMINI_API_KEY;

    try {

      if (!key) {
        throw new Error(
          'No Gemini key configured'
        );
      }

      const response =
        await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: prompt
                    }
                  ]
                }
              ]
            })
          }
        );

      if (!response.ok) {
        throw new Error(
          'Gemini request failed'
        );
      }

      const data =
        await response.json();

      setAiAdvice(
        data
          ?.candidates?.[0]
          ?.content?.parts?.[0]
          ?.text ||
          'No advice returned.'
      );

    } catch {

      const urgent =
        urgentTasks[0];

      const largest =
        [...activeTasks].sort(
          (a, b) =>
            Number(b.hours) -
            Number(a.hours)
        )[0];

      setAiAdvice(
        `Start with ${
          urgent
            ? `"${urgent.title}" because it is approaching its deadline`
            : 'the task with the nearest deadline'
        }. ${
          largest && overload
            ? `Consider moving or splitting "${largest.title}" (${largest.hours}h) to bring this week closer to the ${CAPACITY}-hour capacity.`
            : 'Keep completed work out of the active workload and finish one high-effort task at a time.'
        }`
      );

    } finally {

      setAiLoading(false);

    }
  };

  /* =====================================================
     UI
     ===================================================== */

  return (
    <div className="app-shell">

      {/* =================================================
          NAVBAR
          ================================================= */}

      <nav className="topbar">

        <div className="brand">

          <div className="brand-icon">
            <Activity size={21} />
          </div>

          <div>

            <h1>
              Workload Pulse
            </h1>

            <p>
              Student workload intelligence
            </p>

          </div>

        </div>

        <div className="nav-actions">

          {/* REFRESH */}

          <button
            className="ghost-btn"
            onClick={loadTasks}
            disabled={loading}
            aria-label="Refresh tasks"
          >

            <RefreshCw
              size={17}
              className={
                loading
                  ? 'spin'
                  : ''
              }
            />

          </button>

          {/* DEMO */}

          <button
            className="demo-btn"
            onClick={loadDemo}
            disabled={submitting}
          >

            {submitting ? (

              <LoaderCircle
                className="spin"
                size={17}
              />

            ) : (

              <Sparkles
                size={17}
              />

            )}

            {' '}

            Load demo

          </button>

          {/* =================================================
              8 THEME SELECTOR
              ================================================= */}

          <select
            className="theme-selector"
            value={theme}
            onChange={(e) =>
              setTheme(
                e.target.value
              )
            }
            aria-label="Choose theme"
          >

            <option value="light">
              ☀️ Light
            </option>

            <option value="dark">
              🌙 Dark
            </option>

            <option value="cyberpunk">
              🟣 Cyberpunk
            </option>

            <option value="crimson">
              🔥 Crimson
            </option>

            <option value="midnight">
              🌌 Midnight
            </option>

            <option value="forest">
              🌲 Forest
            </option>

            <option value="ocean">
              🌊 Ocean
            </option>

            <option value="neon">
              💚 Neon
            </option>

          </select>

        </div>

      </nav>

      {/* =================================================
          MAIN
          ================================================= */}

      <main className="page-wrap">

        {/* =================================================
            HERO
            ================================================= */}

        <section className="hero-panel">

          <div>

            <span className="eyebrow">

              <span className="live-dot" />

              LIVE WORKLOAD SIGNAL

            </span>

            <h2>

              See pressure before it becomes{' '}

              <span>
                burnout.
              </span>

            </h2>

            <p>
              Track deadlines, estimate effort,
              and make faster decisions when your
              semester starts getting overloaded.
            </p>

          </div>

          <div className="hero-metric">

            <span>
              This week
            </span>

            <strong>

              {totalHours}

              <small>
                h
              </small>

            </strong>

            <em>

              {overload
                ? 'Over capacity'
                : `${Math.max(
                    CAPACITY -
                      totalHours,
                    0
                  )}h capacity left`}

            </em>

          </div>

        </section>

        {/* =================================================
            ERROR
            ================================================= */}

        {error && (

          <div className="error-banner">

            <WifiOff size={18} />

            <span>
              {error}
            </span>

            <button
              onClick={() =>
                setError('')
              }
            >

              <X size={17} />

            </button>

          </div>

        )}

        {/* =================================================
            OVERVIEW
            ================================================= */}

        <section className="overview-grid">

          {/* WORKLOAD GAUGE */}

          <article className="panel gauge-panel">

            <div className="panel-heading">

              <div>

                <span className="section-kicker">
                  WEEKLY CAPACITY
                </span>

                <h3>
                  Workload gauge
                </h3>

              </div>

              <span
                className={`risk-pill ${
                  overload
                    ? 'risk-high'
                    : totalHours > 22
                    ? 'risk-medium'
                    : 'risk-low'
                }`}
              >

                {overload
                  ? 'High risk'
                  : totalHours > 22
                  ? 'Watch closely'
                  : 'Balanced'}

              </span>

            </div>

            <div
              className="gauge"
              style={{
                '--value': `${workloadPercent * 3.6}deg`
              }}
            >

              <div className="gauge-inner">

                <strong>
                  {totalHours}
                </strong>

                <span>
                  / {CAPACITY} hours
                </span>

              </div>

            </div>

            <div className="gauge-caption">

              <span>
                Active tasks only
              </span>

              <span>
                {workloadPercent}% capacity used
              </span>

            </div>

          </article>

          {/* SYSTEM STATUS */}

          <article className="panel status-panel">

            <div className="panel-heading">

              <div>

                <span className="section-kicker">
                  SYSTEM STATUS
                </span>

                <h3>

                  {overload
                    ? 'Workload needs attention'
                    : 'Workload is under control'}

                </h3>

              </div>

              <Activity
                className={
                  overload
                    ? 'danger-icon'
                    : 'success-icon'
                }
                size={25}
              />

            </div>

            <div
              className={`status-message ${
                overload
                  ? 'danger'
                  : 'success'
              }`}
            >

              <AlertTriangle
                size={21}
              />

              <div>

                <strong>

                  {overload
                    ? `Over capacity by ${
                        totalHours -
                        CAPACITY
                      } hours`
                    : 'Workload balanced'}

                </strong>

                <p>

                  {overload
                    ? 'Reduce, split, or reschedule lower-priority work.'
                    : 'You are currently inside your recommended weekly limit.'}

                </p>

              </div>

            </div>

            <div className="stat-row">

              <div>

                <span>
                  Active
                </span>

                <strong>
                  {activeTasks.length}
                </strong>

              </div>

              <div>

                <span>
                  Completed
                </span>

                <strong>
                  {completedTasks.length}
                </strong>

              </div>

              <div>

                <span>
                  Completion
                </span>

                <strong>
                  {completionPercent}%
                </strong>

              </div>

            </div>

          </article>

        </section>

        {/* =================================================
            FORM + URGENT
            ================================================= */}

        <section className="content-grid">

          {/* ADD TASK */}

          <article className="panel form-panel">

            <div className="panel-heading">

              <div>

                <span className="section-kicker">
                  INPUT ENGINE
                </span>

                <h3>
                  Add a deadline
                </h3>

                <p>
                  Capture effort before the week captures you.
                </p>

              </div>

              <div className="icon-badge">
                <Plus size={20} />
              </div>

            </div>

            <form
              onSubmit={submitTask}
            >

              <label>

                Task name

                <input
                  value={form.title}
                  maxLength="120"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title:
                        e.target.value
                    })
                  }
                  placeholder="e.g. Capstone presentation"
                />

              </label>

              <div className="two-col">

                <label>

                  Category

                  <select
                    value={
                      form.category
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category:
                          e.target.value
                      })
                    }
                  >

                    <option>
                      Academic
                    </option>

                    <option>
                      Career
                    </option>

                    <option>
                      Personal
                    </option>

                  </select>

                </label>

                <label>

                  Effort (hours)

                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={
                      form.hours
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        hours:
                          e.target.value
                      })
                    }
                    placeholder="6"
                  />

                </label>

              </div>

              <div className="two-col">

                <label>

                  Due date

                  <input
                    type="date"
                    value={
                      form.duedate
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        duedate:
                          e.target.value
                      })
                    }
                  />

                </label>

                <label>

                  Initial status

                  <select
                    value={
                      form.status
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status:
                          e.target.value
                      })
                    }
                  >

                    {statuses.map(
                      (s) => (
                        <option
                          key={s}
                        >
                          {s}
                        </option>
                      )
                    )}

                  </select>

                </label>

              </div>

              {formError && (

                <p className="form-error">
                  {formError}
                </p>

              )}

              <button
                className="primary-btn"
                type="submit"
                disabled={submitting}
              >

                {submitting ? (

                  <>
                    <LoaderCircle
                      size={18}
                      className="spin"
                    />

                    {' '}

                    Saving task…

                  </>

                ) : (

                  <>
                    <Plus size={18} />

                    {' '}

                    Add task

                  </>

                )}

              </button>

            </form>

          </article>

          {/* URGENT TASKS */}

          <article className="panel urgent-panel">

            <div className="panel-heading">

              <div>

                <span className="section-kicker">
                  48-HOUR SPOTLIGHT
                </span>

                <h3>
                  Urgent deadlines
                </h3>

                <p>
                  Active tasks approaching within two days.
                </p>

              </div>

              <Clock3 size={23} />

            </div>

            {loading ? (

              <div className="skeleton-list">

                {[1, 2, 3].map(
                  (i) => (

                    <div
                      className="skeleton"
                      key={i}
                    />

                  )
                )}

              </div>

            ) : urgentTasks.length === 0 ? (

              <div className="empty-spotlight">

                <CheckCircle2
                  size={34}
                />

                <strong>
                  All caught up!
                </strong>

                <span>
                  No active deadlines in the next 48 hours.
                </span>

              </div>

            ) : (

              <div className="urgent-list">

                {urgentTasks
                  .slice(0, 4)
                  .map(
                    (task) => (

                      <div
                        className="urgent-item"
                        key={task.id}
                      >

                        <div>

                          <strong>
                            {task.title}
                          </strong>

                          <span>

                            <CalendarDays
                              size={14}
                            />

                            {' '}

                            {formatDate(
                              task.duedate
                            )}

                            {' · '}

                            {task.hours}h

                          </span>

                        </div>

                        <button
                          disabled={
                            actionId ===
                            task.id
                          }
                          onClick={() =>
                            updateStatus(
                              task,
                              'Completed'
                            )
                          }
                        >

                          {actionId ===
                          task.id ? (

                            <LoaderCircle
                              size={16}
                              className="spin"
                            />

                          ) : (

                            'Done'

                          )}

                        </button>

                      </div>

                    )
                  )}

              </div>

            )}

          </article>

        </section>

        {/* =================================================
            TASK LEDGER
            ================================================= */}

        <section className="panel ledger-panel">

          <div className="ledger-top">

            <div>

              <span className="section-kicker">
                LIVE TASK LEDGER
              </span>

              <h3>
                Everything in one place
              </h3>

              <p>
                Real async CRUD backed by MockAPI.
              </p>

            </div>

            <div className="search-wrap">

              <Search size={18} />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search tasks"
              />

            </div>

          </div>

          <div className="filter-row">

            {categories.map(
              (category) => (

                <button
                  key={category}
                  className={
                    activeCategory ===
                    category
                      ? 'active-filter'
                      : ''
                  }
                  onClick={() =>
                    setActiveCategory(
                      category
                    )
                  }
                >

                  {category}

                </button>

              )
            )}

          </div>

          {loading ? (

            <div className="table-skeleton">

              {[1, 2, 3, 4].map(
                (i) => (

                  <div
                    className="skeleton row"
                    key={i}
                  />

                )
              )}

            </div>

          ) : filteredTasks.length === 0 ? (

            <div className="empty-ledger">

              <Search size={32} />

              <h4>
                No matching tasks
              </h4>

              <p>
                Try another search or add a new deadline.
              </p>

              <button
                className="text-btn"
                onClick={() => {

                  setSearch('');

                  setActiveCategory(
                    'All'
                  );

                }}
              >

                Clear filters

                {' '}

                <ChevronRight
                  size={16}
                />

              </button>

            </div>

          ) : (

            <div className="table-wrap">

              <table>

                <thead>

                  <tr>

                    <th>
                      Task
                    </th>

                    <th>
                      Category
                    </th>

                    <th>
                      Due
                    </th>

                    <th>
                      Hours
                    </th>

                    <th>
                      Status
                    </th>

                    <th />

                  </tr>

                </thead>

                <tbody>

                  {filteredTasks.map(
                    (task) => (

                      <tr
                        key={task.id}
                      >

                        <td>

                          <strong className="truncate">
                            {task.title}
                          </strong>

                        </td>

                        <td>

                          <span
                            className={`category-tag ${task.category.toLowerCase()}`}
                          >

                            {task.category}

                          </span>

                        </td>

                        <td>

                          {formatDate(
                            task.duedate
                          )}

                        </td>

                        <td>

                          {task.hours}h

                        </td>

                        <td>

                          <select
                            value={
                              task.status
                            }
                            disabled={
                              actionId ===
                              task.id
                            }
                            onChange={(e) =>
                              updateStatus(
                                task,
                                e.target.value
                              )
                            }
                          >

                            {statuses.map(
                              (s) => (

                                <option
                                  key={s}
                                >
                                  {s}
                                </option>

                              )
                            )}

                          </select>

                        </td>

                        <td>

                          <button
                            className="delete-btn"
                            disabled={
                              actionId ===
                              task.id
                            }
                            onClick={() =>
                              deleteTask(
                                task
                              )
                            }
                            aria-label={`Delete ${task.title}`}
                          >

                            {actionId ===
                            task.id ? (

                              <LoaderCircle
                                size={17}
                                className="spin"
                              />

                            ) : (

                              <Trash2
                                size={17}
                              />

                            )}

                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

        {/* =================================================
            AI FEATURE
            ================================================= */}

        <section className="ai-card">

          <div className="ai-copy">

            <div className="ai-icon">

              <BrainCircuit
                size={24}
              />

            </div>

            <div>

              <span className="section-kicker">
                STRETCH FEATURE · GEMINI AI
              </span>

              <h3>
                Re-balance your week
              </h3>

              <p>
                Get a concise prioritisation suggestion from Gemini when configured, with a resilient local fallback for the demo.
              </p>

            </div>

          </div>

          <button
            className="ai-btn"
            onClick={getAiAdvice}
            disabled={aiLoading}
          >

            {aiLoading ? (

              <LoaderCircle
                className="spin"
                size={18}
              />

            ) : (

              <Sparkles
                size={18}
              />

            )}

            {' '}

            Get AI advice

            {' '}

            <ArrowUpRight
              size={17}
            />

          </button>

        </section>

      </main>

      {/* =================================================
          AI MODAL
          ================================================= */}

      {showAi && (

        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() =>
            setShowAi(false)
          }
        >

          <section
            className="ai-modal"
            role="dialog"
            aria-modal="true"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setShowAi(false)
              }
            >

              <X size={19} />

            </button>

            <div className="ai-icon">

              <BrainCircuit
                size={26}
              />

            </div>

            <span className="section-kicker">
              WORKLOAD STRATEGIST
            </span>

            <h3>
              Your re-balance plan
            </h3>

            {aiLoading ? (

              <div className="modal-loading">

                <LoaderCircle
                  className="spin"
                />

                {' '}

                Thinking through your workload…

              </div>

            ) : (

              <p>
                {aiAdvice}
              </p>

            )}

          </section>

        </div>

      )}

    </div>
  );
}

export default App;