import { useState } from 'react';
import './Profile.css';

export default function Profile({ user, onUpdateUser, tasks = [] }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isSaved, setIsSaved] = useState(false);

  // Statistikos skaičiavimas iš užduočių sąrašo
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, email });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="profile-container">
      {/* 1. Antraštė su avataru */}
      <div className="profile-card profile-header-card">
        <div className="avatar">
          {name ? name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="profile-header-info">
          <h2>{user.name}</h2>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      {/* 2. Statistikos sekcija */}
      <div className="profile-card profile-stats">
        <h3>Veiklos statistika</h3>
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-number">{totalTasks}</span>
            <span className="stat-label">Visos užduotys</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{completedTasks}</span>
            <span className="stat-label">Atlikta užduočių</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{completionPercentage}%</span>
            <span className="stat-label">Progresas</span>
          </div>
        </div>
      </div>

      {/* 3. Redagavimo forma */}
      <div className="profile-card profile-settings">
        <h3>Redaguoti profilį</h3>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="profile-name">Vardas</label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="profile-email">El. paštas</label>
            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="save-button">
            Išsaugoti pakeitimus
          </button>

          {isSaved && <p className="success-message">Duomenys sėkmingai atnaujinti!</p>}
        </form>
      </div>
    </div>
  );
}