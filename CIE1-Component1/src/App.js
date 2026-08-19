import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

   /*NAVIGATION*/
   
function Navigation({
  activePage,
  setActivePage,
  darkMode,
  setDarkMode,
}) {
  const items = [
    ["dashboard", "Dashboard"],
    ["tasks", "Task Manager"],
    ["timer", "Study Timer"],
    ["notes", "Notes"],
    ["subjects", "Subjects"],
    ["progress", "Progress"],
    ["feedback", "Feedback"],
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">S</div>

        <div>
          <h1>StudyMate</h1>
          <span>Student Productivity Hub</span>
        </div>
      </div>

      <nav className="navigation">
        {items.map(([page, label]) => (
          <button
            key={page}
            className={
              activePage === page ? "nav-item active" : "nav-item"
            }
            onClick={() => setActivePage(page)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button
          className="theme-button"
          onClick={() => setDarkMode((previous) => !previous)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <div className="student-card">
          <div className="student-avatar">S</div>

          <div>
            <strong>Student</strong>
            <small>Keep learning!</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* DASHBOARD */

function Dashboard({
  tasks,
  completedTasks,
  taskProgress,
  averageSubjectProgress,
  totalProgress,
  studySessions,
  setActivePage,
  toggleTask,
}) {
  return (
    <>
      <div className="welcome-section">
        <div>
          <p className="eyebrow">WELCOME BACK</p>


          <p>
            Organize your studies, manage your tasks and keep track
            of your progress.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setActivePage("tasks")}
        >
          + Add a Task
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">T</div>

          <div>
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">C</div>

          <div>
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">S</div>

          <div>
            <span>Study Sessions</span>
            <strong>{studySessions}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">P</div>

          <div>
            <span>Overall Progress</span>
            <strong>{totalProgress}%</strong>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="content-card">
          <div className="card-header">
            <div>
              <h3>Today's Tasks</h3>
              <p>Stay on top of your work</p>
            </div>

            <button
              className="text-button"
              onClick={() => setActivePage("tasks")}
            >
              View All
            </button>
          </div>

          <div className="task-list">
            {tasks.slice(0, 5).map((task) => (
              <div
                className={
                  task.completed ? "task-row completed" : "task-row"
                }
                key={task.id}
              >
                <button
                  className="check-button"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "✓" : ""}
                </button>

                <div className="task-information">
                  <strong>{task.title}</strong>
                  <span>{task.subject}</span>
                </div>

                <span
                  className={`priority ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>
              </div>
            ))}

            {tasks.length === 0 && (
              <div className="empty-state">
                <p>No tasks yet. Add your first task!</p>
              </div>
            )}
          </div>
        </section>

        <section className="content-card progress-card">
          <div className="card-header">
            <div>
              <h3>Study Progress</h3>
              <p>Your current performance</p>
            </div>
          </div>

          <div className="large-progress">
            <div
              className="progress-circle"
              style={{
                "--progress": `${totalProgress * 3.6}deg`,
              }}
            >
              <div>
                <strong>{totalProgress}%</strong>
                <span>Complete</span>
              </div>
            </div>
          </div>

          <div className="progress-summary">
            <div>
              <span>Tasks</span>
              <strong>{taskProgress}%</strong>
            </div>

            <div>
              <span>Subjects</span>
              <strong>{averageSubjectProgress}%</strong>
            </div>
          </div>
        </section>
      </div>

      <section className="content-card quick-tools">
        <div className="card-header">
          <div>
            <h3>Quick Tools</h3>
            <p>Everything you need to study effectively</p>
          </div>
        </div>

        <div className="tools-grid">
          <button onClick={() => setActivePage("timer")}>
            <span>Timer</span>
            <strong>Study Timer</strong>
            <small>Focus with timed sessions</small>
          </button>

          <button onClick={() => setActivePage("notes")}>
            <span>Notes</span>
            <strong>Quick Notes</strong>
            <small>Save important information</small>
          </button>

          <button onClick={() => setActivePage("subjects")}>
            <span>Subjects</span>
            <strong>Subject Planner</strong>
            <small>Manage your study goals</small>
          </button>

          <button onClick={() => setActivePage("progress")}>
            <span>Progress</span>
            <strong>Progress Tracker</strong>
            <small>See your achievements</small>
          </button>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   TASK PAGE
   ========================================================= */

function TaskPage({
  tasks,
  completedTasks,
  taskTitle,
  setTaskTitle,
  taskSubject,
  setTaskSubject,
  taskPriority,
  setTaskPriority,
  addTask,
  toggleTask,
  deleteTask,
}) {
  return (
    <div className="page-layout">
      <section className="content-card">
        <div className="card-header">
          <div>
            <h3>Add New Task</h3>
            <p>Create a task and organize your study work.</p>
          </div>
        </div>

        <form className="form-grid" onSubmit={addTask}>
          <div className="form-group full">
            <label>Task Name</label>

            <input
              type="text"
              value={taskTitle}
              onChange={(event) =>
                setTaskTitle(event.target.value)
              }
              placeholder="e.g. Complete JavaScript assignment"
            />
          </div>

          <div className="form-group">
            <label>Subject</label>

            <input
              type="text"
              value={taskSubject}
              onChange={(event) =>
                setTaskSubject(event.target.value)
              }
              placeholder="e.g. Web Development"
            />
          </div>

          <div className="form-group">
            <label>Priority</label>

            <select
              value={taskPriority}
              onChange={(event) =>
                setTaskPriority(event.target.value)
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <button className="primary-button full" type="submit">
            Add Task
          </button>
        </form>
      </section>

      <section className="content-card">
        <div className="card-header">
          <div>
            <h3>Your Tasks</h3>

            <p>
              {completedTasks} of {tasks.length} tasks completed
            </p>
          </div>
        </div>

        <div className="task-list detailed">
          {tasks.map((task) => (
            <div
              className={
                task.completed ? "task-row completed" : "task-row"
              }
              key={task.id}
            >
              <button
                className="check-button"
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? "✓" : ""}
              </button>

              <div className="task-information">
                <strong>{task.title}</strong>
                <span>{task.subject}</span>
              </div>

              <span
                className={`priority ${task.priority.toLowerCase()}`}
              >
                {task.priority}
              </span>

              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="empty-state">
              <p>No tasks available.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   TIMER PAGE
   ========================================================= */

function TimerPage({
  formattedTime,
  timerRunning,
  studySessions,
  startTimer,
  pauseTimer,
  resetTimer,
  changeTimerDuration,
}) {
  return (
    <div className="timer-page">
      <section className="content-card timer-card">
        <p className="eyebrow">FOCUS SESSION</p>

        <h3>Study Timer</h3>

        <p>
          Use focused sessions to improve your productivity.
        </p>

        <div className="timer-display">
          {formattedTime}
        </div>

        <div className="timer-buttons">
          {!timerRunning ? (
            <button
              className="primary-button"
              onClick={startTimer}
            >
              Start
            </button>
          ) : (
            <button
              className="secondary-button"
              onClick={pauseTimer}
            >
              Pause
            </button>
          )}

          <button
            className="secondary-button"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>

        <div className="timer-options">
          <button onClick={() => changeTimerDuration(15)}>
            15 min
          </button>

          <button onClick={() => changeTimerDuration(25)}>
            25 min
          </button>

          <button onClick={() => changeTimerDuration(45)}>
            45 min
          </button>

          <button onClick={() => changeTimerDuration(60)}>
            60 min
          </button>
        </div>

        <div className="session-info">
          <span>Completed study sessions</span>

          <strong>{studySessions}</strong>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   NOTES PAGE
   ========================================================= */

function NotesPage({
  notes,
  noteTitle,
  setNoteTitle,
  noteContent,
  setNoteContent,
  addNote,
  deleteNote,
}) {
  return (
    <div className="page-layout">
      <section className="content-card">
        <div className="card-header">
          <div>
            <h3>Create a Note</h3>
            <p>Save important study information.</p>
          </div>
        </div>

        <form className="form-grid" onSubmit={addNote}>
          <div className="form-group full">
            <label>Note Title</label>

            <input
              type="text"
              value={noteTitle}
              onChange={(event) =>
                setNoteTitle(event.target.value)
              }
              placeholder="e.g. JavaScript Important Concepts"
            />
          </div>

          <div className="form-group full">
            <label>Note Content</label>

            <textarea
              value={noteContent}
              onChange={(event) =>
                setNoteContent(event.target.value)
              }
              placeholder="Write your notes here..."
              rows="6"
            />
          </div>

          <button className="primary-button full" type="submit">
            Save Note
          </button>
        </form>
      </section>

      <section className="notes-grid">
        {notes.map((note) => (
          <article className="note-card" key={note.id}>
            <div className="note-top">
              <span>Note</span>

              <button
                className="delete-button"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </div>

            <h3>{note.title}</h3>

            <p>{note.content}</p>
          </article>
        ))}

        {notes.length === 0 && (
          <div className="empty-state">
            <p>No notes created yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}

/* =========================================================
   SUBJECT PAGE
   ========================================================= */

function SubjectsPage({
  subjects,
  subjectName,
  setSubjectName,
  addSubject,
  updateSubjectProgress,
  deleteSubject,
}) {
  return (
    <div className="page-layout">
      <section className="content-card">
        <div className="card-header">
          <div>
            <h3>Add Subject</h3>

            <p>
              Create subjects and track your learning progress.
            </p>
          </div>
        </div>

        <form className="inline-form" onSubmit={addSubject}>
          <input
            type="text"
            value={subjectName}
            onChange={(event) =>
              setSubjectName(event.target.value)
            }
            placeholder="Enter subject name"
          />

          <button className="primary-button" type="submit">
            + Add Subject
          </button>
        </form>
      </section>

      <section className="subject-grid">
        {subjects.map((subject) => (
          <div className="subject-card" key={subject.id}>
            <div className="subject-header">
              <div className="subject-icon">Subject</div>

              <button
                className="delete-button"
                onClick={() => deleteSubject(subject.id)}
              >
                Delete
              </button>
            </div>

            <h3>{subject.name}</h3>

            <div className="progress-label">
              <span>Progress</span>

              <strong>{subject.progress}%</strong>
            </div>

            <div className="progress-bar">
              <div
                style={{
                  width: `${subject.progress}%`,
                }}
              />
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={subject.progress}
              onChange={(event) =>
                updateSubjectProgress(
                  subject.id,
                  event.target.value
                )
              }
            />
          </div>
        ))}
      </section>
    </div>
  );
}

/* =========================================================
   PROGRESS PAGE
   ========================================================= */

function ProgressPage({
  totalProgress,
  taskProgress,
  averageSubjectProgress,
  studySessions,
  subjects,
}) {
  return (
    <div className="page-layout">
      <section className="content-card progress-overview">
        <div>
          <p className="eyebrow">YOUR PERFORMANCE</p>

          <h3>Overall Study Progress</h3>

          <p>
            Keep working consistently and track your improvement
            over time.
          </p>
        </div>

        <div className="overview-number">
          {totalProgress}%
        </div>
      </section>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon green">T</div>

          <div>
            <span>Task Completion</span>
            <strong>{taskProgress}%</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">S</div>

          <div>
            <span>Subject Progress</span>
            <strong>{averageSubjectProgress}%</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">S</div>

          <div>
            <span>Study Sessions</span>
            <strong>{studySessions}</strong>
          </div>
        </div>
      </div>

      <section className="content-card">
        <div className="card-header">
          <div>
            <h3>Subject Progress</h3>

            <p>
              Your current learning progress by subject.
            </p>
          </div>
        </div>

        <div className="progress-list">
          {subjects.map((subject) => (
            <div className="progress-item" key={subject.id}>
              <div className="progress-label">
                <span>{subject.name}</span>

                <strong>{subject.progress}%</strong>
              </div>

              <div className="progress-bar large">
                <div
                  style={{
                    width: `${subject.progress}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   FEEDBACK PAGE
   ========================================================= */

function FeedbackPage({
  feedback,
  feedbackSent,
  handleFeedbackChange,
  submitFeedback,
  setFeedbackSent,
}) {
  return (
    <div className="feedback-layout">
      <section className="content-card feedback-intro">
        <p className="eyebrow">GET IN TOUCH</p>

        <h3>We'd love to hear from you.</h3>

        <p>
          Have a suggestion, question or feedback about StudyMate?
          Send us a message using the form.
        </p>

        <div className="contact-info">
          <div>
            <span>Email</span>

            <div>
              <strong>Email</strong>

              <p>hello@studymate.com</p>
            </div>
          </div>

          <div>
            <span>Ideas</span>

            <div>
              <strong>Suggestions</strong>

              <p>Help us improve the platform.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-card">
        {feedbackSent ? (
          <div className="success-message">
            <div>Success</div>

            <h3>Thank you!</h3>

            <p>
              Your feedback has been submitted successfully.
            </p>

            <button
              className="primary-button"
              onClick={() => setFeedbackSent(false)}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <>
            <div className="card-header">
              <div>
                <h3>Contact Form</h3>

                <p>Fill in the form below.</p>
              </div>
            </div>

            <form
              className="form-grid"
              onSubmit={submitFeedback}
            >
              <div className="form-group">
                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  value={feedback.name}
                  onChange={handleFeedbackChange}
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={feedback.email}
                  onChange={handleFeedbackChange}
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-group full">
                <label>Message</label>

                <textarea
                  name="message"
                  value={feedback.message}
                  onChange={handleFeedbackChange}
                  placeholder="Write your message..."
                  rows="7"
                />
              </div>

              <button
                className="primary-button full"
                type="submit"
              >
                Send Feedback
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

/* =========================================================
   MAIN APP
   ========================================================= */

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  /* -------------------------
     TASKS
     ------------------------- */

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("studymate_tasks");

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Complete HTML assignment",
            subject: "Web Development",
            priority: "High",
            completed: false,
          },
          {
            id: 2,
            title: "Review JavaScript concepts",
            subject: "Programming",
            priority: "Medium",
            completed: true,
          },
        ];
  });

  const [taskTitle, setTaskTitle] = useState("");
  const [taskSubject, setTaskSubject] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");

  /* -------------------------
     NOTES
     ------------------------- */

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("studymate_notes");

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "JavaScript Notes",
            content:
              "Variables, functions, events and DOM manipulation are important JavaScript concepts.",
          },
        ];
  });

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  /* -------------------------
     SUBJECTS
     ------------------------- */

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("studymate_subjects");

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Web Development",
            progress: 75,
          },
          {
            id: 2,
            name: "Programming",
            progress: 60,
          },
          {
            id: 3,
            name: "Database Systems",
            progress: 45,
          },
        ];
  });

  const [subjectName, setSubjectName] = useState("");

  /* -------------------------
     TIMER
     ------------------------- */

  const [timerMinutes, setTimerMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  const [studySessions, setStudySessions] = useState(() => {
    return (
      Number(localStorage.getItem("studymate_sessions")) || 0
    );
  });

  /* -------------------------
     FEEDBACK
     ------------------------- */

  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [feedbackSent, setFeedbackSent] = useState(false);

  /* -------------------------
     LOCAL STORAGE
     ------------------------- */

  useEffect(() => {
    localStorage.setItem(
      "studymate_tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(
      "studymate_notes",
      JSON.stringify(notes)
    );
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(
      "studymate_subjects",
      JSON.stringify(subjects)
    );
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem(
      "studymate_sessions",
      studySessions
    );
  }, [studySessions]);

  /* -------------------------
     TIMER LOGIC
     ------------------------- */

  useEffect(() => {
    if (!timerRunning) {
      return undefined;
    }

    if (secondsLeft === 0) {
      setTimerRunning(false);

      setStudySessions(
        (previous) => previous + 1
      );

      alert(
        "Study session completed! Great work!"
      );

      return undefined;
    }

    const timer = setInterval(() => {
      setSecondsLeft(
        (previous) => previous - 1
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [timerRunning, secondsLeft]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(
      secondsLeft / 60
    );

    const seconds = secondsLeft % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }, [secondsLeft]);

  /* -------------------------
     TASK FUNCTIONS
     ------------------------- */

  const addTask = (event) => {
    event.preventDefault();

    if (!taskTitle.trim()) {
      alert("Please enter a task.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle.trim(),
      subject:
        taskSubject.trim() || "General",
      priority: taskPriority,
      completed: false,
    };

    setTasks((previous) => [
      newTask,
      ...previous,
    ]);

    setTaskTitle("");
    setTaskSubject("");
    setTaskPriority("Medium");
  };

  const toggleTask = (id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((previous) =>
      previous.filter(
        (task) => task.id !== id
      )
    );
  };

  /* -------------------------
     NOTE FUNCTIONS
     ------------------------- */

  const addNote = (event) => {
    event.preventDefault();

    if (
      !noteTitle.trim() ||
      !noteContent.trim()
    ) {
      alert(
        "Please enter both a title and note."
      );

      return;
    }

    const newNote = {
      id: Date.now(),
      title: noteTitle.trim(),
      content: noteContent.trim(),
    };

    setNotes((previous) => [
      newNote,
      ...previous,
    ]);

    setNoteTitle("");
    setNoteContent("");
  };

  const deleteNote = (id) => {
    setNotes((previous) =>
      previous.filter(
        (note) => note.id !== id
      )
    );
  };

  /* -------------------------
     SUBJECT FUNCTIONS
     ------------------------- */

  const addSubject = (event) => {
    event.preventDefault();

    if (!subjectName.trim()) {
      alert("Please enter a subject name.");
      return;
    }

    const newSubject = {
      id: Date.now(),
      name: subjectName.trim(),
      progress: 0,
    };

    setSubjects((previous) => [
      ...previous,
      newSubject,
    ]);

    setSubjectName("");
  };

  const updateSubjectProgress = (
    id,
    progress
  ) => {
    setSubjects((previous) =>
      previous.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              progress: Number(progress),
            }
          : subject
      )
    );
  };

  const deleteSubject = (id) => {
    setSubjects((previous) =>
      previous.filter(
        (subject) =>
          subject.id !== id
      )
    );
  };

  /* -------------------------
     TIMER FUNCTIONS
     ------------------------- */

  const startTimer = () => {
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimerRunning(false);

    setSecondsLeft(
      timerMinutes * 60
    );
  };

  const changeTimerDuration = (
    minutes
  ) => {
    setTimerMinutes(minutes);

    setSecondsLeft(
      minutes * 60
    );

    setTimerRunning(false);
  };

  /* -------------------------
     FEEDBACK FUNCTIONS
     ------------------------- */

  const handleFeedbackChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFeedback(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  const submitFeedback = (
    event
  ) => {
    event.preventDefault();

    if (
      !feedback.name.trim() ||
      !feedback.email.trim() ||
      !feedback.message.trim()
    ) {
      alert(
        "Please complete all fields."
      );

      return;
    }

    setFeedbackSent(true);

    setFeedback({
      name: "",
      email: "",
      message: "",
    });
  };

  /* -------------------------
     STATISTICS
     ------------------------- */

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const taskProgress =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks /
            tasks.length) *
            100
        );

  const averageSubjectProgress =
    subjects.length === 0
      ? 0
      : Math.round(
          subjects.reduce(
            (total, subject) =>
              total +
              subject.progress,
            0
          ) / subjects.length
        );

  const totalProgress =
    Math.round(
      (taskProgress +
        averageSubjectProgress) /
        2
    );

  /* -------------------------
     PAGE TITLES
     ------------------------- */

  const pageTitles = {
    dashboard: "Dashboard",
    tasks: "Task Manager",
    timer: "Study Timer",
    notes: "My Notes",
    subjects: "Subject Planner",
    progress: "Progress Tracker",
    feedback: "Contact & Feedback",
  };

  /* -------------------------
     PAGE RENDERING
     ------------------------- */

  const renderPage = () => {
    switch (activePage) {
      case "tasks":
        return (
          <TaskPage
            tasks={tasks}
            completedTasks={
              completedTasks
            }
            taskTitle={taskTitle}
            setTaskTitle={
              setTaskTitle
            }
            taskSubject={
              taskSubject
            }
            setTaskSubject={
              setTaskSubject
            }
            taskPriority={
              taskPriority
            }
            setTaskPriority={
              setTaskPriority
            }
            addTask={addTask}
            toggleTask={
              toggleTask
            }
            deleteTask={
              deleteTask
            }
          />
        );

      case "timer":
        return (
          <TimerPage
            formattedTime={
              formattedTime
            }
            timerRunning={
              timerRunning
            }
            studySessions={
              studySessions
            }
            startTimer={
              startTimer
            }
            pauseTimer={
              pauseTimer
            }
            resetTimer={
              resetTimer
            }
            changeTimerDuration={
              changeTimerDuration
            }
          />
        );

      case "notes":
        return (
          <NotesPage
            notes={notes}
            noteTitle={noteTitle}
            setNoteTitle={
              setNoteTitle
            }
            noteContent={
              noteContent
            }
            setNoteContent={
              setNoteContent
            }
            addNote={addNote}
            deleteNote={
              deleteNote
            }
          />
        );

      case "subjects":
        return (
          <SubjectsPage
            subjects={subjects}
            subjectName={
              subjectName
            }
            setSubjectName={
              setSubjectName
            }
            addSubject={
              addSubject
            }
            updateSubjectProgress={
              updateSubjectProgress
            }
            deleteSubject={
              deleteSubject
            }
          />
        );

      case "progress":
        return (
          <ProgressPage
            totalProgress={
              totalProgress
            }
            taskProgress={
              taskProgress
            }
            averageSubjectProgress={
              averageSubjectProgress
            }
            studySessions={
              studySessions
            }
            subjects={
              subjects
            }
          />
        );

      case "feedback":
        return (
          <FeedbackPage
            feedback={feedback}
            feedbackSent={
              feedbackSent
            }
            handleFeedbackChange={
              handleFeedbackChange
            }
            submitFeedback={
              submitFeedback
            }
            setFeedbackSent={
              setFeedbackSent
            }
          />
        );

      default:
        return (
          <Dashboard
            tasks={tasks}
            completedTasks={
              completedTasks
            }
            taskProgress={
              taskProgress
            }
            averageSubjectProgress={
              averageSubjectProgress
            }
            totalProgress={
              totalProgress
            }
            studySessions={
              studySessions
            }
            setActivePage={
              setActivePage
            }
            toggleTask={
              toggleTask
            }
          />
        );
    }
  };

  /* -------------------------
     MAIN RETURN
     ------------------------- */

  return (
    <div
      className={
        darkMode
          ? "app dark"
          : "app"
      }
    >
      <Navigation
        activePage={
          activePage
        }
        setActivePage={
          setActivePage
        }
        darkMode={
          darkMode
        }
        setDarkMode={
          setDarkMode
        }
      />

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="breadcrumb">
              StudyMate /
            </span>

            <strong>
              {pageTitles[
                activePage
              ]}
            </strong>
          </div>

          <div className="topbar-right">
            <span className="today-date">
              {new Date().toLocaleDateString(
                "en-IN",
                {
                  weekday:
                    "long",
                  day: "numeric",
                  month:
                    "long",
                  year: "numeric",
                }
              )}
            </span>

            <button
              className="mobile-theme-button"
              onClick={() =>
                setDarkMode(
                  (previous) =>
                    !previous
                )
              }
            >
              {darkMode
                ? "Light"
                : "Dark"}
            </button>
          </div>
        </header>

        <div className="page-content">
          {renderPage()}
        </div>

        <footer>
          <p>
             2026 StudyMate • Built
            with HTML, CSS & JavaScript
            concepts
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;