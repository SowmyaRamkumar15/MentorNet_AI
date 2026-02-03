// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// User Roles
export const USER_ROLES = {
  JUNIOR: 'junior',
  SENIOR: 'senior',
  ADMIN: 'admin'
};

// Doubt Categories
export const DOUBT_CATEGORIES = [
  'Technical',
  'Career',
  'General',
  'Internship',
  'Projects'
];

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  PREFERENCES: 'userPreferences'
};

// Pagination
export const ITEMS_PER_PAGE = 10;

// Timeouts
export const REQUEST_TIMEOUT = 30000;
