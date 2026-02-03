# MentorNet AI - Quick Start Guide

## Prerequisites

- Node.js v14+ installed
- npm or yarn package manager

## Installation & Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

The app will automatically open at `http://localhost:3000`

### Step 3: Test the Application

Use mock credentials to login:
- **Email**: test@example.com (or any email)
- **Password**: password123 (or any password > 6 chars)
- **Role**: Select Junior or Senior

## File Structure

### Authentication Flow
- `src/components/auth/` - Login, Signup, Forgot Password pages
- `src/context/AuthContext.jsx` - Authentication state & mock API

### Feature Modules
- `src/components/dashboard/` - Junior/Senior dashboards  
- `src/components/profile/` - User profile pages
- `src/components/doubts/` - Post/view/answer doubts
- `src/components/teams/` - Create/join teams
- `src/components/ai/` - AI recommendations

### Common Components
- `src/components/common/` - Navbar, Sidebar, Notifications
- `src/components/layout/` - Main layout wrappers

### Styling
- `src/styles/App.css` - Global styles
- `src/styles/Auth.css` - Auth pages styling
- `src/styles/Dashboard.css` - Dashboard styling
- `src/styles/Profile.css` - Profile styling

## Key Features

✅ Multi-step user registration
✅ Role-based authentication (Junior/Senior)
✅ Dual dashboards with different layouts
✅ Profile management and editing
✅ Doubt management system
✅ Team collaboration features
✅ AI-powered recommendations
✅ Streak tracking & gamification
✅ Responsive design
✅ Toast notifications

## Backend Integration

To connect with a backend:

1. Update API endpoints in `src/context/AuthContext.jsx`
2. Replace mock API functions with actual API calls
3. Configure CORS on your backend
4. Update `.env` file with your backend URL

Example backend integration:
```javascript
const login = async (email, password) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};
```

## Building for Production

```bash
npm run build
```

Creates optimized build in `build/` folder. Deploy the contents to your hosting service.

## Troubleshooting

### Port 3000 already in use
```bash
npm start -- --port 3001
```

### Dependencies not installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
npm run eject  # (Note: this is irreversible)
# or
delete node_modules and reinstall
```

## Project Statistics

- **Total Components**: 20+
- **Lines of CSS**: 700+
- **API Integration Points**: 15+
- **Pages**: 10+
- **Forms**: 6
- **Response Breakpoints**: Mobile, Tablet, Desktop

## Support & Documentation

- Check `README.md` for full documentation
- React Router docs: https://reactrouter.com
- React Hot Toast: https://react-hot-toast.com
- CSS Variables used for theming in `App.css`

## Next Steps

1. ✅ Frontend setup complete
2. ⏭️ Build your Node.js/Express backend
3. ⏭️ Set up MongoDB/PostgreSQL database
4. ⏭️ Update API endpoints for live data
5. ⏭️ Deploy frontend & backend

Happy coding! 🚀
