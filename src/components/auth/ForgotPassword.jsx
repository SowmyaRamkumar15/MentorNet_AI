import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaEnvelope, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import '../../styles/Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Password reset link sent to your email!');
      setEmailSent(true);
    } catch (error) {
      toast.error('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Check Your Email</h2>
            <p>We've sent a password reset link to your email</p>
          </div>
          
          <div className="success-message">
            <div className="success-icon">✓</div>
            <p>If you don't see the email, check your spam folder.</p>
          </div>
          
          <div className="form-actions">
            <Link to="/login" className="btn-primary">
              <FaArrowLeft /> Back to Login
            </Link>
          </div>
          
          <div className="auth-footer">
            <p>
              Didn't receive the email?{' '}
              <button 
                className="auth-link"
                onClick={() => setEmailSent(false)}
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Forgot Password</h2>
          <p>Enter your email to reset your password</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope /> Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter your registered email"
              className={error ? 'error' : ''}
            />
            {error && <span className="error-text">{error}</span>}
          </div>
          
          <button 
            type="submit" 
            className="btn-primary auth-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="spinner" /> Sending...
              </>
            ) : 'Send Reset Link'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Remember your password?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;