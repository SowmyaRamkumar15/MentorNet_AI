# MentorNet AI - Project Architecture & Features

## 🎓 Platform Overview

MentorNet AI is a React-based educational platform that connects junior and senior students for collaborative learning. The frontend is production-ready and designed for seamless backend integration.

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    MENTORNET AI FRONTEND                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ Auth Pages  │  │  Dashboards  │  │  Feature Pages   │  │
│  ├─────────────┤  ├──────────────┤  ├──────────────────┤  │
│  │ • Login     │  │ • Junior     │  │ • Doubts         │  │
│  │ • Signup    │  │ • Senior     │  │ • Teams          │  │
│  │ • Forgot PW │  │              │  │ • AI Suggestions │  │
│  └─────────────┘  └──────────────┘  │ • Profiles       │  │
│                                      └──────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │          Common Components & Layout                   │ │
│  │  • Navbar  • Sidebar  • Notifications  • Forms       │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │     Context & State Management                        │ │
│  │  • AuthContext  • NotificationContext                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ REST API Calls
                           │
                ┌──────────────────────────┐
                │  BACKEND SERVER (Node)   │
                ├──────────────────────────┤
                │  • Authentication        │
                │  • Database Operations   │
                │  • Business Logic        │
                │  • AI Processing         │
                └──────────────────────────┘
```

## 🎯 Key Features Implemented

### 1. Authentication System
- **Multi-step signup** with validation
- **Email/College ID login** 
- **Password recovery** with OTP
- **JWT token** management
- **Persistent** sessions
- **Role-based** access (Junior/Senior)

### 2. Dual Dashboard System
- **Junior Dashboard**
  - View posted doubts
  - Track daily streak
  - See statistics (doubts, resolved, pending)
  - Access senior recommendations
  - Quick actions to ask doubts

- **Senior Dashboard**
  - See doubts to answer
  - Track reputation score
  - Manage team requests
  - View student recommendations

### 3. Doubt Management Module
- **Post doubts** with details
- **Browse doubts** with filters
- **Answer doubts** with acceptance marking
- **Streak tracking** for participation
- **Status tracking** (open/resolved)
- **Domain filtering** by subject

### 4. Team Collaboration
- **Create teams** with skill requirements
- **Join teams** based on interests
- **Request invites** for team membership
- **Filter teams** by domain/skills
- **Team management** interface

### 5. Profile Management
- **View profile** with completeness indicator
- **Edit profile** with validation
- **Skills** management
- **Interests** selection
- **Bio** and information display
- **Reputation badges** for seniors

### 6. AI Suggestions
- **Recommended seniors** based on skills
- **Recommended teammates** based on interests
- **Skill improvement tips**
- **Explanation engine** for recommendations
- **Smart filtering** algorithm

### 7. Gamification System
- **Daily streaks** with fire emoji
- **Reputation points** system
- **Achievement badges**
- **Leaderboard ready** (for backend)
- **Motivational displays**

## 📁 Component Breakdown

### Authentication Components (3)
```
├── Login.jsx (159 lines)
│   └── Form validation, error handling, remember-me
├── Signup.jsx (272 lines)
│   └── Multi-step form, role selection, password validation
└── ForgotPassword.jsx (130 lines)
    └── OTP verification, password reset flow
```

### Dashboard Components (3)
```
├── JuniorDashboard.jsx (345 lines)
│   └── Stats, streaks, recommendations, quick actions
├── SeniorDashboard.jsx
│   └── Reputation, team requests, doubts to answer
└── DashboardLayout.jsx
    └── Layout wrapper with Navbar and Sidebar
```

### Feature Components (9)
```
├── Profile.jsx & ProfileEdit.jsx
│   └── User info display and editing
├── PostDoubt.jsx, DoubtsList.jsx, DoubtDetail.jsx
│   └── Doubt management system
├── CreateTeam.jsx, TeamList.jsx
│   └── Team collaboration features
└── AISuggestions.jsx
    └── AI-powered recommendations
```

### Common Components (7)
```
├── Navbar.jsx          → Top navigation bar
├── Sidebar.jsx         → Side navigation menu
├── LoadingSpinner.jsx  → Loading indicator
├── StreakBadge.jsx     → Streak display
├── Notification.jsx    → Notification card
├── Toast.jsx           → Toast messages
└── MainLayout.jsx      → Main layout wrapper
```

## 💾 Data Flow

```
User → Component → State Hook → Context/API → Backend
                                     ↓
                         (Mock API in Development)
                                     ↓
                              localStorage
