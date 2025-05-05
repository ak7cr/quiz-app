import { useState } from 'react'
import './App.css'
import { questions } from './data/questions';
import QuestionCard from './components/QuestionCard';

export default function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [finished, setFinished] = useState(false);

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

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setFeedback('');
  };

  if (finished) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl mb-4">Your Score: {score} / {questions.length}</h1>
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

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