import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaHome, 
  FaUser, 
  FaQuestionCircle, 
  FaUsers, 
  FaRobot, 
  FaChartLine,
  FaCog,
  FaTimes,
  FaGraduationCap,
  FaUserFriends,
  FaLightbulb
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const juniorLinks = [
    { to: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { to: '/profile', icon: <FaUser />, label: 'Profile' },
    { to: '/doubts', icon: <FaQuestionCircle />, label: 'My Doubts' },
    { to: '/doubts/post', icon: <FaQuestionCircle />, label: 'Ask Doubt' },
    { to: '/teams', icon: <FaUsers />, label: 'Teams' },
    { to: '/ai-suggestions', icon: <FaRobot />, label: 'AI Suggestions' },
  ];

  const seniorLinks = [
    { to: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { to: '/profile', icon: <FaUser />, label: 'Profile' },
    { to: '/doubts', icon: <FaQuestionCircle />, label: 'Answer Doubts' },
    { to: '/teams', icon: <FaUsers />, label: 'Team Requests' },
    { to: '/ai-suggestions', icon: <FaRobot />, label: 'AI Suggestions' },
    { to: '/analytics', icon: <FaChartLine />, label: 'Analytics' },
  ];

  const commonLinks = [
    { to: '/settings', icon: <FaCog />, label: 'Settings' },
  ];

  const links = user?.role === 'senior' ? [...seniorLinks, ...commonLinks] : [...juniorLinks, ...commonLinks];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <FaLightbulb className="brand-icon" />
            <h2>DoubtSolver</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="user-profile">
          <div className="profile-avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="profile-info">
            <h4>{user?.name || 'User'}</h4>
            <div className="role-badge">
              {user?.role === 'senior' ? <FaUserFriends /> : <FaGraduationCap />}
              <span>{user?.role?.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <NavLink 
                  to={link.to} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="streak-widget">
            <div className="streak-info">
              <span className="streak-count">{user?.streak || 0}</span>
              <span className="streak-label">Day Streak</span>
            </div>
            <div className="fire-icon">🔥</div>
          </div>
          <div className="help-section">
            <button className="help-btn">Need Help?</button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;