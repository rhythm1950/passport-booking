import api, { setTokens } from '../../lib/api';
import type { User } from '../../types';

interface LoginResponse {
  data: {
    user: User;
    tokens: {
      access: string;
      refresh?: string;
    };
  };
}

export async function login(username: string, password: string): Promise<User> {
  const payload = { username, password };
  const resp = await api.post<LoginResponse>('/login', payload);
  const body = resp.data;
  if (body && body.data && body.data.tokens && body.data.tokens.access) {
    setTokens(body.data.tokens.access, body.data.tokens.refresh);
  }
  return body.data.user;
}
