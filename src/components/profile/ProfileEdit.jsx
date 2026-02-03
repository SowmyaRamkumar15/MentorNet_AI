import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';
import { 
  FaSave, 
  FaTimes, 
  FaGraduationCap, 
  FaCode, 
  FaTag,
  FaUser,
  FaBook,
  FaMapMarkerAlt,
  FaPlus,
  FaMinus
} from 'react-icons/fa';
import '../../styles/Profile.css';

const ProfileEdit = ({ onClose }) => {
  const { user, updateProfile, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    department: '',
    year: '',
    bio: '',
    interests: [],
    skills: []
  });
  const [newInterest, setNewInterest] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        college: user.college || '',
        department: user.department || '',
        year: user.year || '',
        bio: user.bio || '',
        interests: user.interests || [],
        skills: user.skills || []
      });
    }
  }, [user]);

  const departments = [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Other'
  ];

  const colleges = [
    'MIT',
    'Stanford University',
    'Harvard University',
    'IIT Bombay',
    'IIT Delhi',
    'IIT Madras',
    'NIT Trichy',
    'University of California',
    'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  if (loading) {
    return <LoadingSpinner text="Loading profile..." />;
  }

  return (
    <div className="profile-edit-container">
      <div className="profile-edit-header">
        <h2>Edit Profile</h2>
        <button className="btn-secondary" onClick={onClose}>
          <FaTimes /> Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="profile-edit-form">
        {/* Basic Information */}
        <div className="form-section">
          <h3>
            <FaUser /> Basic Information
          </h3>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label>
                <FaGraduationCap /> College/University
              </label>
              <select
                value={formData.college}
                onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
              >
                <option value="">Select your college</option>
                {colleges.map(college => (
                  <option key={college} value={college}>{college}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>
                <FaBook /> Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
              >
                <option value="">Select department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>
                <FaMapMarkerAlt /> Year
              </label>
              <select
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
              >
                <option value="">Select year</option>
                {[1, 2, 3, 4, 5].map(year => (
                  <option key={year} value={year}>Year {year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="form-section">
          <h3>
            <FaTag /> Interests
          </h3>
          <p className="section-description">Select areas you're interested in</p>
          
          <div className="tag-input-group">
            <div className="input-with-button">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add an interest (e.g., Machine Learning)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
              />
              <button type="button" className="btn-primary small" onClick={handleAddInterest}>
                <FaPlus /> Add
              </button>
            </div>
            
            <div className="tags-container">
              {formData.interests.map(interest => (
                <span key={interest} className="tag interest-tag">
                  {interest}
                  <button
                    type="button"
                    className="remove-tag"
                    onClick={() => handleRemoveInterest(interest)}
                  >
                    <FaMinus />
                  </button>
                </span>
              ))}
            </div>
            
            {formData.interests.length === 0 && (
              <p className="empty-hint">No interests added yet</p>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="form-section">
          <h3>
            <FaCode /> Skills
          </h3>
          <p className="section-description">Add your technical skills</p>
          
          <div className="tag-input-group">
            <div className="input-with-button">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill (e.g., React, Python)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              />
              <button type="button" className="btn-primary small" onClick={handleAddSkill}>
                <FaPlus /> Add
              </button>
            </div>
            
            <div className="tags-container">
              {formData.skills.map(skill => (
                <span key={skill} className="tag skill-tag">
                  {skill}
                  <button
                    type="button"
                    className="remove-tag"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <FaMinus />
                  </button>
                </span>
              ))}
            </div>
            
            {formData.skills.length === 0 && (
              <p className="empty-hint">No skills added yet</p>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="form-section">
          <h3>About Me</h3>
          <p className="section-description">Write a short bio about yourself</p>
          
          <div className="form-group">
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself, your goals, and interests..."
              rows={4}
              maxLength={500}
            />
            <div className="char-count">
              {formData.bio.length}/500 characters
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? <LoadingSpinner size="small" text="" /> : (
              <>
                <FaSave /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;