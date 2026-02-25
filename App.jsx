import { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);  
  const [selectedColor, setSelectedColor] = useState('#00ff59');
  const [bgImage, setBgImage] = useState(null);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleBgUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBgImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

const handleColorChange = (color) => {
  setSelectedColor(color);
};

const addTask = (taskText, taskDescription = '', taskEmoji = '') => {
  setTasks([
    ...tasks,
    {
      id: Date.now(),
      text: taskText,
      description: taskDescription,
      emoji: taskEmoji,
      completed: false,
      color: selectedColor,
    }
  ]);
};

const deleteTask = (id) => {
  setTasks(tasks.filter(task => task.id !== id));
};

const toggleTask = (id) => {
  setTasks(tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  ));
};

return (    
  <div
    className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-800 to-purple-900 text-white overflow-hidden"
    style={
      bgImage
        ? {
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        : undefined
    }
  >      
    <div className="card w-full max-w-xl bg-gray-800 shadow-2xl">
      <div className="card-body p-6">
        <h1 className="card-title text-4xl font-bold text-white mb-4">Lista zadań</h1>
        <div className="mb-4">
          <label className="block text-white mb-2">Tło (obraz):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBgUpload}
            className="text-sm text-white"
          />
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
        
        <div className="mt-6 text-center">
          <div className="text-6xl font-light font-mono text-white/70">
            {formatTime(currentTime)}
          </div>
        </div>
        
      </div>
    </div>
  </div>
);
  

};  
export default App;



