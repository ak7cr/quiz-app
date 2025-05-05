import React from 'react';

export default function QuestionCard({ question, onAnswer }) {
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-black">{question.text}</h2>
      <div className="space-y-2">
        {question.options.map(opt => (
          <button
            key={opt}
            className="block w-full p-2 border rounded hover:bg-gray-100"
            onClick={() => onAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}