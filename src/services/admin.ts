import type { BranchMappingBody, Operator, Branch } from '../types';

// CLAUDE_TODO: Replace all admin mock functions with real API calls
// File: src/services/admin.ts
// Replace branchMappingMock with: async (body: BranchMappingBody) => axios.post('/api/admin/branch-mapping', body)
// Replace operatorsMock with: async () => axios.get('/api/admin/operators')
// Replace branchSearchMock with: async (q: string) => axios.get(`/api/admin/branches/search?q=${q}`)

const MOCK_OPERATORS: Operator[] = [
  {
    id: 1,
    username: 'admin',
    name: 'System Administrator',
    role: 'admin',
    last_login: '2024-01-15T12:30:00Z',
    status: 'active',
  },
  {
    id: 2,
    username: 'operator',
    name: 'Passport Operator',
    role: 'operator',
    branch_code: 'DHK001',
    last_login: '2024-01-15T10:15:00Z',
    status: 'active',
  },
];

const MOCK_BRANCHES: Branch[] = [
  { code: 'DHK001', name: 'Dhaka Main Office', division: 'Dhaka', district: 'Dhaka', type: 'main' },
  { code: 'DHK002', name: 'Dhaka Sub Office 1', division: 'Dhaka', district: 'Dhaka', type: 'sub' },
  { code: 'CTG001', name: 'Chittagong Main Office', division: 'Chittagong', district: 'Chittagong', type: 'main' },
  { code: 'SYL001', name: 'Sylhet Main Office', division: 'Sylhet', district: 'Sylhet', type: 'main' },
];

export const branchMappingMock = async (body: BranchMappingBody): Promise<{ ok: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { ok: true };
};

export const operatorsMock = async (): Promise<Operator[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return MOCK_OPERATORS;
};

export const branchSearchMock = async (q: string): Promise<Branch[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  
  const query = q.toLowerCase();
  return MOCK_BRANCHES.filter(
    (branch) =>
      branch.name.toLowerCase().includes(query) ||
      branch.code.toLowerCase().includes(query) ||
      branch.division.toLowerCase().includes(query)
  );
};