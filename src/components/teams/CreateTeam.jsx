import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';
import { 
  FaUsers, 
  FaPlus, 
  FaTimes, 
  FaRobot,
  FaSearch,
  FaUserPlus,
  FaCalendar,
  FaTag,
  FaLightbulb
} from 'react-icons/fa';
import '../../styles/Teams.css';

const CreateTeam = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    projectType: 'hackathon',
    description: '',
    requiredSkills: [],
    teamSize: 4,
    deadline: '',
    contactInfo: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [suggestedTeammates, setSuggestedTeammates] = useState([]);
  const [selectedTeammates, setSelectedTeammates] = useState([]);
  const [errors, setErrors] = useState({});

  const projectTypes = [
    { value: 'hackathon', label: 'Hackathon', icon: '⚡' },
    { value: 'internship', label: 'Internship', icon: '💼' },
    { value: 'research', label: 'Research Paper', icon: '📚' },
    { value: 'project', label: 'Academic Project', icon: '🎓' },
    { value: 'startup', label: 'Startup Idea', icon: '🚀' },
    { value: 'other', label: 'Other', icon: '🔧' }
  ];

  const skillSuggestions = [
    'React', 'Node.js', 'Python', 'Machine Learning', 'Data Science',
    'Mobile Development', 'UI/UX Design', 'DevOps', 'Blockchain', 'AI'
  ];

  useEffect(() => {
    // Simulate loading suggested teammates
    setTimeout(() => {
      setSuggestedTeammates([
        {
          id: 1,
          name: 'Alice Johnson',
          avatar: 'AJ',
          skills: ['React', 'Node.js', 'UI/UX'],
          reputation: 95,
          responseRate: '98%',
          matchedSkills: 3
        },
        {
          id: 2,
          name: 'Bob Smith',
          avatar: 'BS',
          skills: ['Python', 'ML', 'Data Analysis'],
          reputation: 88,
          responseRate: '92%',
          matchedSkills: 2
        },
        {
          id: 3,
          name: 'Carol Davis',
          avatar: 'CD',
          skills: ['Mobile Dev', 'React Native', 'Firebase'],
          reputation: 92,
          responseRate: '95%',
          matchedSkills: 1
        }
      ]);
    }, 1000);
  }, [formData.requiredSkills]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Please provide more details (min 50 characters)';
    }
    
    if (formData.requiredSkills.length === 0) {
      newErrors.requiredSkills = 'Add at least one required skill';
    }
    
    return newErrors;
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.requiredSkills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, newSkill.trim()]
      }));
      setNewSkill('');
      if (errors.requiredSkills) setErrors(prev => ({ ...prev, requiredSkills: '' }));
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(s => s !== skill)
    }));
  };

  const handleSelectTeammate = (teammate) => {
    if (!selectedTeammates.find(t => t.id === teammate.id)) {
      setSelectedTeammates([...selectedTeammates, teammate]);
    }
  };

  const handleRemoveTeammate = (teammateId) => {
    setSelectedTeammates(selectedTeammates.filter(t => t.id !== teammateId));
  };

  const handleAISuggest = () => {
    // AI would suggest teammates based on skills
    toast('AI: Based on your required skills, I suggest looking for teammates with React and Node.js experience', {
      icon: '🤖',
      duration: 4000
    });
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
      
      toast.success('Team request created successfully!');
      navigate('/teams');
    } catch (error) {
      toast.error('Failed to create team. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-team-container">
      {/* Header */}
      <div className="create-team-header">
        <h1>
          <FaUsers /> Create Team Request
        </h1>
        <p>Find the perfect teammates for your project</p>
      </div>

      <form onSubmit={handleSubmit} className="create-team-form">
        {/* Basic Information */}
        <div className="form-section">
          <div className="form-header">
            <h3>Project Details</h3>
            <button 
              type="button" 
              className="btn-outline small"
              onClick={handleAISuggest}
            >
              <FaRobot /> AI Help
            </button>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Project Name *</label>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, projectName: e.target.value }));
                  if (errors.projectName) setErrors(prev => ({ ...prev, projectName: '' }));
                }}
                placeholder="Enter your project name"
                className={errors.projectName ? 'error' : ''}
              />
              {errors.projectName && <span className="error-text">{errors.projectName}</span>}
            </div>

            <div className="form-group">
              <label>Project Type *</label>
              <div className="type-options">
                {projectTypes.map(type => (
                  <label 
                    key={type.value} 
                    className={`type-option ${formData.projectType === type.value ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="projectType"
                      value={type.value}
                      checked={formData.projectType === type.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                    />
                    <span className="type-icon">{type.icon}</span>
                    <span className="type-label">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Team Size</label>
              <div className="team-size-selector">
                {[2, 3, 4, 5, 6].map(size => (
                  <button
                    key={size}
                    type="button"
                    className={`size-option ${formData.teamSize === size ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, teamSize: size }))}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>
                <FaCalendar /> Deadline (Optional)
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Project Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, description: e.target.value }));
                if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
              }}
              placeholder="Describe your project in detail. Include:
