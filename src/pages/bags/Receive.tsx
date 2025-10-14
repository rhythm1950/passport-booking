import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Loader2, PackageCheck, ArrowLeft } from 'lucide-react';
import { receiveBagSchema } from '../../lib/forms';
import * as bagService from '../../features/bag/service';
import type { z } from 'zod';

type ReceiveBagFormData = z.infer<typeof receiveBagSchema>;

export function ReceiveBag() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReceiveBagFormData>({
    resolver: zodResolver(receiveBagSchema),
  });

  const onSubmit = async (data: ReceiveBagFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const resp = await bagService.receiveBag(data);
      const items = resp?.data?.items ?? resp?.data?.data?.items;
      const message = resp?.data?.message ?? resp?.data?.data?.message ?? (items ? `Bag received successfully! ${items} items processed.` : 'Bag received successfully');

      setSuccess(message as string);

      // Reset form and redirect after delay
      setTimeout(() => {
        reset();
        navigate('/bags/received');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to receive bag');
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
          <h1 className="text-2xl font-bold text-gray-900">Receive Bag</h1>
          <p className="text-gray-600">Process an incoming delivery bag</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <PackageCheck className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Bag Reception</h2>
            <p className="text-sm text-gray-600">Enter the details of the bag being received</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="bag_id" className="block text-sm font-medium text-gray-700 mb-2">
                Bag ID *
              </label>
              <input
                {...register('bag_id')}
                type="text"
                id="bag_id"
                placeholder="Enter bag ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                data-testid="receive-bag-id"
              />
              {errors.bag_id && (
                <p className="mt-1 text-sm text-red-600">{errors.bag_id.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="line_id" className="block text-sm font-medium text-gray-700 mb-2">
                Line ID *
              </label>
              <input
                {...register('line_id')}
                type="text"
                id="line_id"
                placeholder="Enter line ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                data-testid="receive-line-id"
              />
              {errors.line_id && (
                <p className="mt-1 text-sm text-red-600">{errors.line_id.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="recv_instruction" className="block text-sm font-medium text-gray-700 mb-2">
              Reception Instructions
            </label>
            <textarea
              {...register('recv_instruction')}
              id="recv_instruction"
              rows={3}
              placeholder="Enter any special instructions for receiving this bag"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="receive-instruction"
            />
            {errors.recv_instruction && (
              <p className="mt-1 text-sm text-red-600">{errors.recv_instruction.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="receive_items" className="block text-sm font-medium text-gray-700 mb-2">
              Items Received *
            </label>
            <textarea
              {...register('receive_items')}
              id="receive_items"
              rows={4}
              placeholder="Enter item IDs separated by commas (e.g., APP001, APP002, APP003)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="receive-items"
            />
            {errors.receive_items && (
              <p className="mt-1 text-sm text-red-600">{errors.receive_items.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              List all item/order IDs in the bag, separated by commas
            </p>
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
            data-testid="receive-bag-submit"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? 'Processing...' : 'Receive Bag'}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}