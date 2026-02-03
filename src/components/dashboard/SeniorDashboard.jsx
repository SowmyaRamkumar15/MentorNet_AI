import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StreakBadge from '../common/StreakBadge';
import LoadingSpinner from '../common/LoadingSpinner';
import { 
  FaQuestionCircle, 
  FaCheckCircle, 
  FaUsers, 
  FaChartLine,
  FaTrophy,
  FaLightbulb,
  FaReply,
  FaStar,
  FaFire,
  FaUserCheck
} from 'react-icons/fa';
import '../../styles/Dashboard.css';

const SeniorDashboard = () => {
  const { user } = useAuth();
  const [doubtsToAnswer, setDoubtsToAnswer] = useState([]);
  const [teamRequests, setTeamRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAnswered: 0,
    reputation: 0,
    helpedStudents: 0,
    acceptanceRate: 0,
    streak: 0
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDoubtsToAnswer([
        { 
          id: 1, 
          title: 'React useEffect cleanup question', 
          domain: 'Coding', 
          student: 'John Doe',
          time: '2 hours ago',
          urgency: 'high',
          tags: ['React', 'Hooks', 'JavaScript']
        },
        { 
          id: 2, 
          title: 'ML model overfitting issue', 
          domain: 'ML', 
          student: 'Jane Smith',
          time: '4 hours ago',
          urgency: 'medium',
          tags: ['Python', 'ML', 'TensorFlow']
        },
        { 
          id: 3, 
          title: 'Database indexing optimization', 
          domain: 'Database', 
          student: 'Bob Wilson',
          time: '1 day ago',
          urgency: 'low',
          tags: ['SQL', 'Database', 'Optimization']
        }
      ]);

      setTeamRequests([
        {
          id: 1,
          project: 'E-commerce Website',
          type: 'Hackathon',
          skills: ['React', 'Node.js', 'MongoDB'],
          members: 2,
          status: 'pending'
        },
        {
          id: 2,
          project: 'ML Research Paper',
          type: 'Research',
          skills: ['Python', 'TensorFlow', 'NLP'],
          members: 3,
          status: 'pending'
        }
      ]);

      setStats({
        totalAnswered: 42,
        reputation: 95,
        helpedStudents: 35,
        acceptanceRate: 88,
        streak: user?.streak || 7
      });

      setLoading(false);
    }, 1000);
  }, [user]);

  const getUrgencyBadge = (urgency) => {
    const config = {
      high: { class: 'danger', text: 'High', icon: '🔥' },
      medium: { class: 'warning', text: 'Medium', icon: '⚠️' },
      low: { class: 'info', text: 'Low', icon: '💡' }
    }[urgency] || { class: 'secondary', text: urgency, icon: '⚪' };
    
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
    <div className="dashboard senior-dashboard">
      {/* Welcome Section */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome, Mentor {user?.name}!</h1>
          <p className="welcome-subtitle">
            Your expertise is helping {stats.helpedStudents} students learn better
          </p>
        </div>
        <div className="header-actions">
          <StreakBadge streak={stats.streak} size="large" />
          <div className="reputation-display">
            <FaTrophy className="trophy-icon" />
            <div className="reputation-info">
              <span className="reputation-score">{stats.reputation}</span>
              <span className="reputation-label">Reputation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{stats.totalAnswered}</h3>
            <p>Questions Answered</p>
            <span className="stat-trend">+5 this week</span>
          </div>
        </div>
        
        <div className="stat-card stat-success">
          <div className="stat-icon">
            <FaUserCheck />
          </div>
          <div className="stat-content">
            <h3>{stats.helpedStudents}</h3>
            <p>Students Helped</p>
            <span className="stat-trend">+3 this week</span>
          </div>
        </div>
        
        <div className="stat-card stat-warning">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-content">
            <h3>{stats.acceptanceRate}%</h3>
            <p>Acceptance Rate</p>
            <span className="stat-trend">High quality</span>
          </div>
        </div>
        
        <div className="stat-card stat-info">
          <div className="stat-icon">
            <FaTrophy />
          </div>
          <div className="stat-content">
            <h3>Gold</h3>
            <p>Reputation Level</p>
            <span className="stat-trend">Top 10%</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Doubts to Answer Section */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-title">
              <FaQuestionCircle />
              <h2>Doubts to Answer</h2>
            </div>
            <Link to="/doubts" className="btn-outline">
              <FaReply /> Answer More
            </Link>
          </div>
          
          {doubtsToAnswer.length === 0 ? (
            <div className="empty-state">
              <FaLightbulb size={64} />
              <h3>All caught up!</h3>
              <p>No pending doubts to answer. Check back later or help with team requests.</p>
              <button className="btn-primary">
                Refresh Doubts
              </button>
            </div>
          ) : (
            <div className="doubts-list">
              {doubtsToAnswer.map(doubt => (
                <div key={doubt.id} className="doubt-card">
                  <div className="doubt-header">
                    <div>
                      <h4>{doubt.title}</h4>
                      <p className="student-name">by {doubt.student}</p>
                    </div>
                    {getUrgencyBadge(doubt.urgency)}
                  </div>
                  <div className="doubt-meta">
                    <span className="domain-badge">{doubt.domain}</span>
                    <span className="date">
                      <FaClock /> {doubt.time}
                    </span>
                  </div>
                  <div className="doubt-tags">
                    {doubt.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="doubt-actions">
                    <button className="btn-primary">
                      <FaReply /> Answer
                    </button>
                    <button className="btn-outline">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Team Requests Section */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-title">
              <FaUsers />
              <h2>Team Requests</h2>
            </div>
            <Link to="/teams" className="btn-outline">
              View All →
            </Link>
          </div>
          
          {teamRequests.length === 0 ? (
            <div className="empty-state">
              <FaUsers size={64} />
              <h3>No team requests</h3>
              <p>You don't have any pending team requests.</p>
            </div>
          ) : (
            <div className="team-requests-list">
              {teamRequests.map(request => (
                <div key={request.id} className="team-request-card">
                  <div className="request-header">
                    <h4>{request.project}</h4>
                    <span className="request-type">{request.type}</span>
                  </div>
                  <div className="request-details">
                    <div className="request-skills">
                      <span className="label">Skills needed:</span>
                      <div className="skills">
                        {request.skills.map(skill => (
                          <span key={skill} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className="request-meta">
                      <span className="members">
                        <FaUsers /> {request.members} members
                      </span>
                      <span className={`status status-${request.status}`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                  <div className="request-actions">
                    <button className="btn-success">
                      Accept
                    </button>
                    <button className="btn-danger">
                      Decline
                    </button>
                    <button className="btn-outline">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Your Impact Section */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-title">
              <FaStar />
              <h2>Your Impact</h2>
            </div>
          </div>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-icon">
                <FaFire />
              </div>
              <div className="impact-content">
                <h3>Most Helpful In</h3>
                <ul className="expertise-list">
                  <li>React Development</li>
                  <li>Machine Learning</li>
                  <li>System Design</li>
                </ul>
              </div>
            </div>
            
            <div className="impact-card">
              <div className="impact-icon">
                <FaChartLine />
              </div>
              <div className="impact-content">
                <h3>Performance Metrics</h3>
                <div className="metrics">
                  <div className="metric">
                    <span className="label">Avg. Rating</span>
                    <span className="value">4.9/5</span>
                  </div>
                  <div className="metric">
                    <span className="label">Response Time</span>
                    <span className="value">2.3 hours</span>
                  </div>
                  <div className="metric">
                    <span className="label">Satisfaction</span>
                    <span className="value">96%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="impact-card">
              <div className="impact-icon">
                <FaTrophy />
              </div>
              <div className="impact-content">
                <h3>Achievements</h3>
                <div className="achievements">
                  <span className="achievement-badge">🏆 Top Mentor</span>
                  <span className="achievement-badge">🔥 7-day Streak</span>
                  <span className="achievement-badge">💯 100% Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <Link to="/doubts" className="quick-action">
              <div className="action-icon primary">
                <FaQuestionCircle />
              </div>
              <span>Answer Doubts</span>
            </Link>
            <Link to="/teams" className="quick-action">
              <div className="action-icon success">
                <FaUsers />
              </div>
              <span>Team Requests</span>
            </Link>
            <Link to="/ai-suggestions" className="quick-action">
              <div className="action-icon warning">
                <FaLightbulb />
              </div>
              <span>AI Insights</span>
            </Link>
            <Link to="/profile" className="quick-action">
              <div className="action-icon info">
                <FaChartLine />
              </div>
              <span>View Analytics</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeniorDashboard;