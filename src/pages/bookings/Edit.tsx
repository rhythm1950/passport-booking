import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { updateBookingSchema } from '../../lib/forms';
import { OTPCard } from '../../components/otp/OTPCard';
import * as bookingsService from '../../services/bookings';
import type { z } from 'zod';

type UpdateBookingFormData = z.infer<typeof updateBookingSchema>;

export function EditBooking() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateBookingFormData>({
    resolver: zodResolver(updateBookingSchema),
  });

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return;
      
      try {
        const booking = await bookingsService.detailsMock(parseInt(id));
        // Pre-fill form with existing data
        if (booking.delivery_branch_code) setValue('delivery_branch_code', booking.delivery_branch_code);
        if (booking.receiver_name) setValue('receiver_name', booking.receiver_name);
        if (booking.division) setValue('division', booking.division);
        if (booking.district) setValue('district', booking.district);
        if (booking.police_station) setValue('police_station', booking.police_station);
        if (booking.post_office) setValue('post_office', booking.post_office);
        if (booking.street_address) setValue('street_address', booking.street_address);
        if (booking.address_type) setValue('address_type', booking.address_type);
      } catch (err) {
        setError('Failed to load booking details');
      } finally {
        setPageLoading(false);
      }
    };

    fetchBooking();
  }, [id, setValue]);

  const onSubmit = async (data: UpdateBookingFormData) => {
    if (!id) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      await bookingsService.updateMock(parseInt(id), data);
      setSuccess(true);
      
      // Show success message and redirect after delay
      setTimeout(() => {
        navigate(`/bookings/${id}`);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update booking');
    } finally {
      setIsLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Save className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Updated Successfully!</h1>
          <p className="text-gray-600 mb-6">
            The delivery information has been updated. Redirecting to booking details...
          </p>
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-green-600" />
          </div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/bookings/${id}`)}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('edit_booking')}</h1>
          <p className="text-gray-600">{t('delivery_information')} #{id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">{t('delivery_information')}</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="delivery_branch_code" className="block text-sm font-medium text-gray-700 mb-2">
                {t('branch_code')} *
              </label>
              <input
                {...register('delivery_branch_code')}
                type="text"
                id="delivery_branch_code"
                placeholder="Enter branch code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                data-testid="edit-booking-branch-code"
              />
              {errors.delivery_branch_code && (
                <p className="mt-1 text-sm text-red-600">{errors.delivery_branch_code.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="receiver_name" className="block text-sm font-medium text-gray-700 mb-2">
                {t('name')} *
              </label>
              <input
                {...register('receiver_name')}
                type="text"
                id="receiver_name"
                placeholder="Enter receiver name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                data-testid="edit-booking-receiver-name"
              />
              {errors.receiver_name && (
                <p className="mt-1 text-sm text-red-600">{errors.receiver_name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-2">
                {t('address')} *
              </label>
              <select
                {...register('division')}
                id="division"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                data-testid="edit-booking-division"
              >
                <option value="">Select Division</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Khulna">Khulna</option>
                <option value="Barisal">Barisal</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
              </select>
              {errors.division && (
                <p className="mt-1 text-sm text-red-600">{errors.division.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                District *
              </label>
              <input
                {...register('district')}
                type="text"
                id="district"
                placeholder="Enter district"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                data-testid="edit-booking-district"
              />
              {errors.district && (
                <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="police_station" className="block text-sm font-medium text-gray-700 mb-2">
                Police Station *
              </label>
              <input
                {...register('police_station')}
                type="text"
                id="police_station"
                placeholder="Enter police station"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                data-testid="edit-booking-police-station"
              />
              {errors.police_station && (
                <p className="mt-1 text-sm text-red-600">{errors.police_station.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="post_office" className="block text-sm font-medium text-gray-700 mb-2">
                Post Office *
              </label>
              <input
                {...register('post_office')}
                type="text"
                id="post_office"
                placeholder="Enter post office"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                data-testid="edit-booking-post-office"
              />
              {errors.post_office && (
                <p className="mt-1 text-sm text-red-600">{errors.post_office.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="street_address" className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <textarea
                {...register('street_address')}
                id="street_address"
                rows={3}
                placeholder="Enter detailed street address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                data-testid="edit-booking-street-address"
              />
              {errors.street_address && (
                <p className="mt-1 text-sm text-red-600">{errors.street_address.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="address_type" className="block text-sm font-medium text-gray-700 mb-2">
                Address Type *
              </label>
              <select
                {...register('address_type')}
                id="address_type"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                data-testid="edit-booking-address-type"
              >
                <option value="">Select Address Type</option>
                <option value="home">Home</option>
                <option value="office">Office</option>
              </select>
              {errors.address_type && (
                <p className="mt-1 text-sm text-red-600">{errors.address_type.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(`/bookings/${id}`)}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50"
            >
              {t('cancel')}
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              data-testid="edit-booking-submit"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? t('updating') : t('update')}
            </button>
          </div>
        </form>

        {/* Right Column - OTP Card */}
        <div>
          <OTPCard bookingId={parseInt(id!)} />
        </div>
      </div>
    </div>
  );
}