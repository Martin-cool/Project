import { useState } from 'react';
import TaskCard from './components/TaskCard';
import ProgressBar from './components/ProgressBar';
import Profile from './components/Profile';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('tasks');

  const [user, setUser] = useState({
    name: 'Vartotojas',
    email: 'vartotojas@pavyzdys.lt',
  });

  // Kortelių (kategorijų) su užduotimis būsena
  const [cards, setCards] = useState([
    {
      id: crypto.randomUUID(),
      title: 'Darbai',
      description: 'Darbo ir projekto užduotys',
      tasks: [
        { id: crypto.randomUUID(), title: 'Sukurti MVP planą', completed: true },
        { id: crypto.randomUUID(), title: 'Sukurti Profile komponentą', completed: false },
      ],
    },
    {
      id: crypto.randomUUID(),
      title: 'Asmeniniai',
      description: 'Kasdieniai asmeniniai reikalai',
      tasks: [
        { id: crypto.randomUUID(), title: 'Nusipirkti maisto', completed: false },
      ],
    },
  ]);

  // Užduoties būsenos keitimas (taip, kaip tikisi TaskCard)
  const handleToggleTask = (cardId, taskId) => {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id !== cardId) return card;
        return {
          ...card,
          tasks: card.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      })
    );
  };

  // Naujos užduoties pridėjimas į konkrečią kortelę
  const handleAddTask = (cardId, title) => {
    if (!title.trim()) return;
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id !== cardId) return card;
        return {
          ...card,
          tasks: [
            ...card.tasks,
            { id: crypto.randomUUID(), title, completed: false },
          ],
        };
      })
    );
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Mano užduotys</h1>
        <nav className="app-nav">
          <button
            className={`nav-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            Užduotys
          </button>
          <button
            className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profilis
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'tasks' ? (
          <div className="tasks-view">
            <ProgressBar cards={cards} />
            <div className="cards-grid">
              {cards.map((card) => (
                <TaskCard
                  key={card.id}
                  card={card}
                  onToggle={handleToggleTask}
                  onAddTask={handleAddTask}
                />
              ))}
            </div>
          </div>
        ) : (
          <Profile user={user} onUpdateUser={handleUpdateUser} cards={cards} />
        )}
      </main>
    </div>
  );
}