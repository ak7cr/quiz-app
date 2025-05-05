import React from 'react';

export default function QuestionCard({ question, onAnswer }) {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg" style={{ minHeight: '300px', minWidth: '500px' }}>
      <div className="question-container" style={{ minHeight: '100px', display: 'flex', alignItems: 'center' }}>
        <h2 className="text-2xl font-semibold mb-6 text-black">{question.text}</h2>
      </div>
      <div className="space-y-3">
        {question.options.map(opt => (
          <button
            key={opt}
            className="block w-full p-3 border rounded-lg hover:bg-gray-200"
            onClick={() => onAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}