```

## 🎨 Styling System

### CSS Architecture
```
Global (App.css)
  ├── Colors & Variables
  ├── Common Utilities
  └── Component Styles (900+ lines)

Auth.css
  ├── Form styling
  └── Auth page layouts

Dashboard.css
  ├── Grid layouts
  └── Card components

Profile.css
  ├── Profile cards
  └── Form styling
```

### Color Palette
- **Primary**: #4F46E5 (Indigo)
- **Secondary**: #10B981 (Green)
- **Danger**: #EF4444 (Red)
- **Background**: #F8FAFC (Light)
- **Text**: #1E293B (Dark)

## 🔄 State Management

### AuthContext
```javascript
{
  user: { id, email, name, role, college, year, department, streak, reputation },
  token: string,
  loading: boolean,
  isAuthenticated: boolean,
  login: (email, password) => Promise,
  signup: (userData) => Promise,
  logout: () => void,
  updateProfile: (data) => void
}
```

### NotificationContext
```javascript
{
  notifications: [],
  addNotification: (message, type, duration) => void,
  removeNotification: (id) => void
}
```

## 📱 Responsive Design

```
Desktop (1024px+)         Tablet (768-1023px)    Mobile (< 768px)
├── Full Sidebar         ├── Collapsible Sidebar ├── Mobile Sidebar
├── Multi-column Grid    ├── 2-column layouts    └── Single Column
├── Hover effects        └── Touch-friendly      
└── Full navigation                              
```

## 🔐 Security Features Implemented

- ✅ Form validation on client-side
- ✅ Password strength checking
- ✅ JWT token storage (localStorage)
- ✅ Protected routes wrapper
- ✅ Role-based access control
- ✅ Error message sanitization
- ⚠️ Note: Server-side security needed for production

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.11.0",
  "react-hot-toast": "^2.4.0",
  "react-icons": "^4.11.0",
  "axios": "^1.4.0"
}
```

## 🚀 Performance Optimizations

- ✅ Code splitting ready
- ✅ Lazy loading routes (ready)
- ✅ CSS minification in production
- ✅ Image optimization ready
- ✅ Local state management for UI
- ✅ Memoization ready (React.memo)

## 📊 Component Statistics

| Category | Count | Files | LOC |
|----------|-------|-------|-----|
| Auth | 3 | 3 | 561 |
| Dashboard | 3 | 3 | 400+ |
| Profiles | 2 | 2 | 300+ |
| Doubts | 3 | 3 | 400+ |
| Teams | 2 | 2 | 250+ |
| AI | 1 | 1 | 200+ |
| Common | 7 | 7 | 400+ |
| Layout | 1 | 1 | 100+ |
| **Total** | **22** | **22** | **2600+** |

## 🔌 API Integration Points

The frontend has **15+ API integration points** ready for backend connection:

- Authentication (5 endpoints)
- Profile Management (2 endpoints)
- Doubts Module (5 endpoints)
- Teams Module (3 endpoints)
- AI Suggestions (1 endpoint)

## 📚 Documentation Files

```
├── README.md              → Main documentation
├── QUICK_START.md         → Quick setup guide
├── API_INTEGRATION.md     → Backend integration guide
├── ARCHITECTURE.md        → This file
├── DEPLOYMENT.md          → Deployment instructions
└── .env.example           → Environment variables template
```

## ✅ Ready for Production?

**Frontend Status**: ✅ Production Ready
- All components implemented
- Responsive design complete
- Error handling in place
- Mock APIs functional
- CSS styling comprehensive

**Requirements for Production**:
- ⏳ Backend API development
- ⏳ Database setup
- ⏳ Environment variables configuration
- ⏳ Security audit
- ⏳ Performance testing

## 🎓 Learning Resources

This project demonstrates:
- ✅ React Hooks (useState, useEffect, useContext)
- ✅ React Router v6 navigation
- ✅ Context API for state management
- ✅ Form handling and validation
- ✅ Responsive CSS design
- ✅ Component composition
- ✅ Error handling patterns
- ✅ Loading states
- ✅ Toast notifications
- ✅ Modal dialogs

## 🤝 Contributing Guidelines

When integrating with backend:
1. Update API endpoints in `src/services/api.js`
2. Modify mock functions in context files
3. Add error boundaries for stability
4. Update component props if needed
5. Run tests and verify functionality

## 📞 Support

For questions about:
- **Component usage**: Check individual component files
- **API integration**: See `API_INTEGRATION.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Setup issues**: See `QUICK_START.md`

---

**Project Status**: ✅ Ready for Backend Integration
**Last Updated**: January 2024
**Version**: 1.0.0
