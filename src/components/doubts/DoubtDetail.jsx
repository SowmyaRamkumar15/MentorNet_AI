import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';
import { 
  FaArrowLeft, 
  FaCheck, 
  FaTimes, 
  FaThumbsUp, 
  FaThumbsDown,
  FaShare,
  FaBookmark,
  FaFlag,
  FaPaperPlane,
  FaClock,
  FaUser,
  FaCode,
  FaGraduationCap
} from 'react-icons/fa';
import '../../styles/Doubts.css';

const DoubtDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [doubt, setDoubt] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDoubt({
        id: 1,
        title: 'React useState hook not updating state properly',
        description: `I'm building a React component where I have a state variable that's not updating when I call setState. Here's my code:

\`\`\`javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
    console.log(count); // This still shows the old value
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
\`\`\`

The UI updates correctly, but when I log the count immediately after setCount, it shows the old value. Why is this happening and how can I get the updated value immediately?`,
        domain: 'Coding',
        status: 'answered',
        urgency: 'medium',
        tags: ['React', 'JavaScript', 'Hooks', 'State Management'],
        author: {
          name: 'John Doe',
          avatar: 'JD',
          role: 'junior',
          reputation: 45,
          college: 'MIT'
        },
        createdAt: '2024-01-15T10:30:00',
        updatedAt: '2024-01-15T14:20:00',
        views: 145,
        answers: 3,
        isAnonymous: false,
        codeLanguage: 'javascript',
        acceptedAnswerId: 2
      });

      setAnswers([
        {
          id: 1,
          content: `This happens because setState is asynchronous in React. The state update is scheduled but doesn't happen immediately. If you need to use the updated value, you can use the useEffect hook with count as a dependency.`,
          author: {
            name: 'Alice Johnson',
            avatar: 'AJ',
            role: 'senior',
            reputation: 95,
            college: 'Stanford'
          },
          createdAt: '2024-01-15T11:15:00',
          upvotes: 8,
          isAccepted: false,
          isHelpful: true,
          codeSnippet: `useEffect(() => {
  console.log('Updated count:', count);
}, [count]);`
        },
        {
          id: 2,
          content: `Exactly what Alice said! Additionally, you can use the functional form of setState if you need to update based on the previous state:

\`\`\`javascript
const handleClick = () => {
  setCount(prevCount => {
    const newCount = prevCount + 1;
    console.log(newCount); // This will show updated value
    return newCount;
  });
};
\`\`\`

This ensures you're working with the latest state value.`,
          author: {
            name: 'Bob Smith',
            avatar: 'BS',
            role: 'senior',
            reputation: 88,
            college: 'Harvard'
          },
          createdAt: '2024-01-15T12:30:00',
          upvotes: 12,
          isAccepted: true,
          isHelpful: true,
          codeSnippet: `setCount(prevCount => prevCount + 1);`
        },
        {
          id: 3,
          content: `Also remember that React batches state updates for performance. Multiple setState calls in the same synchronous execution context will be batched together.`,
          author: {
            name: 'Carol Davis',
            avatar: 'CD',
            role: 'senior',
            reputation: 92,
            college: 'MIT'
          },
          createdAt: '2024-01-15T14:20:00',
          upvotes: 5,
          isAccepted: false,
          isHelpful: true
        }
      ]);

      setLoading(false);
    }, 1000);
  }, [id]);

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    
    if (!newAnswer.trim()) {
      toast.error('Please write an answer before submitting');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newAnswerObj = {
        id: answers.length + 1,
        content: newAnswer,
        author: {
          name: user?.name || 'You',
          avatar: user?.name?.charAt(0) || 'U',
          role: user?.role || 'user',
          reputation: user?.reputation || 0,
          college: user?.college || ''
        },
        createdAt: new Date().toISOString(),
        upvotes: 0,
        isAccepted: false,
        isHelpful: false
      };
      
      setAnswers([...answers, newAnswerObj]);
      setNewAnswer('');
      setShowAnswerForm(false);
      toast.success('Answer submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAcceptAnswer = (answerId) => {
    if (doubt.author.name === user?.name || user?.role === 'senior') {
      setAnswers(answers.map(answer => ({
        ...answer,
        isAccepted: answer.id === answerId
      })));
      toast.success('Answer marked as accepted!');
    }
  };

  const handleMarkHelpful = (answerId, helpful) => {
    setAnswers(answers.map(answer => {
      if (answer.id === answerId) {
        return {
          ...answer,
          isHelpful: helpful,
          upvotes: helpful ? answer.upvotes + 1 : answer.upvotes - 1
        };
      }
      return answer;
    }));
    
    toast(helpful ? 'Marked as helpful!' : 'Marked as not helpful');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  if (loading) {
    return <LoadingSpinner text="Loading doubt details..." />;
  }

  if (!doubt) {
    return (
      <div className="error-state">
        <h3>Doubt not found</h3>
        <p>The doubt you're looking for doesn't exist or has been removed.</p>
        <button className="btn-primary" onClick={() => navigate('/doubts')}>
          <FaArrowLeft /> Back to Doubts
        </button>
      </div>
    );
  }

  return (
    <div className="doubt-detail-container">
      {/* Back Navigation */}
      <div className="back-nav">
        <button className="btn-text" onClick={() => navigate('/doubts')}>
          <FaArrowLeft /> Back to Doubts
        </button>
      </div>

      {/* Doubt Header */}
      <div className="doubt-header">
        <div className="doubt-title-section">
          <div className="doubt-meta">
            <span className="domain-badge">{doubt.domain}</span>
            {getStatusBadge(doubt.status)}
            <span className="urgency-badge medium">
              {doubt.urgency === 'high' ? '🔥' : '⚠️'} {doubt.urgency}
            </span>
          </div>
          <h1>{doubt.title}</h1>
          
          <div className="author-info">
            <div className="author-avatar">
              {doubt.isAnonymous ? '👤' : doubt.author.avatar}
            </div>
            <div>
              <div className="author-name">
                {doubt.isAnonymous ? 'Anonymous' : doubt.author.name}
                <span className="author-role">{doubt.author.role}</span>
              </div>
              <div className="author-meta">
                <FaGraduationCap /> {doubt.author.college}
                <span className="reputation-score">⭐ {doubt.author.reputation}</span>
                <FaClock /> {formatDate(doubt.createdAt)}
              </div>
            </div>
          </div>
        </div>

        <div className="doubt-actions">
          <button className="btn-outline">
            <FaBookmark /> Save
          </button>
          <button className="btn-outline">
            <FaShare /> Share
          </button>
          <button className="btn-outline">
            <FaFlag /> Report
          </button>
        </div>
      </div>

      {/* Doubt Content */}
      <div className="doubt-content">
        <div className="content-section">
          <h3>Description</h3>
          <div className="description-content">
            {doubt.description.split('\n').map((line, index) => {
              if (line.startsWith('```')) {
                return (
                  <pre key={index} className="code-block">
                    <code>{line.replace('```', '')}</code>
                  </pre>
                );
              }
              return <p key={index}>{line}</p>;
            })}
          </div>
          
          {doubt.codeLanguage && (
            <div className="code-info">
              <FaCode /> Language: {doubt.codeLanguage}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="tags-section">
          <h4>Tags</h4>
          <div className="tags-container">
            {doubt.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="doubt-stats">
          <div className="stat">
            <span className="stat-value">{doubt.views}</span>
            <span className="stat-label">Views</span>
          </div>
          <div className="stat">
            <span className="stat-value">{doubt.answers}</span>
            <span className="stat-label">Answers</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {answers.filter(a => a.isAccepted).length}
            </span>
            <span className="stat-label">Accepted</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {answers.reduce((sum, a) => sum + a.upvotes, 0)}
            </span>
            <span className="stat-label">Upvotes</span>
          </div>
        </div>
      </div>

      {/* Answers Section */}
      <div className="answers-section">
        <div className="section-header">
          <h2>Answers ({answers.length})</h2>
          {user?.role === 'senior' && !showAnswerForm && (
            <button 
              className="btn-primary"
              onClick={() => setShowAnswerForm(true)}
            >
              <FaPaperPlane /> Add Answer
            </button>
          )}
        </div>

        {/* Answer Form */}
        {showAnswerForm && (
          <div className="answer-form">
            <h3>Your Answer</h3>
            <form onSubmit={handleSubmitAnswer}>
              <div className="form-group">
                <textarea
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Write your detailed answer here. Include code examples if applicable."
                  rows={6}
                  required
                />
                <div className="form-hints">
                  <p>• Be clear and detailed</p>
                  <p>• Include code snippets if relevant</p>
                  <p>• Reference official documentation</p>
                </div>
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowAnswerForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Post Answer'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Answers List */}
        {answers.length === 0 ? (
          <div className="empty-state">
            <p>No answers yet. Be the first to help!</p>
          </div>
        ) : (
          <div className="answers-list">
            {answers.map(answer => (
              <div 
                key={answer.id} 
                className={`answer-card ${answer.isAccepted ? 'accepted' : ''}`}
              >
                {answer.isAccepted && (
                  <div className="accepted-badge">
                    <FaCheck /> Accepted Solution
                  </div>
                )}
                
                <div className="answer-header">
                  <div className="answer-author">
                    <div className="author-avatar">
                      {answer.author.avatar}
                    </div>
                    <div>
                      <div className="author-name">
                        {answer.author.name}
                        <span className="author-role senior">
                          {answer.author.role === 'senior' ? 'Senior' : ''}
                        </span>
                      </div>
                      <div className="author-meta">
                        <FaGraduationCap /> {answer.author.college}
                        <span className="reputation-score">⭐ {answer.author.reputation}</span>
                        <FaClock /> {formatDate(answer.createdAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="answer-stats">
                    <button 
                      className={`vote-btn ${answer.isHelpful ? 'active' : ''}`}
                      onClick={() => handleMarkHelpful(answer.id, !answer.isHelpful)}
                    >
                      <FaThumbsUp /> {answer.upvotes}
                    </button>
                  </div>
                </div>

                <div className="answer-content">
                  {answer.content.split('\n').map((line, index) => {
                    if (line.startsWith('```')) {
                      return (
                        <pre key={index} className="code-block">
                          <code>{line.replace('```', '')}</code>
                        </pre>
                      );
                    }
                    return <p key={index}>{line}</p>;
                  })}
                  
                  {answer.codeSnippet && (
                    <pre className="code-block">
                      <code>{answer.codeSnippet}</code>
                    </pre>
                  )}
                </div>

                <div className="answer-actions">
                  {user?.role === 'junior' && !answer.isAccepted && (
                    <button 
                      className="btn-success small"
                      onClick={() => handleAcceptAnswer(answer.id)}
                    >
                      <FaCheck /> Accept Solution
                    </button>
                  )}
                  
                  <button className="btn-text">
                    <FaThumbsUp /> Helpful
                  </button>
                  <button className="btn-text">
                    <FaThumbsDown /> Not Helpful
                  </button>
                  <button className="btn-text">
                    <FaFlag /> Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Doubts would go here */}
    </div>
  );
};

export default DoubtDetail;