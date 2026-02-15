import { useState } from "react";
import InputForm from "./components/InputForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskText) => {
    setTasks([...tasks, { id: Date.now(), text: taskText }]);
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", color: "white", marginBottom: "30px", fontSize: "2.5em" }}>Lista zadań</h1>
        <InputForm onAddTask={addTask} />
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
  

}
  
export default App;
