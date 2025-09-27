import type {
  CreateBagBody,
  AddBagItemBody,
  ReceiveBagBody,
  ReceivedBag,
} from '../types';

// CLAUDE_TODO: Replace all bag mock functions with real API calls
// File: src/services/bags.ts
// Replace createMock with: async (body: CreateBagBody) => axios.post('/api/bags', body)
// Replace addItemMock with: async (body: AddBagItemBody) => axios.post('/api/bags/items', body)
// Replace closeMock with: async (args) => axios.patch(`/api/bags/${args.bag_id}/close`)
// Replace receiveMock with: async (body: ReceiveBagBody) => axios.post('/api/bags/receive', body)
// Replace receivedListMock with: async () => axios.get('/api/bags/received')

const MOCK_RECEIVED_BAGS: ReceivedBag[] = [
  {
    id: '1',
    bag_id: 'BAG001',
    received_at: '2024-01-15T15:30:00Z',
    items_count: 5,
    recv_instruction: 'Handle with care',
    line_id: 'LINE001',
    items: [
      { order_id: 'APP001', status: 'delivered' },
      { order_id: 'APP002', status: 'pending' },
    ],
  },
];

export const createMock = async (body: CreateBagBody): Promise<{ bag_id: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const bag_id = `BAG${Date.now().toString().slice(-6)}`;
  return { bag_id };
};

export const addItemMock = async (body: AddBagItemBody): Promise<{ ok: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { ok: true };
};

export const closeMock = async (args: { bag_id: string }): Promise<{ closed: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { closed: true };
};

export const receiveMock = async (body: ReceiveBagBody): Promise<{ received: boolean; items: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  const items = body.receive_items.split(',').length;
  MOCK_RECEIVED_BAGS.push({
    id: Date.now().toString(),
    bag_id: body.bag_id,
    received_at: new Date().toISOString(),
    items_count: items,
    recv_instruction: body.recv_instruction,
    line_id: body.line_id,
    items: [],
  });
  
  return { received: true, items };
};

export const receivedListMock = async (): Promise<ReceivedBag[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return MOCK_RECEIVED_BAGS;
};