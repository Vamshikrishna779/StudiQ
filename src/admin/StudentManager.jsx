import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/apiClient';

export default function StudentManager() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'student');

      if (error) console.error(error);
      else setStudents(data);
    };
    load();
  }, []);

  return (
    <div className="text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">👥 Student Manager</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Progress</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i} className="border-t dark:border-gray-700">
                  <td className="p-2">{s.name || 'N/A'}</td>
                  <td className="p-2">{s.email}</td>
                  <td className="p-2">Coming soon</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
