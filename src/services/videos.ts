import axios from 'axios';

import { Video } from '@/types/entities/video.entity';

export const fetchTrending = async (): Promise<Video[]> => {
  const response = await axios.get('/popular');
  return response.data;
};

export const fetchFeed = async (authHeader: string): Promise<Video[]> => {
  const response = await axios.get('/feed', {
    headers: {
      authorization: authHeader,
    },
  });
  return response.data;
};
