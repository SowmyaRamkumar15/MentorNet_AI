import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import { 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaClock, 
  FaCheckCircle,
  FaTimesCircle,
  FaSort,
  FaEye,
  FaComment,
  FaFire
} from 'react-icons/fa';
import '../../styles/Doubts.css';

const DoubtsList = () => {
  const { user } = useAuth();
  const [doubts, setDoubts] = useState([]);
  const [filteredDoubts, setFilteredDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    domain: 'all',
    status: 'all',
    sortBy: 'newest'
  });

  const domains = [
    'all', 'Coding', 'ML', 'Web Dev', 'Mobile', 'Database', 
    'Algorithms', 'Mathematics', 'Physics', 'Exams', 'Other'
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status', icon: '🌐' },
    { value: 'pending', label: 'Pending', icon: '⏳' },
    { value: 'answered', label: 'Answered', icon: '💬' },
    { value: 'accepted', label: 'Accepted', icon: '✅' },
    { value: 'closed', label: 'Closed', icon: '🔒' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockDoubts = [
        {
          id: 1,
          title: 'React useState hook not updating state properly',
          description: 'I have a component where useState is not updating...',
          domain: 'Coding',
          status: 'answered',
          answers: 3,
          views: 45,
          urgency: 'medium',
          tags: ['React', 'JavaScript', 'Hooks'],
          author: { name: 'John Doe', avatar: 'JD' },
          createdAt: '2024-01-15T10:30:00',
          updatedAt: '2024-01-15T14:20:00',
          isAnonymous: false
        },
        {
          id: 2,
          title: 'Machine Learning model overfitting issue',
          description: 'My neural network is overfitting on training data...',
          domain: 'ML',
          status: 'pending',
          answers: 1,
          views: 28,
          urgency: 'high',
          tags: ['Python', 'TensorFlow', 'Neural Networks'],
          author: { name: 'Jane Smith', avatar: 'JS' },
          createdAt: '2024-01-16T09:15:00',
          updatedAt: '2024-01-16T09:15:00',
          isAnonymous: false
        },
        {
          id: 3,
          title: 'Database normalization question for exam',
          description: 'Need help understanding 3rd normal form...',
          domain: 'Database',
          status: 'accepted',
          answers: 5,
          views: 67,
          urgency: 'low',
          tags: ['SQL', 'Database', 'Normalization'],
          author: { name: 'Bob Wilson', avatar: 'BW' },
          createdAt: '2024-01-14T16:45:00',
          updatedAt: '2024-01-15T11:30:00',
          isAnonymous: true
        },
        {
          id: 4,
          title: 'Android app crashes on startup',
          description: 'My React Native app crashes immediately after launch...',
          domain: 'Mobile',
          status: 'pending',
          answers: 0,
          views: 19,
          urgency: 'high',
          tags: ['React Native', 'Android', 'Mobile'],
          author: { name: 'Alice Johnson', avatar: 'AJ' },
          createdAt: '2024-01-17T13:20:00',
          updatedAt: '2024-01-17T13:20:00',
          isAnonymous: false
        }
      ];

      setDoubts(mockDoubts);
      setFilteredDoubts(mockDoubts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = doubts;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(doubt =>
        doubt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doubt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doubt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply domain filter
    if (filters.domain !== 'all') {
      result = result.filter(doubt => doubt.domain === filters.domain);
    }

    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(doubt => doubt.status === filters.status);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'most_answers':
          return b.answers - a.answers;
        case 'most_views':
          return b.views - a.views;
        case 'urgent':
          const urgencyOrder = { high: 3, medium: 2, low: 1 };
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        default:
          return 0;
      }
    });

    setFilteredDoubts(result);
  }, [doubts, searchTerm, filters]);

  const getStatusBadge = (status) => {
    const config = {
      pending: { class: 'warning', text: 'Pending', icon: '⏳' },
      answered: { class: 'info', text: 'Answered', icon: '💬' },
      accepted: { class: 'success', text: 'Accepted', icon: '✅' },
      closed: { class: 'secondary', text: 'Closed', icon: '🔒' }
    }[status] || { class: 'secondary', text: status, icon: '⚪' };
    
    return (
      <span className={`badge badge-${config.class}`}>
        {config.icon} {config.text}
      </span>
    );
  };

  const getUrgencyBadge = (urgency) => {
    const config = {
      high: { class: 'danger', text: 'High', icon: '🔥' },
      medium: { class: 'warning', text: 'Medium', icon: '⚠️' },
      low: { class: 'info', text: 'Low', icon: '💡' }
    }[urgency] || { class: 'secondary', text: urgency, icon: '⚪' };
    
    return (
      <span className={`urgency-badge ${config.class}`}>
        {config.icon}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading doubts..." />;
  }

  return (
    <div className="doubts-list-container">
      {/* Header */}
      <div className="doubts-header">
        <div>
          <h1>All Doubts</h1>
          <p className="subtitle">Browse and help with community doubts</p>
        </div>
        {user?.role === 'junior' && (
          <Link to="/doubts/post" className="btn-primary">
            <FaPlus /> Ask Doubt
          </Link>
        )}
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search doubts by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              <FaTimesCircle />
            </button>
          )}
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label><FaFilter /> Domain</label>
            <select
              value={filters.domain}
              onChange={(e) => setFilters(prev => ({ ...prev, domain: e.target.value }))}
            >
              {domains.map(domain => (
                <option key={domain} value={domain}>
                  {domain === 'all' ? 'All Domains' : domain}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label><FaFilter /> Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label><FaSort /> Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most_answers">Most Answers</option>
              <option value="most_views">Most Viewed</option>
              <option value="urgent">Urgent First</option>
            </select>
          </div>

          <button 
            className="btn-secondary"
            onClick={() => setFilters({
              domain: 'all',
              status: 'all',
              sortBy: 'newest'
            })}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="doubts-stats">
        <div className="stat">
          <span className="stat-value">{filteredDoubts.length}</span>
          <span className="stat-label">Doubts</span>
        </div>
        <div className="stat">
          <span className="stat-value">
            {filteredDoubts.filter(d => d.status === 'pending').length}
          </span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat">
          <span className="stat-value">
            {filteredDoubts.filter(d => d.urgency === 'high').length}
          </span>
          <span className="stat-label">Urgent</span>
        </div>
        <div className="stat">
          <span className="stat-value">
            {filteredDoubts.reduce((sum, doubt) => sum + doubt.answers, 0)}
          </span>
          <span className="stat-label">Total Answers</span>
        </div>
      </div>

      {/* Doubts List */}
      {filteredDoubts.length === 0 ? (
        <div className="empty-state">
          <FaSearch size={64} />
          <h3>No doubts found</h3>
          <p>Try adjusting your search or filters</p>
          <button 
            className="btn-primary"
            onClick={() => {
              setSearchTerm('');
              setFilters({ domain: 'all', status: 'all', sortBy: 'newest' });
            }}
          >
            Clear All
          </button>
        </div>
      ) : (
        <div className="doubts-grid">
          {filteredDoubts.map(doubt => (
            <div key={doubt.id} className="doubt-card">
              <div className="doubt-card-header">
                <div className="doubt-title-section">
                  {getUrgencyBadge(doubt.urgency)}
                  <h4>{doubt.title}</h4>
                </div>
                <div className="doubt-meta">
                  <span className="domain-badge">{doubt.domain}</span>
                  {getStatusBadge(doubt.status)}
                </div>
              </div>

              <p className="doubt-description">
                {doubt.description.length > 150
                  ? `${doubt.description.substring(0, 150)}...`
                  : doubt.description}
              </p>

              <div className="doubt-tags">
                {doubt.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              <div className="doubt-footer">
                <div className="author-info">
                  <div className="author-avatar">
                    {doubt.isAnonymous ? '👤' : doubt.author.avatar}
                  </div>
                  <div>
                    <span className="author-name">
                      {doubt.isAnonymous ? 'Anonymous' : doubt.author.name}
                    </span>
                    <span className="post-time">
                      <FaClock /> {formatDate(doubt.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="doubt-stats">
                  <span className="stat-item">
                    <FaEye /> {doubt.views}
                  </span>
                  <span className="stat-item">
                    <FaComment /> {doubt.answers}
                  </span>
                  {doubt.status === 'pending' && user?.role === 'senior' && (
                    <Link to={`/doubts/${doubt.id}`} className="btn-primary small">
                      Answer
                    </Link>
                  )}
                  {doubt.status !== 'pending' && (
                    <Link to={`/doubts/${doubt.id}`} className="btn-outline small">
                      View
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination would go here */}
      {filteredDoubts.length > 0 && (
        <div className="pagination">
          <button className="page-btn disabled">← Previous</button>
          <span className="page-info">Page 1 of 1</span>
          <button className="page-btn disabled">Next →</button>
        </div>
      )}
    </div>
  );
};

export default DoubtsList;