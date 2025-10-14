import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, Plus, ArrowLeft } from 'lucide-react';
import { addBagItemSchema } from '../../lib/forms';
import * as bagService from '../../features/bag/service';
import type { z } from 'zod';

type AddBagItemFormData = z.infer<typeof addBagItemSchema>;

export function AddBagItem() {
  const { bagId } = useParams<{ bagId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddBagItemFormData>({
    resolver: zodResolver(addBagItemSchema),
  });

  useEffect(() => {
    if (bagId) {
      setValue('bag_id', bagId);
    }
  }, [bagId, setValue]);

  const onSubmit = async (data: AddBagItemFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const resp = await bagService.addItemToBag(data);
      const message = resp?.data?.message ?? resp?.data?.data?.message ?? 'Item added to bag successfully!';
      setSuccess(message as string);
      
      // Reset form after success (except bag_id)
      setTimeout(() => {
        reset({
          bag_id: bagId,
          bag_type: '',
          order_id: '',
          index: 0,
        });
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to bag');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/bags/${bagId}/close`)}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Item to Bag</h1>
          <p className="text-gray-600">Add a passport booking item to bag #{bagId}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Plus className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Item Information</h2>
            <p className="text-sm text-gray-600">Enter the details for the item to add</p>
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

        <div className="space-y-6">
          <div>
            <label htmlFor="bag_id" className="block text-sm font-medium text-gray-700 mb-2">
              Bag ID
            </label>
            <input
              {...register('bag_id')}
              type="text"
              id="bag_id"
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              data-testid="add-item-bag-id"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="order_id" className="block text-sm font-medium text-gray-700 mb-2">
                Order ID *
              </label>
              <input
                {...register('order_id')}
                type="text"
                id="order_id"
                placeholder="Enter order/booking ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                data-testid="add-item-order-id"
              />
              {errors.order_id && (
                <p className="mt-1 text-sm text-red-600">{errors.order_id.message}</p>
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
                data-testid="add-item-bag-type"
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
          </div>

          <div>
            <label htmlFor="index" className="block text-sm font-medium text-gray-700 mb-2">
              Index *
            </label>
            <input
              {...register('index', { valueAsNumber: true })}
              type="number"
              id="index"
              min="0"
              placeholder="Enter item index"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="add-item-index"
            />
            {errors.index && (
              <p className="mt-1 text-sm text-red-600">{errors.index.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate(`/bags/${bagId}/close`)}
            disabled={isLoading}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            data-testid="add-item-submit"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? 'Adding...' : 'Add Item'}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}