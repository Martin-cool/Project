import { useState } from 'react'
import './AddTask.css'

function AddTask({ onAdd }) {
  const [title, setTitle] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    onAdd(trimmedTitle)

    setTitle('')
    setIsAdding(false)
  }

  const handleCancel = () => {
    setTitle('')
    setIsAdding(false)
  }

  if (!isAdding) {
    return (
      <button
        type="button"
        className="add-task-button"
        onClick={() => setIsAdding(true)}
      >
        <span>+</span>
        Pridėti užduotį
      </button>
    )
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Nauja užduotis..."
        autoFocus
        aria-label="Naujos užduoties pavadinimas"
      />

      <div className="add-task-actions">
        <button
          type="button"
          className="add-task-cancel"
          onClick={handleCancel}
        >
          Atšaukti
        </button>

        <button
          type="submit"
          className="add-task-submit"
          disabled={!title.trim()}
        >
          Pridėti
        </button>
      </div>
    </form>
  )
}

export default AddTask