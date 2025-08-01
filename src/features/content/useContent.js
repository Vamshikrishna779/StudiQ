import { useState } from 'react';
import { supabase } from '../../utils/apiClient';

export const useContent = () => {
  const fetchContent = async () => {
    const { data, error } = await supabase.from('contents').select('*');
    if (error) {
      console.error('Failed to fetch content:', error);
      return [];
    }
    return data;
  };

  return { fetchContent };
};
