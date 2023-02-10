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

export const uploadVideoFile = async (
  authHeader: string,
  videoFile: File
): Promise<{ videoUrl: string; thumbnailUrl: string }> => {
  const formData = new FormData();
  formData.append('video', videoFile);

  const response = await axios.post('/videos/upload', formData, {
    headers: {
      authorization: authHeader,
    },
  });
  return response.data;
};

interface CreateVideoDto {
  description: string;
  tags: string[];
  thumbnailUrl: string;
  videoUrl: string;
}

export const createVideo = async (
  authHeader: string,
  data: CreateVideoDto
): Promise<Video> => {
  const response = await axios.post('/videos', data, {
    headers: {
      authorization: authHeader,
    },
  });
  return response.data;
};