• Project goals and objectives
• Technologies you plan to use
• Expected timeline
• Team roles needed"
              rows={6}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
            <div className="char-count">
              {formData.description.length} characters
            </div>
          </div>
        </div>

        {/* Required Skills */}
        <div className="form-section">
          <h3>
            <FaTag /> Required Skills
          </h3>
          <p className="section-description">
            Add skills you're looking for in teammates
          </p>
          
          <div className="skills-section">
            <div className="skill-input-group">
              <div className="input-with-button">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a required skill"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                />
                <button type="button" className="btn-primary small" onClick={handleAddSkill}>
                  <FaPlus /> Add
                </button>
              </div>
              
              <div className="skill-suggestions">
                {skillSuggestions.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    className="skill-suggestion"
                    onClick={() => {
                      if (!formData.requiredSkills.includes(skill)) {
                        setFormData(prev => ({
                          ...prev,
                          requiredSkills: [...prev.requiredSkills, skill]
                        }));
                      }
                    }}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="selected-skills">
              {formData.requiredSkills.map(skill => (
                <span key={skill} className="skill-tag">
                  {skill}
                  <button
                    type="button"
                    className="remove-skill"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <FaTimes />
                  </button>
                </span>
              ))}
            </div>
            
            {errors.requiredSkills && (
              <span className="error-text">{errors.requiredSkills}</span>
            )}
            
            {formData.requiredSkills.length === 0 && (
              <p className="hint-text">No skills added. Add skills to get better teammate suggestions.</p>
            )}
          </div>
        </div>

        {/* Suggested Teammates */}
        <div className="form-section">
          <div className="section-header">
            <h3>
              <FaLightbulb /> Suggested Teammates
            </h3>
            <span className="match-count">
              {suggestedTeammates.length} matches found
            </span>
          </div>
          
          <div className="teammates-grid">
            {suggestedTeammates.map(teammate => (
              <div key={teammate.id} className="teammate-card">
                <div className="teammate-header">
                  <div className="teammate-avatar">
                    {teammate.avatar}
                  </div>
                  <div className="teammate-info">
                    <h4>{teammate.name}</h4>
                    <div className="teammate-stats">
                      <span className="reputation">⭐ {teammate.reputation}</span>
                      <span className="response-rate">📈 {teammate.responseRate}</span>
                    </div>
                    <div className="match-badge">
                      {teammate.matchedSkills} skill match{teammate.matchedSkills !== 1 ? 'es' : ''}
                    </div>
                  </div>
                </div>
                
                <div className="teammate-skills">
                  {teammate.skills.map(skill => (
                    <span 
                      key={skill} 
                      className={`skill-tag ${formData.requiredSkills.includes(skill) ? 'matched' : ''}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="teammate-actions">
                  {selectedTeammates.find(t => t.id === teammate.id) ? (
                    <button 
                      type="button" 
                      className="btn-success"
                      onClick={() => handleRemoveTeammate(teammate.id)}
                    >
                      <FaUserPlus /> Selected
                    </button>
                  ) : (
                    <button 
                      type="button" 
                      className="btn-primary"
                      onClick={() => handleSelectTeammate(teammate)}
                    >
                      <FaUserPlus /> Invite
                    </button>
                  )}
                  <button type="button" className="btn-outline">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Teammates */}
        {selectedTeammates.length > 0 && (
          <div className="form-section">
            <h3>Selected Teammates ({selectedTeammates.length})</h3>
            <div className="selected-teammates">
              {selectedTeammates.map(teammate => (
                <div key={teammate.id} className="selected-teammate">
                  <div className="teammate-avatar">
                    {teammate.avatar}
                  </div>
                  <div className="teammate-details">
                    <h4>{teammate.name}</h4>
                    <div className="teammate-skills">
                      {teammate.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="skill-tag small">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveTeammate(teammate.id)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-group">
            <input
              type="text"
              value={formData.contactInfo}
              onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
              placeholder="How should teammates contact you? (Email, Discord, etc.)"
            />
            <p className="hint-text">
              This information will be visible to potential teammates
            </p>
          </div>
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <h4>
            <FaLightbulb /> Tips for successful team formation:
          </h4>
          <ul>
            <li>Be clear about project goals and expectations</li>
            <li>Specify required skills and experience levels</li>
            <li>Mention time commitment and availability</li>
            <li>Set realistic deadlines and milestones</li>
            <li>Include how you'll communicate and collaborate</li>
          </ul>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/teams')}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <LoadingSpinner size="small" text="" />
            ) : (
              <>
                <FaUsers /> Create Team Request
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeam;