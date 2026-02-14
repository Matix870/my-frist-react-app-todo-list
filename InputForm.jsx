import { useState } from "react";

const InputForm = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px", display: "flex", gap: "10px" }}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Wpisz zadanie"
        style={{
          flex: 1,
          padding: "12px",
          border: "none",
          borderRadius: "6px",
          fontSize: "1em",
          outline: "none"
        }}
        autoFocus
      />
      <button type="submit" style={{ padding: "12px 25px", border: "none", backgroundColor: "#fff", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", color: "#000" }}>
        Dodaj
      </button>
    </form>
  );
};

export default InputForm;
