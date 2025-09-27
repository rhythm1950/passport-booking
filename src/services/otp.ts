// CLAUDE_TODO: Replace all OTP mock functions with real API calls
// File: src/services/otp.ts
// Replace applyMock with: async (args) => axios.post('/api/otp/apply', args)
// Replace verifyMock with: async (args) => axios.post('/api/otp/verify', args)
// Replace retryInfoMock with: async (args) => axios.get(`/api/otp/retry-info/${args.booking_id}/${args.phone}`)
// Replace resendMock with: async (args) => axios.post('/api/otp/resend', args)

export const applyMock = async (args: {
  booking_id: number;
  delivery_phone: string;
}): Promise<{ ok: boolean; expires_at: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  
  const expires_at = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes
  return {
    ok: true,
    expires_at,
  };
};

export const verifyMock = async (args: {
  booking_id: number;
  phone: string;
  otp_code: string;
}): Promise<{ verified: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // Mock verification - accept "123456" as valid OTP
  return {
    verified: args.otp_code === '123456',
  };
};

export const retryInfoMock = async (args: {
  booking_id: number;
  phone: string;
}): Promise<{ attempts_left: number; blocked_until?: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return {
    attempts_left: 2,
    blocked_until: undefined,
  };
};

export const resendMock = async (args: {
  booking_id: number;
  phone: string;
}): Promise<{ sent: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return {
    sent: true,
  };
};