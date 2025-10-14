import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as bookingService from '../features/booking/service';
import * as bagService from '../features/bag/service';
import type { Booking } from '../types';

// Booking hooks
export function useCreateBooking() {
  const qc = useQueryClient();
  return useMutation(bookingService.createBooking, {
    onSuccess: () => qc.invalidateQueries(['bookings']),
  });
}

export function useUpdateBooking() {
  const qc = useQueryClient();
  return useMutation(({ id, payload }: { id: string; payload: any }) => bookingService.updateBooking(id, payload), {
    onSuccess: () => qc.invalidateQueries(['bookings']),
  });
}

export function useListBookings(params?: { page?: number; per_page?: number; from_date?: Date | string; to_date?: Date | string; status?: string }) {
  return useQuery(['bookings', params], () => bookingService.listBookings(params).then((r) => r.data));
}

export function useBookingDetails(id: string | undefined) {
  return useQuery(['booking', id], () => bookingService.getBookingDetails(id as string).then((r) => r.data), { enabled: !!id });
}

// OTP hooks
export function useApplyDeliveryPhone() {
  return useMutation(bookingService.applyDeliveryPhone);
}

export function useVerifyDeliveryPhone() {
  return useMutation(bookingService.verifyDeliveryPhone);
}

export function useResendOtp() {
  return useMutation(bookingService.resendOtp);
}

export function useOtpRetryInfo() {
  return useMutation(bookingService.otpRetryInfo);
}

// Bag hooks
export function useCreateBag() {
  const qc = useQueryClient();
  return useMutation(bagService.createBag, { onSuccess: () => qc.invalidateQueries(['bags']) });
}

export function useAddItemToBag() {
  const qc = useQueryClient();
  return useMutation(bagService.addItemToBag, { onSuccess: () => qc.invalidateQueries(['bags']) });
}

export function useCloseBag() {
  const qc = useQueryClient();
  return useMutation(bagService.closeBag, { onSuccess: () => qc.invalidateQueries(['bags']) });
}

export function useReceiveBag() {
  const qc = useQueryClient();
  return useMutation(bagService.receiveBag, { onSuccess: () => qc.invalidateQueries(['bags']) });
}

export function useBranchList(params?: Record<string, unknown>) {
  return useQuery(['bag-branches', params], () => bagService.branchList(params).then((r) => r.data));
}

export function useBranchMapping() {
  return useMutation(bagService.branchMapping);
}

export function useOperatorList(params?: Record<string, unknown>) {
  return useQuery(['bag-operators', params], () => bagService.operatorList(params).then((r) => r.data));
}
