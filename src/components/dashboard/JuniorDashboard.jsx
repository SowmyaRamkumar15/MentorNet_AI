import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StreakBadge from '../common/StreakBadge';
import LoadingSpinner from '../common/LoadingSpinner';
import { 
  FaQuestionCircle, 
  FaCheckCircle, 
  FaClock, 
  FaUserGraduate,
  FaPlus,
  FaChartLine,
  FaLightbulb,
  FaRocket,
  FaUsers,
  FaRobot
} from 'react-icons/fa';
import '../../styles/Dashboard.css';

const JuniorDashboard = () => {
  const { user } = useAuth();
  const [doubts, setDoubts] = useState([]);
  const [recommendedSeniors, setRecommendedSeniors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDoubts: 0,
    accepted: 0,
    pending: 0,
    helpReceived: 0
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDoubts([
        { 
          id: 1, 
          title: 'React useState hook not updating', 
          domain: 'Coding', 
          status: 'accepted', 
          date: '2024-01-15',
          answers: 3,
          tags: ['React', 'JavaScript']
        },
        { 
          id: 2, 
          title: 'Machine learning algorithm comparison', 
          domain: 'ML', 
          status: 'pending', 
          date: '2024-01-16',
          answers: 1,
          tags: ['Python', 'ML']
        },
        { 
          id: 3, 
          title: 'Database normalization forms', 
          domain: 'Exams', 
          status: 'answered', 
          date: '2024-01-14',
          answers: 2,
          tags: ['Database', 'SQL']
        }
      ]);

      setRecommendedSeniors([
        { 
          id: 1, 
          name: 'Alice Johnson', 
          department: 'Computer Science', 
          skills: ['React', 'Node.js', 'MongoDB'], 
          reputation: 95, 
          helped: 42,
          avatar: 'A',
          responseTime: '2 hours'
        },
        { 
          id: 2, 
          name: 'Bob Smith', 
          department: 'IT', 
          skills: ['ML', 'Python', 'TensorFlow'], 
          reputation: 88, 
          helped: 35,
          avatar: 'B',
          responseTime: '1 hour'
        },
        { 
          id: 3, 
          name: 'Carol Davis', 
          department: 'ECE', 
          skills: ['DSA', 'Java', 'System Design'], 
          reputation: 92, 
          helped: 50,
          avatar: 'C',
          responseTime: '3 hours'
        }
      ]);

      setStats({
        totalDoubts: 12,
        accepted: 8,
        pending: 2,
        helpReceived: 8
      });

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    const config = {
      accepted: { class: 'success', text: 'Accepted', icon: '✓' },
      pending: { class: 'warning', text: 'Pending', icon: '⏳' },
      answered: { class: 'info', text: 'Answered', icon: '💬' }
    }[status] || { class: 'secondary', text: status, icon: '⚪' };
    
    return (
      <span className={`badge badge-${config.class}`}>
        {config.icon} {config.text}
      </span>
    );
  };

  if (loading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  return (
    <div className="dashboard junior-dashboard">
      {/* Welcome Section */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name}!</h1>
          <p className="welcome-subtitle">
            {user?.streak > 0 
              ? `🔥 You're on a ${user.streak}-day streak! Keep it up!`
              : 'Start your learning journey today!'}
          </p>
        </div>
        <div className="header-actions">
          <StreakBadge streak={user?.streak || 0} size="large" />
          <Link to="/doubts/post" className="btn-primary ask-doubt-btn">
            <FaPlus /> Ask a Doubt
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">
            <FaQuestionCircle />
          </div>
          <div className="stat-content">
            <h3>{stats.totalDoubts}</h3>
            <p>Total Doubts</p>
            <span className="stat-trend">+2 this week</span>
          </div>
        </div>
        
        <div className="stat-card stat-success">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{stats.accepted}</h3>
            <p>Accepted Solutions</p>
            <span className="stat-trend">{Math.round((stats.accepted / stats.totalDoubts) * 100)}% rate</span>
          </div>
        </div>
        
        <div className="stat-card stat-warning">
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
            <p>Pending Doubts</p>
            <span className="stat-trend">Need attention</span>
          </div>
        </div>
        
        <div className="stat-card stat-info">
          <div className="stat-icon">
            <FaUserGraduate />
          </div>
          <div className="stat-content">
            <h3>{stats.helpReceived}</h3>
            <p>Help Received</p>
            <span className="stat-trend">From {stats.accepted} seniors</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Recent Doubts Section */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-title">
              <FaQuestionCircle />
              <h2>Recent Doubts</h2>
            </div>
            <Link to="/doubts" className="btn-outline">
              View All →
            </Link>
          </div>
          
          {doubts.length === 0 ? (
            <div className="empty-state">
              <FaQuestionCircle size={64} />
              <h3>No doubts yet</h3>
              <p>Start by asking your first doubt and get help from seniors!</p>
              <Link to="/doubts/post" className="btn-primary">
                <FaPlus /> Ask Your First Doubt
              </Link>
            </div>
          ) : (
            <div className="doubts-list">
              {doubts.map(doubt => (
                <div key={doubt.id} className="doubt-card">
                  <div className="doubt-header">
                    <h4>{doubt.title}</h4>
                    {getStatusBadge(doubt.status)}
                  </div>
                  <div className="doubt-meta">
                    <span className="domain-badge">{doubt.domain}</span>
                    <span className="date">
                      <FaClock /> {doubt.date}
                    </span>
                    <span className="answers-count">
                      {doubt.answers} answer{doubt.answers !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="doubt-tags">
                    {doubt.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="doubt-actions">
                    <Link to={`/doubts/${doubt.id}`} className="btn-text">
                      View Details →
                    </Link>
                    {doubt.status === 'pending' && (
                      <button className="btn-outline small">
                        Follow Up
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Seniors Section */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-title">
              <FaLightbulb />
              <h2>Recommended Seniors</h2>
            </div>
            <Link to="/ai-suggestions" className="btn-outline">
              <FaRocket /> AI Match
            </Link>
          </div>
          
          <div className="recommendations-grid">
            {recommendedSeniors.map(senior => (
              <div key={senior.id} className="senior-card">
                <div className="senior-header">
                  <div className="senior-avatar">
                    {senior.avatar}
                  </div>
                  <div className="senior-info">
                    <h4>{senior.name}</h4>
                    <p className="department">{senior.department}</p>
                    <div className="reputation-badge">
                      <FaChartLine /> {senior.reputation} Rep
                    </div>
                  </div>
                </div>
                
                <div className="senior-skills">
                  {senior.skills.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
                
                <div className="senior-stats">
                  <div className="stat">
                    <span className="label">Helped</span>
                    <span className="value">{senior.helped} students</span>
                  </div>
                  <div className="stat">
                    <span className="label">Response</span>
                    <span className="value">{senior.responseTime}</span>
                  </div>
                </div>
                
                <div className="senior-actions">
                  <button className="btn-primary small">
                    Request Help
                  </button>
                  <button className="btn-outline small">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <Link to="/doubts/post" className="quick-action">
              <div className="action-icon primary">
                <FaPlus />
              </div>
              <span>Ask Doubt</span>
            </Link>
            <Link to="/teams/create" className="quick-action">
              <div className="action-icon success">
                <FaUsers />
              </div>
              <span>Create Team</span>
            </Link>
            <Link to="/ai-suggestions" className="quick-action">
              <div className="action-icon warning">
                <FaRobot />
              </div>
              <span>AI Suggestions</span>
            </Link>
            <Link to="/profile" className="quick-action">
              <div className="action-icon info">
                <FaUserGraduate />
              </div>
              <span>Complete Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JuniorDashboard;