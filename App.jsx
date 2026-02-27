import { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import TaskList from "./components/TaskList";
import "./App.css";

const TIME_ZONES = [
  { label: "Lokalna", value: "local" },
  { label: "Warszawa", value: "Europe/Warsaw" },
  { label: "Nowy Jork", value: "America/New_York" },
  { label: "Tokio", value: "Asia/Tokyo" },
];

const REPO_URL = "https://github.com/Matix870/my-frist-react-app-todo-list";

function App() {
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [tasks, setTasks] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#00ff59");
  const [bgImage, setBgImage] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeZone, setSelectedTimeZone] = useState("local");

  const [avatarImage, setAvatarImage] = useState(null);
  const [username, setUsername] = useState("Uzytkownik");
  const [status, setStatus] = useState("");

  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date, timeZone) => {
    try {
      return date.toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone,
      });
    } catch {
      return date.toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    }
  };

  const handleBgUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setBgImage(reader.result);
      setIsFocusMode(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setAvatarImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const addTask = (taskText, taskDescription = "", taskEmoji = "") => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: taskText,
        description: taskDescription,
        emoji: taskEmoji,
        completed: false,
        color: selectedColor,
      },
    ]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const toggleFocusMode = () => {
    setIsFocusMode((prev) => {
      const next = !prev;
      if (next) {
        setBgImage(null);
      }
      return next;
    });
  };

  const displayTimeZone =
    selectedTimeZone === "local" ? localTimeZone : selectedTimeZone;
  const selectedZoneLabel =
    TIME_ZONES.find((zone) => zone.value === selectedTimeZone)?.label ||
    selectedTimeZone;

  return (
    <div
      className="app-shell"
      style={
        bgImage && !isFocusMode
          ? {
              backgroundImage: `url(${bgImage})`,
            }
          : undefined
      }
    >
      <div className="background-overlay" />

      {!isFocusMode && (
        <aside className="profile-card">
          <label className="avatar-upload" htmlFor="avatar-input">
            {avatarImage ? (
              <img src={avatarImage} alt="Avatar" className="avatar-image" />
            ) : (
              <span>+</span>
            )}
          </label>
          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            hidden
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="profile-input"
            placeholder="Nazwa uzytkownika"
          />
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="profile-input"
            placeholder="Status (opcjonalnie)"
          />
        </aside>
      )}

      <main className="main-card">
        <h1 className="title">Lista zadan</h1>

        <div className="top-controls">
          <div>
            <label className="control-label" htmlFor="bg-upload">
              Tlo (obraz):
            </label>
            <input
              id="bg-upload"
              type="file"
              accept="image/*"
              onChange={handleBgUpload}
              className="control-input"
            />
          </div>

          <div>
            <label className="control-label" htmlFor="timezone-select">
              Strefa czasowa:
            </label>
            <select
              id="timezone-select"
              value={selectedTimeZone}
              onChange={(e) => setSelectedTimeZone(e.target.value)}
              className="timezone-select"
            >
              {TIME_ZONES.map((zone) => (
                <option key={zone.value} value={zone.value}>
                  {zone.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <TaskList
          tasks={tasks}
          onDeleteTask={deleteTask}
          onToggleTask={toggleTask}
        />

        <InputForm
          onAddTask={addTask}
          selectedColor={selectedColor}
          onColorChange={handleColorChange}
        />

        <div className="clock-box">
          <div className="clock-time">{formatTime(currentTime, displayTimeZone)}</div>
          {selectedTimeZone !== "local" && (
            <div className="clock-zone">
              {selectedZoneLabel} ({displayTimeZone})
            </div>
          )}
        </div>
      </main>

      <button className="focus-button" onClick={toggleFocusMode}>
        {isFocusMode ? "Wylacz tryb skupienia" : "Tryb skupienia"}
      </button>

      <a
        className="repo-button"
        href={REPO_URL}
        target="_blank"
        rel="noreferrer"
      >
        Repozytorium
      </a>
    </div>
  );
}

export default App;



