import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">👨‍🏫 Admin Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">📊 Usage Analytics</h3>
          <p>Coming soon: User stats, content views, quiz completions.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">📂 Manage Content</h3>
          <p>Use ContentUploader to add or update content.</p>
        </div>
      </div>
    </div>
  );
}
