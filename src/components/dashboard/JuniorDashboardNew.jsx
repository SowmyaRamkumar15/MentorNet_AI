import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const JuniorDashboard = () => {
  const { user } = useAuth();
  const [doubts, setDoubts] = useState([
    { id: 1, title: 'How to solve quadratic equations?', status: 'open', date: '2024-01-15', answers: 2 },
    { id: 2, title: 'Explain inheritance in OOP', status: 'resolved', date: '2024-01-14', answers: 1 },
  ]);

  const recommendedSeniors = [
    { id: 1, name: 'John Senior', skills: ['Math', 'Physics'], reputation: 95, helped: 150 },
    { id: 2, name: 'Sarah Expert', skills: ['Chemistry', 'Biology'], reputation: 88, helped: 120 },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}! 👋</h1>
        <p>Keep learning and growing today</p>
      </div>

      <div className="dashboard-grid">
        {/* Stats Cards */}
        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-icon">❓</span>
            <div className="stat-content">
              <h3>5</h3>
              <p>Total Doubts</p>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">✅</span>
            <div className="stat-content">
              <h3>3</h3>
              <p>Resolved</p>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">⏳</span>
            <div className="stat-content">
              <h3>2</h3>
              <p>Pending</p>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">🔥</span>
            <div className="stat-content">
              <h3>7</h3>
              <p>Day Streak</p>
            </div>
          </div>
        </div>

        {/* Recent Doubts */}
        <div className="recent-section">
          <div className="section-header">
            <h2>Recent Doubts</h2>
            <Link to="/doubts/post" className="btn btn-primary btn-sm">
              ➕ Ask Doubt
            </Link>
          </div>

          <div className="doubts-list">
            {doubts.map(doubt => (
              <div key={doubt.id} className="doubt-card">
                <div className="doubt-header">
                  <h3>{doubt.title}</h3>
                  <span className={`status-badge status-${doubt.status}`}>
                    {doubt.status === 'open' ? '🔵 Open' : '✅ Resolved'}
                  </span>
                </div>
                <p className="doubt-meta">
                  {doubt.date} • {doubt.answers} answers
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Seniors */}
        <div className="recommendations-section">
          <h2>Recommended Seniors</h2>
          <div className="senior-cards">
            {recommendedSeniors.map(senior => (
              <div key={senior.id} className="senior-card">
                <div className="senior-avatar">
                  {senior.name.charAt(0)}
                </div>
                <h4>{senior.name}</h4>
                <p className="senior-skills">
                  {senior.skills.join(', ')}
                </p>
                <div className="senior-stats">
                  <span>⭐ {senior.reputation}%</span>
                  <span>👥 Helped {senior.helped}</span>
                </div>
                <button className="btn btn-secondary btn-sm">
                  Request Help
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JuniorDashboard;
