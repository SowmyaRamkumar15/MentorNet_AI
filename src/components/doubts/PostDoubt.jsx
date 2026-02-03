import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';
import { 
  FaPaperPlane, 
  FaTimes, 
  FaTag, 
  FaCode, 
  FaRobot,
  FaLightbulb
} from 'react-icons/fa';
import '../../styles/Doubts.css';

const PostDoubt = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: '',
    tags: [],
    urgency: 'medium',
    isAnonymous: false
  });
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState({});

  const domains = [
    'Coding',
    'Machine Learning',
    'Data Science',
    'Web Development',
    'Mobile Development',
    'Database',
    'Algorithms',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Exams',
    'Projects',
    'Placements',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title should be at least 10 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Please provide more details (min 20 characters)';
    }
    
    if (!formData.domain) {
      newErrors.domain = 'Please select a domain';
    }
    
    return newErrors;
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Doubt posted successfully!');
      navigate('/doubts');
    } catch (error) {
      toast.error('Failed to post doubt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAISuggest = () => {
    toast('AI suggestion: Try to be specific and include code examples if applicable', {
      icon: '🤖',
      duration: 4000
    });
  };

  if (loading) {
    return <LoadingSpinner text="Posting your doubt..." />;
  }

  return (
    <div className="post-doubt-container">
      <div className="post-doubt-header">
        <h1>
          <FaLightbulb /> Ask a Doubt
        </h1>
        <p>Get help from experienced seniors in our community</p>
      </div>

      <form onSubmit={handleSubmit} className="post-doubt-form">
        <div className="form-section">
          <div className="form-header">
            <h3>Basic Information</h3>
            <button 
              type="button" 
              className="btn-outline small"
              onClick={handleAISuggest}
            >
              <FaRobot /> AI Help
            </button>
          </div>
          
          <div className="form-group">
            <label>Doubt Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, title: e.target.value }));
                if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
              }}
              placeholder="Be specific about your problem"
              className={errors.title ? 'error' : ''}
              maxLength={100}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
            <div className="char-count">
              {formData.title.length}/100 characters
            </div>
          </div>

          <div className="form-group">
            <label>Domain *</label>
            <select
              value={formData.domain}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, domain: e.target.value }));
                if (errors.domain) setErrors(prev => ({ ...prev, domain: '' }));
              }}
              className={errors.domain ? 'error' : ''}
            >
              <option value="">Select a domain</option>
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
            {errors.domain && <span className="error-text">{errors.domain}</span>}
          </div>
        </div>

        <div className="form-section">
          <h3>Detailed Description</h3>
          
          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, description: e.target.value }));
                if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
              }}
              placeholder="Describe your doubt in detail. Include:
• What you're trying to achieve
• What you've tried so far
• Any error messages
• Code snippets if applicable"
              rows={8}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
            <div className="char-count">
              {formData.description.length} characters
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>
            <FaTag /> Tags
          </h3>
          <p className="section-description">
            Add relevant tags to help seniors find your doubt
          </p>
          
          <div className="tag-input-group">
            <div className="input-with-button">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag (e.g., React, Python, ML)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <button type="button" className="btn-primary small" onClick={handleAddTag}>
                Add
              </button>
            </div>
            
            <div className="tags-container">
              {formData.tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                  <button
                    type="button"
                    className="remove-tag"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <FaTimes />
                  </button>
                </span>
              ))}
            </div>
            
            {formData.tags.length === 0 && (
              <p className="hint-text">No tags added. Adding tags improves visibility.</p>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Settings</h3>
          
          <div className="settings-grid">
            <div className="setting-option">
              <label>
                <input
                  type="radio"
                  checked={formData.urgency === 'low'}
                  onChange={() => setFormData(prev => ({ ...prev, urgency: 'low' }))}
                />
                <span className="setting-label">
                  <span className="urgency-dot low"></span>
                  Low Urgency
                </span>
              </label>
            </div>
            
            <div className="setting-option">
              <label>
                <input
                  type="radio"
                  checked={formData.urgency === 'medium'}
                  onChange={() => setFormData(prev => ({ ...prev, urgency: 'medium' }))}
                />
                <span className="setting-label">
                  <span className="urgency-dot medium"></span>
                  Medium Urgency
                </span>
              </label>
            </div>
            
            <div className="setting-option">
              <label>
                <input
                  type="radio"
                  checked={formData.urgency === 'high'}
                  onChange={() => setFormData(prev => ({ ...prev, urgency: 'high' }))}
                />
                <span className="setting-label">
                  <span className="urgency-dot high"></span>
                  High Urgency
                </span>
              </label>
            </div>
          </div>
          
          <div className="checkbox-option">
            <label>
              <input
                type="checkbox"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
              />
              <span>Post anonymously</span>
            </label>
            <p className="hint-text">
              Your name will not be visible to other users
            </p>
          </div>
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <h4>
            <FaLightbulb /> Tips for better responses:
          </h4>
          <ul>
            <li>Be specific and clear about your problem</li>
            <li>Include relevant code snippets or error messages</li>
            <li>Mention what you've already tried</li>
            <li>Add appropriate tags for better visibility</li>
            <li>Be respectful and patient with responders</li>
          </ul>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/doubts')}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <LoadingSpinner size="small" text="" />
            ) : (
              <>
                <FaPaperPlane /> Post Doubt
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostDoubt;