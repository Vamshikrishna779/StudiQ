import { supabase } from '../../utils/apiClient';

export const useQuiz = () => {
  const fetchQuiz = async () => {
    const { data, error } = await supabase.from('quizzes').select('*');
    if (error) {
      console.error('Error fetching quiz:', error);
      return [];
    }

    return data.map(q => ({
      question: q.question,
      options: q.options, // should be an array in DB
      correct_answer: q.correct_answer,
    }));
  };

  return { fetchQuiz };
};
