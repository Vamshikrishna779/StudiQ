import React, { useState } from 'react';
import { supabase } from '../utils/apiClient';

export default function QuizManager() {
  const [form, setForm] = useState({
    question: '',
    options: '',
    correct_answer: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const quizData = {
      question: form.question,
      options: form.options.split(',').map(o => o.trim()),
      correct_answer: form.correct_answer.trim(),
    };

    const { error } = await supabase.from('quizzes').insert([quizData]);

    if (error) {
      console.error(error);
      setMessage('❌ Failed to save quiz.');
    } else {
      setMessage('✅ Quiz added!');
      setForm({ question: '', options: '', correct_answer: '' });
    }
  };

  return (
    <div className="text-gray-800 dark:text-white max-w-md">
      <h2 className="text-2xl font-bold mb-4">📝 Quiz Manager</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          name="question"
          placeholder="Question"
          value={form.question}
          onChange={handleChange}
          className="input w-full"
          required
        />
        <input
          name="options"
          placeholder="Comma-separated options"
          value={form.options}
          onChange={handleChange}
          className="input w-full"
          required
        />
        <input
          name="correct_answer"
          placeholder="Correct answer"
          value={form.correct_answer}
          onChange={handleChange}
          className="input w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
}
