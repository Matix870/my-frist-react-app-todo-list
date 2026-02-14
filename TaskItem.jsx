const TaskItem = ({ task }) => {
  return (
    <div style={{
      padding: "15px",
      backgroundColor: "white",
      borderRadius: "6px",
      marginBottom: "10px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
    }}>
      {task.text}
    </div>
  );
};

export default TaskItem;
