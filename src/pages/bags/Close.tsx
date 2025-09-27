import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, Lock, ArrowLeft, Package, Plus } from 'lucide-react';
import * as bagsService from '../../services/bags';

export function CloseBag() {
  const { bagId } = useParams<{ bagId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleClose = async () => {
    if (!bagId) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      await bagsService.closeMock({ bag_id: bagId });
      setSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/bags/received');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to close bag');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bag Closed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Bag #{bagId} has been closed and is ready for delivery. Redirecting to received bags...
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
      <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Close Bag</h1>
          <p className="text-gray-600">Close bag #{bagId} for delivery</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Package className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Bag #{bagId}</h2>
            <p className="text-sm text-gray-600">Review and close this bag for delivery</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-5 w-5 text-yellow-600" />
              <h3 className="font-medium text-yellow-800">Important Notice</h3>
            </div>
            <p className="text-yellow-700 text-sm">
              Once you close this bag, you will not be able to add more items to it. 
              Make sure all required items have been added before closing.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Bag Information</h3>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-500">Bag ID</dt>
                <dd className="font-medium text-gray-900">{bagId}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Status</dt>
                <dd className="font-medium text-gray-900">Open</dd>
              </div>
              <div>
                <dt className="text-gray-500">Items Added</dt>
                <dd className="font-medium text-gray-900">Mock: 5 items</dd>
              </div>
              <div>
                <dt className="text-gray-500">Created</dt>
                <dd className="font-medium text-gray-900">Today</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            onClick={() => navigate(`/bags/${bagId}/items/add`)}
            disabled={isLoading}
            className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-medium disabled:opacity-50 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add More Items
          </button>
          
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            data-testid="close-bag-submit"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? 'Closing...' : 'Close Bag'}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}