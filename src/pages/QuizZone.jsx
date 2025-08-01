import React, { useState, useEffect } from 'react';
import { useQuiz } from '../features/quiz/useQuiz';
import Confetti from "react-dom-confetti";


export default function QuizZone() {
  const { fetchQuiz } = useQuiz();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      const data = await fetchQuiz(); // get questions
      setQuestions(data || []);
      setLoading(false);
    };
    loadQuiz();
  }, []);

  const current = questions[index];

  const handleAnswer = (option) => {
    setSelected(option);
    setShowFeedback(true);
    if (option === current.correct_answer) {
      setCorrect((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowFeedback(false);
    setIndex((prev) => prev + 1);
  };

  if (loading) return <p>Loading quiz...</p>;
  if (!questions.length) return <p>No quiz questions available.</p>;

  return (
    <div className="text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">🧠 Quiz Zone</h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-xl">
        <p className="mb-2 text-sm text-gray-500">
          Question {index + 1} of {questions.length}
        </p>

        <h3 className="text-lg font-semibold mb-4">{current.question}</h3>

        <div className="space-y-2">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className={`block w-full px-4 py-2 rounded border ${
                selected === opt
                  ? opt === current.correct_answer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              disabled={showFeedback}
            >
              {opt}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className="mt-4">
            <p>
              {selected === current.correct_answer
                ? '✅ Correct!'
                : `❌ Incorrect. Correct: ${current.correct_answer}`}
            </p>
            {index < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
              >
                Next
              </button>
            ) : (
              <p className="mt-2 font-semibold">
                🎉 Quiz complete! You got {correct} out of {questions.length}.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
