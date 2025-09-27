import type {
  BookingListItem,
  BookingDetails,
  CreateBookingBody,
  UpdateBookingBody,
  Page,
} from '../types';

// CLAUDE_TODO: Replace all mock functions with real API calls
// File: src/services/bookings.ts
// Replace createMock with: async (body: CreateBookingBody) => axios.post('/api/bookings', body)
// Replace updateMock with: async (id: number, body: UpdateBookingBody) => axios.put(`/api/bookings/${id}`, body)
// Replace listMock with: async (params) => axios.get('/api/bookings', { params })
// Replace detailsMock with: async (id: number) => axios.get(`/api/bookings/${id}`)
// Expected responses: { id: number } for create/update, Page<BookingListItem> for list, BookingDetails for details

const MOCK_BOOKINGS: BookingListItem[] = [
  {
    id: 1,
    app_or_order_id: 'APP001',
    name: 'Mohammad Rahman',
    phone: '+8801712345678',
    status: 'initial',
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    app_or_order_id: 'APP002',
    name: 'Fatima Khatun',
    phone: '+8801812345679',
    status: 'pre_booked',
    created_at: '2024-01-14T14:20:00Z',
    delivery_branch_code: 'DHK001',
  },
  {
    id: 3,
    app_or_order_id: 'APP003',
    name: 'Abdul Karim',
    phone: '+8801912345680',
    status: 'BAGGED',
    created_at: '2024-01-13T09:15:00Z',
    delivery_branch_code: 'CTG001',
  },
];

export const createMock = async (body: CreateBookingBody): Promise<{ id: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const newId = Math.max(...MOCK_BOOKINGS.map(b => b.id)) + 1;
  
  MOCK_BOOKINGS.push({
    id: newId,
    app_or_order_id: body.app_or_order_id,
    name: body.name,
    phone: body.phone,
    status: 'initial',
    created_at: new Date().toISOString(),
  });
  
  return { id: newId };
};

export const updateMock = async (id: number, body: UpdateBookingBody): Promise<{ id: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const booking = MOCK_BOOKINGS.find(b => b.id === id);
  if (!booking) throw new Error('Booking not found');
  
  booking.delivery_branch_code = body.delivery_branch_code;
  booking.status = 'pre_booked';
  
  return { id };
};

export const listMock = async (params: {
  page: number;
  per_page: number;
  status?: string;
  from?: string;
  to?: string;
}): Promise<Page<BookingListItem>> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  let filtered = MOCK_BOOKINGS;
  if (params.status) {
    filtered = filtered.filter(b => b.status === params.status);
  }
  
  const total = filtered.length;
  const start = (params.page - 1) * params.per_page;
  const end = start + params.per_page;
  const data = filtered.slice(start, end);
  
  return {
    data,
    total,
    page: params.page,
    per_page: params.per_page,
    total_pages: Math.ceil(total / params.per_page),
  };
};

export const detailsMock = async (id: number): Promise<BookingDetails> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  const booking = MOCK_BOOKINGS.find(b => b.id === id);
  if (!booking) throw new Error('Booking not found');
  
  return {
    ...booking,
    father_name: 'Abdul Rahman',
    mother_name: 'Rashida Begum',
    address: 'House 123, Road 456, Dhanmondi, Dhaka',
    emergency_contact_name: 'Ahmed Rahman',
    emergency_contact_phone: '+8801612345678',
    receiver_name: 'Mohammad Rahman',
    division: 'Dhaka',
    district: 'Dhaka',
    police_station: 'Dhanmondi',
    post_office: 'Dhanmondi',
    street_address: 'House 123, Road 456',
    address_type: 'home',
    updated_at: '2024-01-15T11:30:00Z',
    status_history: [
      { status: 'initial', timestamp: '2024-01-15T10:30:00Z' },
      { status: 'pre_booked', timestamp: '2024-01-15T11:30:00Z', note: 'Address updated' },
    ],
  };
};