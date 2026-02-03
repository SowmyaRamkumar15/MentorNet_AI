import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import {
  FaBars,
  FaQuestionCircle,
  FaHome,
  FaUsers,
  FaRobot,
  FaBell,
  FaUserCircle,
  FaSignOutAlt
} from 'react-icons/fa';

const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Safe menu click handler: call parent toggle if provided
  const onMenuClick = () => {
    if (typeof onMenuToggle === 'function') onMenuToggle();
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const notifications = [
    { id: 1, title: 'New answer on your doubt', time: '2 min ago', read: false },
    { id: 2, title: 'Team request accepted', time: '1 hour ago', read: false },
    { id: 3, title: 'Daily streak maintained!', time: '1 day ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="menu-btn" onClick={onMenuClick}>
            <FaBars />
          </button>
          <Link to="/dashboard" className="navbar-brand">
            <FaQuestionCircle className="brand-icon" />
            <span>DoubtSolver</span>
          </Link>
        </div>
        
        <div className="navbar-right">
          {/* Quick Actions */}
          <div className="quick-actions">
            <Link to="/dashboard" className="nav-link">
              <FaHome /> Dashboard
            </Link>
            <Link to="/doubts" className="nav-link">
              <FaQuestionCircle /> Doubts
            </Link>
            <Link to="/teams" className="nav-link">
              <FaUsers /> Teams
            </Link>
            <Link to="/ai-suggestions" className="nav-link">
              <FaRobot /> AI
            </Link>
          </div>
          
          {/* Notifications */}
          <div className="notification-wrapper">
            <button 
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FaBell />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>
            
            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h4>Notifications</h4>
                  <button className="mark-read">Mark all as read</button>
                </div>
                <div className="notification-list">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${notification.read ? 'read' : ''}`}
                    >
                      <div className="notification-content">
                        <p className="notification-title">{notification.title}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/notifications" className="notification-footer">
                  View all notifications
                </Link>
              </div>
            )}
          </div>
          
          {/* User Menu */}
          <div className="user-menu-wrapper">
            <button 
              className="user-menu-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaUserCircle className="user-avatar" />
              <span className="user-name">{user?.name?.split(' ')[0]}</span>
            </button>
            
            {showDropdown && (
              <div className="user-dropdown">
                <div className="user-info-dropdown">
                  <FaUserCircle className="user-avatar-large" />
                  <div>
                    <h4>{user?.name}</h4>
                    <p className="user-role">{user?.role?.toUpperCase()}</p>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/profile" className="dropdown-item">
                  <FaUserCircle /> Profile
                </Link>
                <Link to="/settings" className="dropdown-item">
                  <FaUserCircle /> Settings
                </Link>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;