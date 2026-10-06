import AddTask from './AddTask'
import './TaskCard.css'

function TaskCard({ card, onToggle, onAddTask }) {
  const completed = card.tasks.filter(
    (task) => task.completed
  ).length

  return (
    <article className="task-card">
      <div className="task-card-header">
        <div>
          <h2>{card.title}</h2>
          <p>{card.description}</p>
        </div>

        <span className="task-count">
          {completed}/{card.tasks.length}
        </span>
      </div>

      <div className="task-list">
        {card.tasks.map((task) => (
          <label
            className={`task-item ${
              task.completed ? 'completed' : ''
            }`}
            key={task.id}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(card.id, task.id)}
            />

            <span
              className="custom-checkbox"
              aria-hidden="true"
            >
              {task.completed ? '✓' : ''}
            </span>

            <span className="task-title">
              {task.title}
            </span>
          </label>
        ))}
      </div>

      <AddTask
        onAdd={(title) => onAddTask(card.id, title)}
      />
    </article>
  )
}

export default TaskCard