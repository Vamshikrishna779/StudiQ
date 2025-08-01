import { useState, useEffect, useRef } from 'react';
import { AIModel } from '../features/ai-tutor/aiModel';
import { useAuth } from '../features/auth/useAuth';
import { supabase } from '../utils/apiClient';

export default function AITutor() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load conversation history
  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
      
      if (data) setMessages(data);
    };
    fetchHistory();
  }, [user]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      content: input,
      role: 'user',
      user_id: user.id,
      created_at: new Date().toISOString()
    };

    // Optimistic update
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get AI response (works offline if model is cached)
      const aiResponse = await AIModel.predict(input);
      
      const aiMessage = {
        content: aiResponse,
        role: 'assistant',
        user_id: user.id,
        created_at: new Date().toISOString()
      };

      // Store in Supabase (will sync when online if offline)
      await supabase.from('chat_history').insert([userMessage, aiMessage]);
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, {
        content: "I'm having trouble connecting. Working in offline mode with limited capabilities.",
        role: 'system'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-3/4 p-3 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
            placeholder="Ask your AI tutor..."
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}