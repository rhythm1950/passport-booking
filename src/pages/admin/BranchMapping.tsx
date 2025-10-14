import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Loader2, UserCog, ArrowLeft, Search } from 'lucide-react';
import { branchMappingSchema } from '../../lib/forms';
import { BranchSearchModal } from './BranchSearchModal';
import * as bagService from '../../features/bag/service';
import { useAuth } from '../../stores/useAuth';
import type { z } from 'zod';

type BranchMappingFormData = z.infer<typeof branchMappingSchema>;

export function BranchMapping() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showBranchSearch, setShowBranchSearch] = useState(false);
  const navigate = useNavigate();
  const { permissions } = useAuth();

  // permission guard: require admin or bags.manage
  const allowed = permissions.includes('admin') || permissions.includes('bags.manage');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BranchMappingFormData>({
    resolver: zodResolver(branchMappingSchema),
  });

  // const branchCode = watch('branch_code'); // Not used, keep for future if needed

  if (!allowed) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-lg font-semibold">Access denied</h2>
          <p className="text-sm text-gray-600">You do not have permission to manage branch mappings.</p>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: BranchMappingFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const resp = await bagService.branchMapping(data);
      const message = resp?.data?.message ?? 'Branch mapping created successfully!';
      setSuccess(message as string);
      
      // Reset form after success
      setTimeout(() => {
        reset();
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create branch mapping');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBranchSelect = (branch: { code: string }) => {
    setValue('branch_code', branch.code);
    setShowBranchSearch(false);
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
          <h1 className="text-2xl font-bold text-gray-900">Branch Mapping</h1>
          <p className="text-gray-600">Assign operators to branches</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <UserCog className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Create Branch Mapping</h2>
            <p className="text-sm text-gray-600">Associate an operator with a branch</p>
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
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username *
            </label>
            <input
              {...register('username')}
              type="text"
              id="username"
              placeholder="Enter operator username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="branch-mapping-username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="branch_code" className="block text-sm font-medium text-gray-700 mb-2">
              Branch Code *
            </label>
            <div className="flex gap-2">
              <input
                {...register('branch_code')}
                type="text"
                id="branch_code"
                placeholder="Enter or search branch code"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                data-testid="branch-mapping-branch-code"
              />
              <button
                type="button"
                onClick={() => setShowBranchSearch(true)}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                data-testid="branch-search-btn"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
            {errors.branch_code && (
              <p className="mt-1 text-sm text-red-600">{errors.branch_code.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-2">
              Relationship *
            </label>
            <select
              {...register('relationship')}
              id="relationship"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="branch-mapping-relationship"
            >
              <option value="">Select Relationship</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
            {errors.relationship && (
              <p className="mt-1 text-sm text-red-600">{errors.relationship.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/admin/operators')}
            disabled={isLoading}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50"
          >
            View Operators
          </button>
          
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            data-testid="branch-mapping-submit"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? 'Creating...' : 'Create Mapping'}
          </button>
        </div>
      </form>

      {showBranchSearch && (
        <BranchSearchModal
          isOpen={showBranchSearch}
          onClose={() => setShowBranchSearch(false)}
          onSelect={handleBranchSelect}
        />
      )}
      </div>
    </div>
  );
}