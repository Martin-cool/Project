import AddTask from './AddTask'
import './TaskCard.css'

function TaskCard({ card, onToggle, onAddTask, onDeleteTask }) {
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
          <div key={task.id} className="task-item-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label
              className={`task-item ${
                task.completed ? 'completed' : ''
              }`}
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

            {/* Ištrynimo mygtukas */}
            {onDeleteTask && (
              <button
                type="button"
                className="delete-task-btn"
                onClick={() => onDeleteTask(card.id, task.id)}
                title="Ištrinti užduotį"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  padding: '4px 8px',
                  lineHeight: 1
                }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <AddTask
        onAdd={(title) => onAddTask(card.id, title)}
      />
    </article>
  )
}

export default TaskCard