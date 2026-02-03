# API Integration Guide

This document explains how to integrate the MentorNet AI frontend with your backend API.

## Backend Required Endpoints

### 1. Authentication Endpoints

#### POST `/api/auth/login`
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "junior|senior",
    "college": "MIT",
    "year": "3",
    "department": "Computer Science",
    "streak": 5,
    "reputation": 95
  }
}
```

#### POST `/api/auth/signup`
**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "college": "MIT",
  "year": "3",
  "department": "Computer Science",
  "role": "junior|senior",
  "password": "password123"
}
```

**Response:** Same as login

#### POST `/api/auth/forgot-password`
**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent to your email"
}
```

#### POST `/api/auth/verify-otp`
**Request:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP verified"
}
```

#### POST `/api/auth/reset-password`
**Request:**
```json
{
  "email": "user@example.com",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

### 2. Profile Endpoints

#### GET `/api/profile/:userId`
Returns user profile data

#### PUT `/api/profile/:userId`
Update user profile

### 3. Doubts Endpoints

#### GET `/api/doubts`
Fetch all doubts with optional filters

**Query Parameters:**
- `status`: "open|resolved"
- `domain`: subject/domain filter
- `page`: pagination

#### POST `/api/doubts`
Create a new doubt

#### GET `/api/doubts/:doubtId`
Get specific doubt details

#### POST `/api/doubts/:doubtId/answers`
Post an answer to a doubt

#### PUT `/api/doubts/:doubtId/answers/:answerId/accept`
Mark an answer as accepted

### 4. Teams Endpoints

#### GET `/api/teams`
Fetch all teams

#### POST `/api/teams`
Create a new team

#### POST `/api/teams/:teamId/join`
Join a team

#### POST `/api/teams/:teamId/requests`
Send team request

### 5. AI Suggestions Endpoint

#### GET `/api/ai/suggestions?userId=:userId`
Get AI-powered recommendations

**Response:**
```json
{
  "recommendedSeniors": [...],
  "recommendedTeams": [...],
  "skillTips": [...]
}
```

## Frontend Integration Steps

### 1. Create API Service (Optional but Recommended)

Create `src/services/api.js`:
```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 2. Update AuthContext.jsx

Replace mock functions with API calls:
```javascript
import api from '../services/api';

const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    setUser(response.data.user);
    setToken(response.data.token);
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Login failed'
    };
  }
};
```

### 3. Update Component API Calls

Example for DoubtsList.jsx:
```javascript
useEffect(() => {
  const fetchDoubts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/doubts', {
        params: { status: filter }
      });
      setDoubts(response.data);
    } catch (error) {
      toast.error('Failed to load doubts');
    } finally {
      setLoading(false);
    }
  };
  
  fetchDoubts();
}, [filter]);
```

## Environment Variables

Create `.env` file in root:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_JWT_STORAGE_KEY=auth_token
```

## CORS Configuration (Backend)

Your backend must configure CORS:
```javascript
// Express example
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true
}));
```

## Error Handling

Implement consistent error handling:
```javascript
// In api.js
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Logout user
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## Data Models

### User Model
```javascript
{
  id: String,
  email: String,
  name: String,
  role: 'junior' | 'senior',
  college: String,
  year: Number,
  department: String,
  bio: String,
  skills: String[],
  interests: String[],
  streak: Number,
  reputation: Number,
  createdAt: Date
}
```

### Doubt Model
```javascript
{
  id: String,
  title: String,
  description: String,
  domain: String,
  status: 'open' | 'resolved',
  author: UserId,
  answers: Answer[],
  createdAt: Date,
  updatedAt: Date
}
```

### Answer Model
```javascript
{
  id: String,
  content: String,
  author: UserId,
  doubtId: String,
  accepted: Boolean,
  helpful: Number,
  createdAt: Date
}
```

### Team Model
```javascript
{
  id: String,
  name: String,
  description: String,
  domain: String,
  skills: String[],
  members: UserId[],
  maxMembers: Number,
  createdBy: UserId,
  createdAt: Date
}
```

## Testing with Postman

1. Login and get token
2. Add `Authorization: Bearer {token}` header to requests
3. Test each endpoint with sample data
4. Verify response structures match expected format

## Common Issues & Solutions

### Issue: 401 Unauthorized
**Solution:** Token not being sent or expired. Ensure token is in localStorage and headers.

### Issue: CORS errors
**Solution:** Configure CORS on backend. Allow frontend origin.

### Issue: 404 Not Found
**Solution:** Check API URL in .env file. Verify endpoint exists on backend.

### Issue: Form submissions failing
**Solution:** Validate data before sending. Check network tab in DevTools.

## Next Steps

1. Set up your backend server
2. Create the required endpoints
3. Update environment variables
4. Test each endpoint with Postman
5. Replace mock APIs in components with real API calls
6. Deploy frontend and backend

---

For more help, check the component files for existing API call structure examples.
