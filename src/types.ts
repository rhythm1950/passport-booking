// Include interfaces for User/Booking/Pagination/Bag and OTP bodies.
// Booking.status supports "initial" and "pre_booked" at a minimum.
// Booking list response must have pagination { current_page, per_page, total, total_pages, has_next, has_prev? }.

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export type BookingStatus = 'initial' | 'pre_booked' | string;

export interface Booking {
  id: string;
  user_id: string;
  reference?: string;
  status: BookingStatus;
  scheduled_at?: string;
  created_at?: string;
  updated_at?: string;
  // extend with other fields as needed
}

export interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev?: boolean;
}

export interface BookingListResponse {
  data: Booking[];
  pagination: Pagination;
}

export interface Bag {
  id: string;
  label?: string;
  weight?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OTPRequestBody {
  phone: string;
  purpose?: string;
}

export interface OTPVerifyBody {
  phone: string;
  code: string;
}

export interface ApiError {
  message: string;
  code?: string | number;
  details?: unknown;
}
