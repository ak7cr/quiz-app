// User data storage in localStorage
const USER_STORAGE_KEY = 'quiz_users';
const LEADERBOARD_KEY = 'quiz_leaderboard';

// Initialize storage if not exists
const initStorage = () => {
  if (!localStorage.getItem(USER_STORAGE_KEY)) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({}));
  }
  if (!localStorage.getItem(LEADERBOARD_KEY)) {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify([]));
  }
};

// Get all users
export const getUsers = () => {
  initStorage();
  return JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
};

// Create or validate user
export const authenticateUser = (username) => {
  const users = getUsers();

  // Check if user exists
  if (users[username]) {
    return true;
  } else {
    // Create new user
    users[username] = true; // No password required
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
    return true;
  }
};

// Leaderboard functions
export const getLeaderboard = () => {
  initStorage();
  return JSON.parse(localStorage.getItem(LEADERBOARD_KEY));
};

export const updateLeaderboard = (username, score, timeSpent) => {
  const leaderboard = getLeaderboard();
  
  // Calculate points based on score and time
  const points = Math.round((score * 100) - (timeSpent / 2));
  
  // Add new entry
  leaderboard.push({
    username,
    score,
    timeSpent,
    points,
    date: new Date().toISOString()
  });
  
  // Sort leaderboard by points (highest first)
  leaderboard.sort((a, b) => b.points - a.points);
  
  // Keep only top 50 entries
  const topEntries = leaderboard.slice(0, 50);
  
  // Save to storage
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(topEntries));
  
  return topEntries;
};