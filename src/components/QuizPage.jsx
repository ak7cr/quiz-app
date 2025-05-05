import React, { useState, useEffect, useCallback } from 'react';
import { questions } from '../data/questions';
import { updateLeaderboard } from '../data/users';
import QuestionCard from './QuestionCard';

export default function QuizPage({ username, onFinish }) {
  // Get 10 random questions from the 50 total questions
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Select 10 random questions on component mount
  useEffect(() => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, 10));
  }, []);

  // Timer for the quiz
  useEffect(() => {
    if (isFinished) return;
    
    const timer = setInterval(() => {
      setTimeSpent(prevTime => prevTime + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isFinished]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = useCallback((choice) => {
    if (feedback) return; // Prevent multiple answers
    
    const currentQuestion = quizQuestions[currentIndex];
    const isCorrect = choice === currentQuestion.answer;
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setFeedback('Correct!');
    } else {
      setFeedback(`Wrong! The correct answer is: ${currentQuestion.answer}`);
    }
  }, [currentIndex, quizQuestions, feedback]);

  const handleNext = useCallback(() => {
    setFeedback('');
    
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      setIsFinished(true);
      // Update leaderboard with score and time
      updateLeaderboard(username, score + (feedback === 'Correct!' ? 1 : 0), timeSpent);
      onFinish(score + (feedback === 'Correct!' ? 1 : 0), timeSpent);
    }
  }, [currentIndex, quizQuestions.length, feedback, score, timeSpent, username, onFinish]);

  // If questions aren't loaded yet
  if (quizQuestions.length === 0) {
    return <div className="text-center p-8">Loading questions...</div>;
  }

  const currentQuestion = quizQuestions[currentIndex];
  
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-medium">
          Question {currentIndex + 1} / {quizQuestions.length}
        </div>
        <div className="flex space-x-4">
          <div className="text-lg">Score: {score}</div>
          <div className="text-lg bg-gray-100 px-3 py-1 rounded-lg">
            Time: {formatTime(timeSpent)}
          </div>
        </div>
      </div>
      
      <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
      
      {feedback && (
        <div className={`mt-6 p-4 rounded-lg text-white font-medium ${feedback.includes('Correct') ? 'bg-green-600' : 'bg-red-600'}`}>
          {feedback}
        </div>
      )}
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={!feedback && currentIndex < quizQuestions.length}
        >
          {currentIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      </div>
    </div>
  );
} 