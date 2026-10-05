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

  const totalTasks = cards.reduce(
    (sum, card) => sum + card.tasks.length,
    0
  )

  const completedTasks = cards.reduce(
    (sum, card) =>
      sum + card.tasks.filter((task) => task.completed).length,
    0
  )

  return (
    <main className="app">
      <header className="app-header">
        <h1>Mano užduotys</h1>
        <p>Stebėk savo pažangą ir atliktas užduotis</p>
      </header>

      <section className="cards-grid" aria-label="Užduočių kortelės">
        {cards.map((card) => (
          <TaskCard
            key={card.id}
            card={card}
            onToggle={toggleTask}
          />
        ))}
      </section>

      <ProgressBar
        completed={completedTasks}
        total={totalTasks}
      />
    </main>
  )
}

export default App