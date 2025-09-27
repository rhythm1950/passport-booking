import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const createBookingSchema = z.object({
  app_or_order_id: z.string().min(1, 'Application/Order ID is required'),
  name: z.string().min(1, 'Name is required'),
  father_name: z.string().min(1, 'Father name is required'),
  mother_name: z.string().min(1, 'Mother name is required'),
  phone: z.string().min(11, 'Valid phone number is required'),
  address: z.string().min(1, 'Address is required'),
  emergency_contact_name: z.string().min(1, 'Emergency contact name is required'),
  emergency_contact_phone: z.string().min(11, 'Valid emergency contact phone is required'),
});

export const updateBookingSchema = z.object({
  delivery_branch_code: z.string().min(1, 'Delivery branch code is required'),
  receiver_name: z.string().min(1, 'Receiver name is required'),
  division: z.string().min(1, 'Division is required'),
  district: z.string().min(1, 'District is required'),
  police_station: z.string().min(1, 'Police station is required'),
  post_office: z.string().min(1, 'Post office is required'),
  street_address: z.string().min(1, 'Street address is required'),
  address_type: z.enum(['home', 'office']),
});

export const createBagSchema = z.object({
  bag_category: z.string().min(1, 'Bag category is required'),
  bag_type: z.string().min(1, 'Bag type is required'),
  dest_office_code: z.string().min(1, 'Destination office code is required'),
  rms_instruction: z.string().optional(),
});

export const addBagItemSchema = z.object({
  order_id: z.string().min(1, 'Order ID is required'),
  bag_type: z.string().min(1, 'Bag type is required'),
  bag_id: z.string().min(1, 'Bag ID is required'),
  index: z.number().min(0, 'Index must be a positive number'),
});

export const receiveBagSchema = z.object({
  bag_id: z.string().min(1, 'Bag ID is required'),
  recv_instruction: z.string().optional(),
  line_id: z.string().min(1, 'Line ID is required'),
  receive_items: z.string().min(1, 'Receive items is required'),
});

export const branchMappingSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  branch_code: z.string().min(1, 'Branch code is required'),
  relationship: z.enum(['primary', 'secondary']),
});

export const phoneRegex = /^\+?880\d{10}$/;