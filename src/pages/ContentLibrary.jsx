// import React, { useEffect, useState } from 'react';
import { useContent } from '../features/content/useContent';

export default function ContentLibrary() {
  const { fetchContent } = useContent();
  const [contents, setContents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchContent();
      setContents(data);
      setLoading(false);
    };
    load();
  }, []);

  const filteredContent = contents.filter(item =>
    filter === 'all' ? true : item.type === filter
  );

  return (
    <div className="text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">📚 Content Library</h2>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['all', 'video', 'pdf', 'text', 'audio'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded text-sm border ${
              filter === type
                ? 'bg-blue-600 text-white'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading content...</p>
      ) : filteredContent.length === 0 ? (
        <p>No content found for "{filter}"</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredContent.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-sm mb-2 text-gray-600 dark:text-gray-400">
                {item.type.toUpperCase()} · {item.topic}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm underline"
              >
                View / Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
