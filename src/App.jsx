import { useState } from 'react'
import './App.css'
import { questions } from './data/questions';
import QuestionCard from './components/QuestionCard';
import LeaderboardPage from './components/LeaderboardPage';

export default function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [finished, setFinished] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const handleAnswer = (choice) => {
    const correct = questions[current].answer;
    if (choice === correct) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback(`Wrong—it was ${correct}`);
    }
  };

  const handleNext = () => {
    setFeedback('');
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setFeedback('');
      setCurrent(current - 1);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setFeedback('');
  };

  const handleLogout = () => {
    setCurrentUser('');
    setShowLeaderboard(false);
    setFinished(false);
  };

  const handleViewLeaderboard = () => {
    setShowLeaderboard(true);
  };

  if (showLeaderboard) {
    return (
      <LeaderboardPage
        currentUser={currentUser}
        onPlayAgain={() => {
          setShowLeaderboard(false);
          setFinished(false);
        }}
        onLogout={handleLogout}
      />
    );
  }

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
        <button
          onClick={handleViewLeaderboard}
          className="ml-4 px-4 py-2 bg-gray-500 text-white rounded"
        >
          View Leaderboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-4">
        Question {current + 1} / {questions.length}
      </div>
      <QuestionCard question={questions[current]} onAnswer={handleAnswer} />
      {feedback && <div className="mt-4 text-lg">{feedback}</div>}
      <button
        onClick={handleBack}
        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded mr-2"
      >
        Back
      </button>
      <button
        onClick={handleNext}
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded"
      >
        Next
      </button>
    </div>
  );
}