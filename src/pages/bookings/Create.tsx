import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { createBookingSchema } from '../../lib/forms';
import { PhoneInput } from '../../components/form/PhoneInput';
import * as bookingsService from '../../services/bookings';
import type { z } from 'zod';

type CreateBookingFormData = z.infer<typeof createBookingSchema>;

export function CreateBooking() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateBookingFormData>({
    resolver: zodResolver(createBookingSchema),
  });

  const phoneValue = watch('phone');
  const emergencyPhoneValue = watch('emergency_contact_phone');

  const onSubmit = async (data: CreateBookingFormData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await bookingsService.createMock(data);
      setSuccess(true);
      
      // Show success message and redirect after delay
      setTimeout(() => {
        navigate(`/bookings/${result.id}/edit`);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Save className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Created Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Your booking has been created. Redirecting to edit page to complete delivery details...
          </p>
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-green-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/bookings')}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Booking</h1>
          <p className="text-gray-600">Enter applicant information to create a new passport booking</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="app_or_order_id" className="block text-sm font-medium text-gray-700 mb-2">
              Application/Order ID *
            </label>
            <input
              {...register('app_or_order_id')}
              type="text"
              id="app_or_order_id"
              placeholder="Enter application or order ID"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="create-booking-app-id"
            />
            {errors.app_or_order_id && (
              <p className="mt-1 text-sm text-red-600">{errors.app_or_order_id.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              placeholder="Enter full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="create-booking-name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <PhoneInput
              value={phoneValue || ''}
              onChange={(e) => setValue('phone', e.target.value)}
              error={errors.phone?.message}
              data-testid="create-booking-phone"
            />
          </div>

          <div>
            <label htmlFor="father_name" className="block text-sm font-medium text-gray-700 mb-2">
              Father's Name *
            </label>
            <input
              {...register('father_name')}
              type="text"
              id="father_name"
              placeholder="Enter father's name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="create-booking-father-name"
            />
            {errors.father_name && (
              <p className="mt-1 text-sm text-red-600">{errors.father_name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="mother_name" className="block text-sm font-medium text-gray-700 mb-2">
              Mother's Name *
            </label>
            <input
              {...register('mother_name')}
              type="text"
              id="mother_name"
              placeholder="Enter mother's name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="create-booking-mother-name"
            />
            {errors.mother_name && (
              <p className="mt-1 text-sm text-red-600">{errors.mother_name.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <textarea
              {...register('address')}
              id="address"
              rows={3}
              placeholder="Enter full address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="create-booking-address"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="emergency_contact_name" className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Name *
            </label>
            <input
              {...register('emergency_contact_name')}
              type="text"
              id="emergency_contact_name"
              placeholder="Enter emergency contact name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="create-booking-emergency-name"
            />
            {errors.emergency_contact_name && (
              <p className="mt-1 text-sm text-red-600">{errors.emergency_contact_name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="emergency_contact_phone" className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Phone *
            </label>
            <PhoneInput
              value={emergencyPhoneValue || ''}
              onChange={(e) => setValue('emergency_contact_phone', e.target.value)}
              error={errors.emergency_contact_phone?.message}
              data-testid="create-booking-emergency-phone"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/bookings')}
            disabled={isLoading}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            data-testid="create-booking-submit"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? 'Creating...' : 'Create Booking'}
          </button>
        </div>
      </form>
    </div>
  );
}