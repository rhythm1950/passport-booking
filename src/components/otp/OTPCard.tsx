import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { formatCountdown } from '../../lib/date';
import { cn } from '../../lib/utils';
import * as otpService from '../../services/otp';
import type { OTPState } from '../../types';

interface OTPCardProps {
  bookingId: number;
  className?: string;
}

export function OTPCard({ bookingId, className }: OTPCardProps) {
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [state, setState] = useState<OTPState>({
    applied: false,
    verified: false,
    attempts_left: 3,
  });
  const [loading, setLoading] = useState('');
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (state.expires_at) {
      const interval = setInterval(() => {
        const remaining = formatCountdown(state.expires_at!);
        setCountdown(remaining);
        
        if (remaining === '00:00') {
          clearInterval(interval);
          setState(prev => ({ ...prev, applied: false, expires_at: undefined }));
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [state.expires_at]);

  const handleApply = async () => {
    if (!phone.trim()) return;
    
    setLoading('apply');
    try {
      const result = await otpService.applyMock({ booking_id: bookingId, delivery_phone: phone });
      setState(prev => ({
        ...prev,
        applied: result.ok,
        expires_at: result.expires_at,
        verified: false,
      }));
      setOtpCode('');
    } catch (error) {
      console.error('OTP apply failed:', error);
    } finally {
      setLoading('');
    }
  };

  const handleVerify = async () => {
    if (!otpCode.trim()) return;
    
    setLoading('verify');
    try {
      const result = await otpService.verifyMock({
        booking_id: bookingId,
        phone: phone,
        otp_code: otpCode,
      });
      
      setState(prev => ({
        ...prev,
        verified: result.verified,
        attempts_left: result.verified ? prev.attempts_left : Math.max(0, prev.attempts_left - 1),
      }));
      
      if (!result.verified && state.attempts_left <= 1) {
        setState(prev => ({ 
          ...prev, 
          applied: false,
          blocked_until: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        }));
      }
    } catch (error) {
      console.error('OTP verify failed:', error);
    } finally {
      setLoading('');
    }
  };

  const handleRetryInfo = async () => {
    setLoading('retry');
    try {
      const result = await otpService.retryInfoMock({ booking_id: bookingId, phone });
      setState(prev => ({
        ...prev,
        attempts_left: result.attempts_left,
        blocked_until: result.blocked_until,
      }));
    } catch (error) {
      console.error('Retry info failed:', error);
    } finally {
      setLoading('');
    }
  };

  const handleResend = async () => {
    setLoading('resend');
    try {
      await otpService.resendMock({ booking_id: bookingId, phone });
      const expires_at = new Date(Date.now() + 5 * 60 * 1000).toISOString();
      setState(prev => ({ ...prev, expires_at }));
      setOtpCode('');
    } catch (error) {
      console.error('OTP resend failed:', error);
    } finally {
      setLoading('');
    }
  };

  const isBlocked = state.blocked_until && new Date(state.blocked_until) > new Date();

  return (
    <div className={cn('bg-white rounded-2xl border border-gray-200 p-6 shadow-sm', className)}>
      <div className="flex items-center gap-2 mb-4">
        {state.verified ? (
          <CheckCircle className="h-5 w-5 text-green-600" />
        ) : state.applied ? (
          <Clock className="h-5 w-5 text-blue-600" />
        ) : (
          <XCircle className="h-5 w-5 text-gray-400" />
        )}
        <h3 className="font-semibold text-gray-900">OTP Verification</h3>
      </div>

      {state.verified ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-medium">Phone number verified successfully!</span>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div>
              <label htmlFor="delivery-phone" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Phone Number
              </label>
              <input
                id="delivery-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880XXXXXXXXXX"
                disabled={state.applied || isBlocked}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                data-testid="otp-phone-input"
              />
            </div>

            {state.applied && (
              <div>
                <label htmlFor="otp-code" className="block text-sm font-medium text-gray-700 mb-1">
                  OTP Code
                </label>
                <input
                  id="otp-code"
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                  data-testid="otp-code-input"
                />
                {countdown && (
                  <p className="mt-1 text-xs text-gray-500">
                    OTP expires in: <span className="font-mono font-medium">{countdown}</span>
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {!state.applied ? (
                <button
                  onClick={handleApply}
                  disabled={!phone.trim() || loading === 'apply' || isBlocked}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  data-testid="otp-apply-btn"
                >
                  {loading === 'apply' && <RefreshCw className="h-4 w-4 animate-spin" />}
                  Apply OTP
                </button>
              ) : (
                <>
                  <button
                    onClick={handleVerify}
                    disabled={!otpCode.trim() || loading === 'verify' || state.attempts_left <= 0}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    data-testid="otp-verify-btn"
                  >
                    {loading === 'verify' && <RefreshCw className="h-4 w-4 animate-spin" />}
                    Verify
                  </button>
                  
                  <button
                    onClick={handleResend}
                    disabled={loading === 'resend'}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    data-testid="otp-resend-btn"
                  >
                    {loading === 'resend' && <RefreshCw className="h-4 w-4 animate-spin" />}
                    Resend
                  </button>
                  
                  <button
                    onClick={handleRetryInfo}
                    disabled={loading === 'retry'}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    data-testid="otp-retry-btn"
                  >
                    {loading === 'retry' && <RefreshCw className="h-4 w-4 animate-spin" />}
                    Retry Info
                  </button>
                </>
              )}
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>Attempts remaining: <span className="font-medium">{state.attempts_left}</span></p>
              {isBlocked && (
                <p className="text-red-600">
                  Blocked until: {new Date(state.blocked_until!).toLocaleTimeString()}
                </p>
              )}
              {!state.applied && (
                <p className="text-gray-500 text-xs">
                  Tip: Use OTP code "123456" for testing
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}