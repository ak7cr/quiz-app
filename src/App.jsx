import { useState } from 'react'
import './App.css'
import LoginPage from './components/LoginPage';
import QuizPage from './components/QuizPage';
import LeaderboardPage from './components/LeaderboardPage';

export default function App() {
  const [username, setUsername] = useState('');
  const [page, setPage] = useState('login'); // login, quiz, leaderboard
  const [quizResult, setQuizResult] = useState({ score: 0, timeSpent: 0 });

  const handleLogin = (user) => {
    setUsername(user);
    setPage('quiz');
  };

  const handleQuizFinish = (score, timeSpent) => {
    setQuizResult({ score, timeSpent });
    setPage('leaderboard');
  };

  const handlePlayAgain = () => {
    setPage('quiz');
  };

  const handleLogout = () => {
    setUsername('');
    setPage('login');
  };

  return (
    <div className="app min-h-screen bg-gray-50">
      {page === 'login' && (
        <LoginPage onLogin={handleLogin} />
      )}

      {page === 'quiz' && (
        <QuizPage 
          username={username} 
          onFinish={handleQuizFinish} 
        />
      )}

      {page === 'leaderboard' && (
        <LeaderboardPage 
          currentUser={username}
          onPlayAgain={handlePlayAgain}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}