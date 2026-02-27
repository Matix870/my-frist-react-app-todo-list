import TaskItem from "./TaskItem";

function TaskList({ tasks, onDeleteTask, onToggleTask }) {
  return (
    <div
      className="mt-4 rounded-lg p-5 bg-white transition-colors duration-300 text-black"
      style={{
        maxHeight: "460px",
        overflowY: "auto",
      }}
    >
      {tasks.length === 0 ? (
        <h3 className="text-center text-black py-6 text-2xl">Brak zadan. Dodaj cos!</h3>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onToggle={onToggleTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
