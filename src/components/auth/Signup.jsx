import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaGraduationCap, FaLock, FaSpinner } from 'react-icons/fa';
import '../../styles/Auth.css';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    role: '',
    password: '',
    confirmPassword: '',
    year: '',
    department: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const colleges = ['MIT', 'Stanford', 'Harvard', 'IIT Bombay', 'IIT Delhi', 'NIT Trichy', 'Other'];
  const departments = ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Information Technology', 'Electronics', 'Other'];

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.college) newErrors.college = 'College is required';
    
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.role) newErrors.role = 'Please select a role';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateStep1();
    if (Object.keys(newErrors).length === 0) {
      setStep(2);
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateStep2();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await signup(formData);
      
      if (result.success) {
        toast.success('Account created successfully!');
        navigate('/dashboard');
      } else {
        toast.error(result.error || 'Signup failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join our learning community</p>
        </div>
        
        <div className="signup-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Basic Info</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Account Setup</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {step === 1 ? (
            <div className="form-step">
              <div className="form-group">
                <label><FaUser /> Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label><FaEnvelope /> Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label><FaGraduationCap /> College/University</label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className={errors.college ? 'error' : ''}
                >
                  <option value="">Select your college</option>
                  {colleges.map(college => (
                    <option key={college} value={college}>{college}</option>
                  ))}
                </select>
                {errors.college && <span className="error-text">{errors.college}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Year</label>
                  <select name="year" value={formData.year} onChange={handleChange}>
                    <option value="">Select year</option>
                    {[1, 2, 3, 4].map(year => (
                      <option key={year} value={year}>Year {year}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Department</label>
                  <select name="department" value={formData.department} onChange={handleChange}>
                    <option value="">Select department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button type="button" className="btn-primary" onClick={handleNext}>
                Next Step
              </button>
            </div>
          ) : (
            <div className="form-step">
              <div className="form-group">
                <label>Select Your Role</label>
                <div className="role-options">
                  <div 
                    className={`role-option ${formData.role === 'junior' ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, role: 'junior' }))}
                  >
                    <div className="role-icon">👨‍🎓</div>
                    <div>
                      <h4>Junior Student</h4>
                      <p>Need help with doubts and guidance</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`role-option ${formData.role === 'senior' ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, role: 'senior' }))}
                  >
                    <div className="role-icon">👨‍🏫</div>
                    <div>
                      <h4>Senior Student</h4>
                      <p>Help juniors & build reputation</p>
                    </div>
                  </div>
                </div>
                {errors.role && <span className="error-text">{errors.role}</span>}
              </div>
              
              <div className="form-group">
                <label><FaLock /> Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password (min 6 characters)"
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>
              
              <div className="form-group">
                <label><FaLock /> Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? <FaSpinner className="spinner" /> : 'Create Account'}
                </button>
              </div>
            </div>
          )}
        </form>
        
        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;