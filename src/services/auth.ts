import axios from 'axios';

import { User } from '@/types/entities/user.entity';

interface LoginUserDto {
  username: string;
  password: string;
}

export async function login(
  userData: LoginUserDto
): Promise<{ accessToken: string; user: User }> {
  const res = await axios.post('/auth/login', userData);
  return res.data;
}
