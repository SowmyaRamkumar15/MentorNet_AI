import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProfileEdit from './ProfileEdit';
import LoadingSpinner from '../common/LoadingSpinner';
import StreakBadge from '../common/StreakBadge';
import { 
  FaEdit, 
  FaGraduationCap, 
  FaCode, 
  FaStar, 
  FaCalendarAlt,
  FaFire,
  FaTag,
  FaUser,
  FaMapMarkerAlt,
  FaBook,
  FaAward,
  FaQuestionCircle,
  FaCheckCircle,
  FaUserCheck
} from 'react-icons/fa';
import '../../styles/Profile.css';

const Profile = () => {
  const { user, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (loading) {
    return <LoadingSpinner text="Loading profile..." />;
  }

  if (isEditing) {
    return <ProfileEdit onClose={() => setIsEditing(false)} />;
  }

  const calculateCompleteness = () => {
    if (!user) return 0;
    
    const fields = [
      user.name,
      user.bio,
      user.interests?.length > 0,
      user.skills?.length > 0,
      user.year,
      user.department,
      user.college
    ];
    
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  };

  const getReputationLevel = (score) => {
    if (score >= 80) return { level: 'Gold', color: '#FFD700', icon: '🏆' };
    if (score >= 50) return { level: 'Silver', color: '#C0C0C0', icon: '🥈' };
    return { level: 'Bronze', color: '#CD7F32', icon: '🥉' };
  };

  const completeness = calculateCompleteness();
  const reputation = getReputationLevel(user?.reputation || 0);

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <div>
          <h1>My Profile</h1>
          <p className="header-subtitle">Manage your personal information and preferences</p>
        </div>
        <button 
          className="btn-primary edit-btn"
          onClick={() => setIsEditing(true)}
        >
          <FaEdit /> Edit Profile
        </button>
      </div>

      <div className="profile-content">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <h2>{user?.name || 'User'}</h2>
            <div className="user-role-badge">
              {user?.role === 'senior' ? '👨‍🏫 Mentor' : '👨‍🎓 Learner'}
            </div>
            
            <div className="profile-stats">
              <div className="stat-item">
                <FaFire className="stat-icon fire" />
                <div className="stat-content">
                  <span className="stat-value">{user?.streak || 0}</span>
                  <span className="stat-label">Day Streak</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon trophy">
                  {reputation.icon}
                </div>
                <div className="stat-content">
                  <span className="stat-value">{reputation.level}</span>
                  <span className="stat-label">Reputation</span>
                </div>
              </div>
              
              <div className="stat-item">
                <FaAward className="stat-icon award" />
                <div className="stat-content">
                  <span className="stat-value">{user?.reputation || 0}</span>
                  <span className="stat-label">Score</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Completeness */}
          <div className="completeness-card">
            <h4>Profile Completeness</h4>
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${completeness}%` }}
                ></div>
              </div>
              <span className="progress-text">{completeness}% complete</span>
            </div>
            {completeness < 100 && (
              <p className="completeness-hint">
                Complete your profile to get better recommendations
              </p>
            )}
          </div>

          {/* Streak Widget */}
          <div className="streak-widget">
            <StreakBadge streak={user?.streak || 0} size="medium" />
            <div className="streak-tips">
              <h4>Maintain Your Streak</h4>
              <ul>
                <li>Visit daily to keep streak alive</li>
                <li>Answer/Ask questions</li>
                <li>Engage with community</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-main">
          {/* Basic Information */}
          <div className="info-section">
            <div className="section-header">
              <h3>
                <FaUser /> Basic Information
              </h3>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <FaGraduationCap className="info-icon" />
                <div>
                  <span className="info-label">College</span>
                  <span className="info-value">{user?.college || 'Not specified'}</span>
                </div>
              </div>
              
              <div className="info-item">
                <FaCalendarAlt className="info-icon" />
                <div>
                  <span className="info-label">Year</span>
                  <span className="info-value">
                    {user?.year ? `Year ${user.year}` : 'Not specified'}
                  </span>
                </div>
              </div>
              
              <div className="info-item">
                <FaBook className="info-icon" />
                <div>
                  <span className="info-label">Department</span>
                  <span className="info-value">{user?.department || 'Not specified'}</span>
                </div>
              </div>
              
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <span className="info-label">Role</span>
                  <span className="info-value role-value">
                    {user?.role === 'senior' ? 'Senior Mentor' : 'Junior Learner'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="info-section">
            <div className="section-header">
              <h3>
                <FaTag /> Interests
              </h3>
            </div>
            <div className="tags-container">
              {user?.interests?.length > 0 ? (
                user.interests.map(interest => (
                  <span key={interest} className="tag interest-tag">
                    {interest}
                  </span>
                ))
              ) : (
                <div className="empty-state">
                  <p>No interests added yet</p>
                  <button 
                    className="btn-text"
                    onClick={() => setIsEditing(true)}
                  >
                    Add interests →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="info-section">
            <div className="section-header">
              <h3>
                <FaCode /> Skills
              </h3>
            </div>
            <div className="tags-container">
              {user?.skills?.length > 0 ? (
                user.skills.map(skill => (
                  <span key={skill} className="tag skill-tag">
                    {skill}
                  </span>
                ))
              ) : (
                <div className="empty-state">
                  <p>No skills added yet</p>
                  <button 
                    className="btn-text"
                    onClick={() => setIsEditing(true)}
                  >
                    Add skills →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="info-section">
            <div className="section-header">
              <h3>About Me</h3>
            </div>
            <div className="bio-container">
              {user?.bio ? (
                <p className="bio-text">{user.bio}</p>
              ) : (
                <div className="empty-state">
                  <p>No bio added yet</p>
                  <button 
                    className="btn-text"
                    onClick={() => setIsEditing(true)}
                  >
                    Add bio →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Activity Stats */}
          <div className="info-section">
            <div className="section-header">
              <h3>Activity Statistics</h3>
            </div>
            <div className="activity-grid">
              {user?.role === 'junior' ? (
                <>
                  <div className="activity-item">
                    <div className="activity-icon primary">
                      <FaQuestionCircle />
                    </div>
                    <div>
                      <span className="activity-value">12</span>
                      <span className="activity-label">Doubts Asked</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon success">
                      <FaCheckCircle />
                    </div>
                    <div>
                      <span className="activity-value">8</span>
                      <span className="activity-label">Solved</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon warning">
                      <FaStar />
                    </div>
                    <div>
                      <span className="activity-value">{user?.reputation || 0}</span>
                      <span className="activity-label">Reputation</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="activity-item">
                    <div className="activity-icon primary">
                      <FaQuestionCircle />
                    </div>
                    <div>
                      <span className="activity-value">42</span>
                      <span className="activity-label">Answered</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon success">
                      <FaUserCheck />
                    </div>
                    <div>
                      <span className="activity-value">35</span>
                      <span className="activity-label">Students Helped</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon warning">
                      <FaStar />
                    </div>
                    <div>
                      <span className="activity-value">{user?.reputation || 0}</span>
                      <span className="activity-label">Reputation</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;