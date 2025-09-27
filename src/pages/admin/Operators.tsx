import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCog, Plus, Users } from 'lucide-react';
import { DataTable } from '../../components/table/DataTable';
import { formatDateTime } from '../../lib/date';
import * as adminService from '../../services/admin';
import type { Operator } from '../../types';

export function Operators() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const result = await adminService.operatorsMock();
        setOperators(result);
      } catch (error) {
        console.error('Failed to fetch operators:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOperators();
  }, []);

  const columns = [
    {
      key: 'username' as keyof Operator,
      label: 'Username',
      className: 'font-medium',
    },
    {
      key: 'name' as keyof Operator,
      label: 'Name',
    },
    {
      key: 'role' as keyof Operator,
      label: 'Role',
      render: (value: any) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
          {value}
        </span>
      ),
    },
    {
      key: 'branch_code' as keyof Operator,
      label: 'Branch Code',
      render: (value: any) => value || '-',
      className: 'font-mono',
    },
    {
      key: 'status' as keyof Operator,
      label: 'Status',
      render: (value: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'last_login' as keyof Operator,
      label: 'Last Login',
      render: (value: any) => value ? formatDateTime(value) : 'Never',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">System Operators</h1>
          <p className="text-gray-600">Manage system operators and their permissions</p>
        </div>
        <button
          onClick={() => navigate('/admin/branch-mapping')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 font-medium"
        >
          <UserCog className="h-4 w-4" />
          Branch Mapping
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">
              {operators.length} operator{operators.length !== 1 ? 's' : ''} found
            </h2>
            <p className="text-sm text-gray-600">
              Active system users and their branch assignments
            </p>
          </div>
        </div>

        <DataTable
          data={operators}
          columns={columns}
          loading={loading}
          emptyState={
            <div>
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Operators Found</h3>
              <p className="text-gray-500 mb-6">
                No system operators are currently configured.
              </p>
              <button
                onClick={() => navigate('/admin/branch-mapping')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 inline-flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Branch Mapping
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
}