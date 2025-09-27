import type { User } from '../types';

// CLAUDE_TODO: Replace this with real API integration
// File: src/services/auth.ts
// Replace loginMock with: async (body: LoginBody) => axios.post('/api/auth/login', body)
// Replace logoutMock with: async () => axios.post('/api/auth/logout')
// Expected responses: { user: User, permissions: string[], token: string }

const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: 'System Administrator',
    role: 'admin',
    permissions: ['*'],
  },
  {
    id: 2,
    username: 'operator',
    password: 'operator123',
    name: 'Passport Operator',
    role: 'operator',
    branch_code: 'DHK001',
    permissions: ['bookings.create', 'bookings.update', 'bags.manage'],
  },
];

export const loginMock = async (body: {
  username: string;
  password: string;
}): Promise<{ user: User; permissions: string[] }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = MOCK_USERS.find(
    (u) => u.username === body.username && u.password === body.password
  );

  if (!user) {
    throw new Error('Invalid username or password');
  }

  const { password, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword,
    permissions: user.permissions,
  };
};

export const logoutMock = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return Promise.resolve();
};