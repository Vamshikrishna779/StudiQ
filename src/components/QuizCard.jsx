import React from 'react';

export default function QuizCard({ question, options, onSelect }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">{question}</h2>
      <ul className="space-y-2">
        {options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => onSelect(option)}
              className="w-full text-left px-4 py-2 border rounded hover:bg-blue-50 dark:hover:bg-gray-700"
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
