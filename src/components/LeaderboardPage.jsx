import React from 'react';
import { getLeaderboard } from '../data/users';

export default function LeaderboardPage({ currentUser, onPlayAgain, onLogout }) {
  const leaderboard = getLeaderboard();
  const userRank = leaderboard.findIndex(entry => entry.username === currentUser) + 1;

  // Format date nicely
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>
      
      {userRank > 0 && (
        <div className="bg-blue-100 p-4 rounded-lg mb-6 text-center">
          <p className="text-lg">Your Rank: <span className="font-bold">#{userRank}</span></p>
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time (sec)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <tr key={index} className={currentUser === entry.username ? "bg-blue-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {entry.username}
                    {currentUser === entry.username && <span className="ml-2 text-xs text-blue-600">(You)</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.score}/10</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.timeSpent}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">{entry.points}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(entry.date)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No scores yet. Be the first to play!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={onPlayAgain}
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Play Again
        </button>
        
        <button
          onClick={onLogout}
          className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
} 