import { useState } from 'react';
import TaskCard from './components/TaskCard';
import AddTask from './components/AddTask';
import ProgressBar from './components/ProgressBar';
import Profile from './components/Profile';
import './App.css';

export default function App() {
  // Active Tab: 'tasks' arba 'profile'
  const [activeTab, setActiveTab] = useState('tasks');

  // Vartotojo būsena
  const [user, setUser] = useState({
    name: 'Vartotojas',
    email: 'vartotojas@pavyzdys.lt',
  });

  // Pradinės užduotys (pavyzdinės)
  const [tasks, setTasks] = useState([
    { id: crypto.randomUUID(), title: 'Sukurti MVP planą', category: 'Darbai', completed: true },
    { id: crypto.randomUUID(), title: 'Sukurti Profile komponentą', category: 'Darbai', completed: false },
    { id: crypto.randomUUID(), title: 'Nusipirkti maisto', category: 'Asmeniniai', completed: false },
  ]);

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div className="app-container">
      {/* Navigacijos juosta */}
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

      {/* Turinys priklausomai nuo pasirinkto kortelės/rodinio */}
      <main className="app-main">
        {activeTab === 'tasks' ? (
          <div className="tasks-view">
            <ProgressBar tasks={tasks} />
            <AddTask tasks={tasks} setTasks={setTasks} />
            <TaskCard tasks={tasks} setTasks={setTasks} />
          </div>
        ) : (
          <Profile user={user} onUpdateUser={handleUpdateUser} tasks={tasks} />
        )}
      </main>
    </div>
  );
}