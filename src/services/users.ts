import axios from 'axios';

import { User } from '@/types/entities/user.entity';
import { Video } from '@/types/entities/video.entity';

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await axios.get(`/users/${id}`);
  return response.data;
};

export const fetchUserVideos = async (id: number): Promise<Video[]> => {
  const response = await axios.get(`/users/${id}/uploads`);
  return response.data;
};
