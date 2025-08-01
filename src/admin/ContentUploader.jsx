import React, { useState } from 'react';
import { supabase } from '../utils/apiClient';

export default function ContentUploader() {
  const [form, setForm] = useState({
    title: '',
    topic: '',
    type: 'pdf',
    url: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { error } = await supabase.from('contents').insert([form]);
    if (error) {
      console.error(error);
      setMessage('❌ Failed to upload.');
    } else {
      setMessage('✅ Content uploaded!');
      setForm({ title: '', topic: '', type: 'pdf', url: '' });
    }
  };

  return (
    <div className="text-gray-800 dark:text-white max-w-md">
      <h2 className="text-2xl font-bold mb-4">📤 Upload Content</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="input w-full"
          required
        />
        <input
          name="topic"
          placeholder="Topic"
          value={form.topic}
          onChange={handleChange}
          className="input w-full"
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="input w-full"
        >
          <option value="pdf">PDF</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
          <option value="text">Text</option>
        </select>
        <input
          name="url"
          placeholder="Content URL"
          value={form.url}
          onChange={handleChange}
          className="input w-full"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
}
