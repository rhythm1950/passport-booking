import api from '../../lib/api';
import { toBackendDateTime } from '../../lib/date';
import type { Booking, BookingListResponse } from '../../types';

export async function createBooking(payload: {
  app_or_order_id: string;
  name: string;
  father_name: string;
  mother_name: string;
  phone: string;
  address: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}) {
  return api.post<{ data: Booking }>('/booking/create', payload);
}

export async function updateBooking(id: string, payload: {
  delivery_branch_code?: string;
  receiver_name?: string;
  division?: string;
  district?: string;
  police_station?: string;
  post_office?: string;
  street_address?: string;
  address_type?: string;
}) {
  return api.put<{ data: Booking }>(`/booking/create/update/${id}`, payload);
}

export async function listBookings(params: {
  page?: number;
  per_page?: number;
  from_date?: Date | string;
  to_date?: Date | string;
  status?: string;
}) {
  const qp: Record<string, string | number | undefined> = {};
  if (params.page !== undefined) qp.page = params.page;
  if (params.per_page !== undefined) qp.per_page = params.per_page;
  if (params.from_date) qp.from_date = toBackendDateTime(params.from_date);
  if (params.to_date) qp.to_date = toBackendDateTime(params.to_date);
  if (params.status) qp.status = params.status;

  return api.get<BookingListResponse>('/booking/list', { params: qp });
}

export async function getBookingDetails(id: string) {
  return api.get<{ data: Booking }>(`/booking/details/${id}`);
}

// OTP related
export async function applyDeliveryPhone(body: { phone: string; booking_id?: string }) {
  const payload = { ...body, purpose: 'delivery_phone_apply_verification' };
  return api.post('/booking/delivery-phone', payload);
}

export async function verifyDeliveryPhone(body: { phone: string; code: string; purpose?: string; booking_id?: string }) {
  return api.post('/booking/verify-delivery-phone', body);
}

export async function resendOtp(body: { phone: string; booking_id?: string }) {
  const payload = { ...body, purpose: 'delivery_phone_confirm_verification' };
  return api.post('/booking/resend-otp', payload);
}

export async function otpRetryInfo(body: { phone: string; booking_id?: string }) {
  return api.post('/booking/otp-retry-info', body);
}
