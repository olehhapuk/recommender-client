import axios from 'axios';

import { User } from '@/types/entities/user.entity';

interface LoginUserDto {
  username: string;
  password: string;
}

interface RegisterUserDto {
  username: string;
  password: string;
  email: string;
}

export async function login(
  userData: LoginUserDto
): Promise<{ accessToken: string; user: User }> {
  const res = await axios.post('/auth/login', userData);
  return res.data;
}

export async function register(
  userData: RegisterUserDto
): Promise<{ accessToken: string; user: User }> {
  const res = await axios.post('/auth/register', userData);
  return res.data;
}

export async function getProfile(authHeader: string): Promise<User> {
  const res = await axios.get('/auth/profile', {
    headers: {
      authorization: authHeader,
    },
  });

  return res.data;
}
