const TaskItem = ({ task, onDelete, onToggle }) => {
  
  const bg = task.color || '#f9f9f9';
  const getContrast = (hex) => {
    const c = hex.replace('#', '');
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? 'black' : 'white';
  };
  const textColor = task.completed ? '#9ca3af' : getContrast(bg);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: bg,
        borderRadius: "8px",
        marginBottom: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        width: "100%"
      }}
      className="flex items-center justify-between"
    >
      <label className="flex-1 flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle?.(task.id)}
          className="mr-2"
        />
        <span
          className="text-xl"
          style={{
            color: textColor,
            textDecoration: task.completed ? 'line-through' : 'none'
          }}
        >
          {task.text}
        </span>
      </label>
      {onDelete && (
        <button
          onClick={() => onDelete(task.id)}
          className="ml-3 text-red-500 font-bold text-2xl hover:text-red-700 transition-colors"
          title="Usuń zadanie"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TaskItem;
