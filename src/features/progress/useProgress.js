import { useEffect, useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { supabase } from '../utils/apiClient';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { DownloadManager } from '../features/offline/downloadManager';

Chart.register(...registerables);

export default function Progress() {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState(null);
  const [downloadedContent, setDownloadedContent] = useState([]);
  const [activeTab, setActiveTab] = useState('performance');

  useEffect(() => {
    const fetchData = async () => {
      // Get quiz performance
      const { data: quizData } = await supabase
        .rpc('get_user_progress', { user_id: user.id });

      // Get learning activity
      const { data: activityData } = await supabase
        .from('learning_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('started_at', { ascending: true });

      // Get downloaded content
      const downloaded = await DownloadManager.getDownloadedContent();
      setDownloadedContent(downloaded);

      setProgressData({
        quizPerformance: quizData || [],
        learningActivity: activityData || [],
        downloadedContent: downloaded
      });
    };

    fetchData();
  }, [user.id]);

  const handleDeleteContent = async (contentId) => {
    const { success } = await DownloadManager.deleteContent(contentId);
    if (success) {
      setDownloadedContent(prev => 
        prev.filter(item => item.id !== contentId)
    );
    }
  };

  if (!progressData) return <div className="p-4">Loading progress data...</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'performance'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('performance')}
        >
          Performance
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'activity'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'offline'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('offline')}
        >
          Offline Content
        </button>
      </div>

      {activeTab === 'performance' && (
        <div className="space-y-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Quiz Scores Over Time</h3>
            <Line
              data={{
                labels: progressData.quizPerformance.map(item => 
                  new Date(item.completed_at).toLocaleDateString()),
                datasets: [{
                  label: 'Score (%)',
                  data: progressData.quizPerformance.map(item => 
                    (item.correct_answers / item.total_questions) * 100),
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  tension: 0.3
                }]
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Subject Mastery</h3>
              <Pie
                data={{
                  labels: progressData.quizPerformance
                    .reduce((acc, item) => {
                      const existing = acc.find(i => i.subject === item.subject);
                      if (existing) {
                        existing.score += (item.correct_answers / item.total_questions);
                        existing.count++;
                      } else {
                        acc.push({
                          subject: item.subject,
                          score: (item.correct_answers / item.total_questions),
                          count: 1
                        });
                      }
                      return acc;
                    }, [])
                    .map(item => item.subject),
                  datasets: [{
                    data: progressData.quizPerformance
                      .reduce((acc, item) => {
                        const existing = acc.find(i => i.subject === item.subject);
                        if (existing) {
                          existing.score += (item.correct_answers / item.total_questions);
                          existing.count++;
                        } else {
                          acc.push({
                            subject: item.subject,
                            score: (item.correct_answers / item.total_questions),
                            count: 1
                          });
                        }
                        return acc;
                      }, [])
                      .map(item => (item.score / item.count) * 100),
                    backgroundColor: [
                      'rgba(59, 130, 246, 0.7)',
                      'rgba(16, 185, 129, 0.7)',
                      'rgba(245, 158, 11, 0.7)',
                      'rgba(239, 68, 68, 0.7)'
                    ]
                  }]
                }}
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Question Types</h3>
              <Bar
                data={{
                  labels: ['Multiple Choice', 'True/False', 'Fill-in', 'Matching'],
                  datasets: [{
                    label: 'Correct',
                    data: [85, 72, 63, 78], // Example data - replace with real
                    backgroundColor: 'rgba(16, 185, 129, 0.7)'
                  }, {
                    label: 'Incorrect',
                    data: [15, 28, 37, 22], // Example data - replace with real
                    backgroundColor: 'rgba(239, 68, 68, 0.7)'
                  }]
                }}
                options={{
                  scales: {
                    x: { stacked: true },
                    y: { stacked: true }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Learning Activity</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {progressData.learningActivity.map((session, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(session.started_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {Math.round(session.duration_minutes)} minutes
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.activity_type}
                    </td>
                    <td className="px-6 py-4">
                      {session.content_title || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'offline' && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Downloaded Content</h3>
          {downloadedContent.length === 0 ? (
            <p className="text-gray-500">No content downloaded for offline use</p>
          ) : (
            <div className="space-y-4">
              {downloadedContent.map((content) => (
                <div key={content.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{content.title}</h4>
                    <p className="text-sm text-gray-500">
                      {content.subject} • {content.type} • {content.level}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteContent(content.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}