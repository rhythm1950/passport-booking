import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Loader2, Save, ArrowLeft, Package } from 'lucide-react';
import { createBagSchema } from '../../lib/forms';
import * as bagsService from '../../services/bags';
import type { z } from 'zod';

type CreateBagFormData = z.infer<typeof createBagSchema>;

export function CreateBag() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBagFormData>({
    resolver: zodResolver(createBagSchema),
  });

  const onSubmit = async (data: CreateBagFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await bagsService.createMock(data);
      setSuccess(`Bag created successfully with ID: ${result.bag_id}`);
      
      // Reset form after success
      setTimeout(() => {
        reset();
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create bag');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Bag</h1>
          <p className="text-gray-600">Create a new delivery bag for passport bookings</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Package className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Bag Information</h2>
            <p className="text-sm text-gray-600">Enter the details for the new bag</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="bag_category" className="block text-sm font-medium text-gray-700 mb-2">
              Bag Category *
            </label>
            <select
              {...register('bag_category')}
              id="bag_category"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="create-bag-category"
            >
              <option value="">Select Category</option>
              <option value="passport">Passport</option>
              <option value="document">Document</option>
              <option value="urgent">Urgent</option>
              <option value="regular">Regular</option>
            </select>
            {errors.bag_category && (
              <p className="mt-1 text-sm text-red-600">{errors.bag_category.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="bag_type" className="block text-sm font-medium text-gray-700 mb-2">
              Bag Type *
            </label>
            <select
              {...register('bag_type')}
              id="bag_type"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="create-bag-type"
            >
              <option value="">Select Type</option>
              <option value="delivery">Delivery</option>
              <option value="pickup">Pickup</option>
              <option value="transfer">Transfer</option>
              <option value="return">Return</option>
            </select>
            {errors.bag_type && (
              <p className="mt-1 text-sm text-red-600">{errors.bag_type.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="dest_office_code" className="block text-sm font-medium text-gray-700 mb-2">
              Destination Office Code *
            </label>
            <input
              {...register('dest_office_code')}
              type="text"
              id="dest_office_code"
              placeholder="Enter destination office code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="create-bag-dest-office"
            />
            {errors.dest_office_code && (
              <p className="mt-1 text-sm text-red-600">{errors.dest_office_code.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="rms_instruction" className="block text-sm font-medium text-gray-700 mb-2">
              RMS Instruction
            </label>
            <textarea
              {...register('rms_instruction')}
              id="rms_instruction"
              rows={3}
              placeholder="Enter any special instructions for the bag"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="create-bag-instruction"
            />
            {errors.rms_instruction && (
              <p className="mt-1 text-sm text-red-600">{errors.rms_instruction.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            disabled={isLoading}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            data-testid="create-bag-submit"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? 'Creating...' : 'Create Bag'}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}