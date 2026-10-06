import { useState } from 'react'
import TaskCard from './components/TaskCard'
import ProgressBar from './components/ProgressBar'
import './App.css'

const initialCards = [
  {
    id: 'planning',
    title: 'Planavimas',
    description: 'Pasiruošimas darbams',
    tasks: [
      { id: 1, title: 'Sudaryti planą', completed: false },
      { id: 2, title: 'Nustatyti tikslus', completed: false },
      { id: 3, title: 'Parinkti terminus', completed: false },
    ],
  },
  {
    id: 'execution',
    title: 'Vykdymas',
    description: 'Numatytų darbų atlikimas',
    tasks: [
      { id: 1, title: 'Atlikti pirmą užduotį', completed: false },
      { id: 2, title: 'Peržiūrėti rezultatus', completed: false },
      { id: 3, title: 'Patikrinti eigą', completed: false },
    ],
  },
  {
    id: 'completion',
    title: 'Užbaigimas',
    description: 'Galutinis darbų patikrinimas',
    tasks: [
      { id: 1, title: 'Patikrinti darbus', completed: false },
      { id: 2, title: 'Ištaisyti klaidas', completed: false },
      { id: 3, title: 'Užbaigti projektą', completed: false },
    ],
  },
]

function App() {
  const [cards, setCards] = useState(initialCards)

  const toggleTask = (cardId, taskId) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              tasks: card.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : card
      )
    )
  }

  const addTask = (cardId, title) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              tasks: [
                ...card.tasks,
                {
                  id: crypto.randomUUID(),
                  title,
                  completed: false,
                },
              ],
            }
          : card
      )
    )
  }

  return (
    <div className="app">
      <ProgressBar cards={cards} />

      <div className="cards">
        {cards.map((card) => (
          <TaskCard
            key={card.id}
            card={card}
            onToggle={toggleTask}
            onAddTask={addTask}
          />
        ))}
      </div>
    </div>
  )
}

export default App