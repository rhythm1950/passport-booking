import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const bookingCreateSchema = z.object({
  app_or_order_id: z.string().min(1),
  name: z.string().min(1),
  father_name: z.string().optional(),
  mother_name: z.string().optional(),
  phone: z.string().min(1),
  address: z.string().min(1),
  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: z.string().optional(),
});

export const bookingUpdateSchema = z.object({
  delivery_branch_code: z.string().optional(),
  receiver_name: z.string().optional(),
  division: z.string().optional(),
  district: z.string().optional(),
  police_station: z.string().optional(),
  post_office: z.string().optional(),
  street_address: z.string().optional(),
  address_type: z.string().optional(),
});

export const otpApplySchema = z.object({
  phone: z.string().min(1),
  booking_id: z.string().optional(),
  purpose: z.literal('delivery_phone_apply_verification'),
});

export const otpVerifySchema = z.object({
  phone: z.string().min(1),
  code: z.string().min(1),
  purpose: z.union([
    z.literal('delivery_phone_apply_verification'),
    z.literal('delivery_phone_confirm_verification'),
  ]),
  booking_id: z.string().optional(),
});

export const otpResendSchema = z.object({
  phone: z.string().min(1),
  booking_id: z.string().optional(),
  purpose: z.literal('delivery_phone_confirm_verification'),
});
