export interface User {
  id: number;
  username: string;
  name: string;
  role: string;
  branch_code?: string;
  permissions: string[];
}

export interface BookingListItem {
  id: number;
  app_or_order_id: string;
  name: string;
  phone: string;
  status: 'initial' | 'pre_booked' | 'BAGGED' | 'CLOSED' | 'RECEIVED';
  created_at: string;
  delivery_branch_code?: string;
}

export interface BookingDetails {
  id: number;
  app_or_order_id: string;
  name: string;
  father_name: string;
  mother_name: string;
  phone: string;
  address: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  delivery_branch_code?: string;
  receiver_name?: string;
  division?: string;
  district?: string;
  police_station?: string;
  post_office?: string;
  street_address?: string;
  address_type?: 'home' | 'office';
  status: 'initial' | 'pre_booked' | 'BAGGED' | 'CLOSED' | 'RECEIVED';
  created_at: string;
  updated_at: string;
  status_history: Array<{
    status: string;
    timestamp: string;
    note?: string;
  }>;
}

export interface CreateBookingBody {
  app_or_order_id: string;
  name: string;
  father_name: string;
  mother_name: string;
  phone: string;
  address: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
}

export interface UpdateBookingBody {
  delivery_branch_code: string;
  receiver_name: string;
  division: string;
  district: string;
  police_station: string;
  post_office: string;
  street_address: string;
  address_type: 'home' | 'office';
}

export interface CreateBagBody {
  bag_category: string;
  bag_type: string;
  dest_office_code: string;
  rms_instruction: string;
}

export interface AddBagItemBody {
  order_id: string;
  bag_type: string;
  bag_id: string;
  index: number;
}

export interface ReceiveBagBody {
  bag_id: string;
  recv_instruction: string;
  line_id: string;
  receive_items: string;
}

export interface ReceivedBag {
  id: string;
  bag_id: string;
  received_at: string;
  items_count: number;
  recv_instruction: string;
  line_id: string;
  items: Array<{
    order_id: string;
    status: string;
  }>;
}

export interface Operator {
  id: number;
  username: string;
  name: string;
  role: string;
  branch_code?: string;
  last_login?: string;
  status: 'active' | 'inactive';
}

export interface Branch {
  code: string;
  name: string;
  division: string;
  district: string;
  type: 'main' | 'sub';
}

export interface BranchMappingBody {
  username: string;
  branch_code: string;
  relationship: 'primary' | 'secondary';
}

export interface Page<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface OTPState {
  applied: boolean;
  verified: boolean;
  attempts_left: number;
  expires_at?: string;
  blocked_until?: string;
}