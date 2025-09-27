import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, Search, Download } from 'lucide-react';
import { DataTable } from '../../components/table/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { DateRangePicker } from '../../components/form/DateRangePicker';
import { formatDate } from '../../lib/date';
import * as bookingsService from '../../services/bookings';
import type { BookingListItem, Page } from '../../types';

export function BookingsList() {
  const [data, setData] = useState<Page<BookingListItem>>({
    data: [],
    total: 0,
    page: 1,
    per_page: 10,
    total_pages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const navigate = useNavigate();

  const fetchBookings = async (page = 1) => {
    setLoading(true);
    try {
      const result = await bookingsService.listMock({
        page,
        per_page: 10,
        status: status || undefined,
        from: dateFrom || undefined,
        to: dateTo || undefined,
      });
      setData(result);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [status, dateFrom, dateTo]);

  const handleSearch = () => {
    fetchBookings(1);
  };

  const handlePageChange = (page: number) => {
    fetchBookings(page);
  };

  const handleRowClick = (booking: BookingListItem) => {
    navigate(`/bookings/${booking.id}`);
  };

  const columns = [
    {
      key: 'app_or_order_id' as keyof BookingListItem,
      label: 'Application ID',
      className: 'font-medium',
    },
    {
      key: 'name' as keyof BookingListItem,
      label: 'Name',
    },
    {
      key: 'phone' as keyof BookingListItem,
      label: 'Phone',
    },
    {
      key: 'status' as keyof BookingListItem,
      label: 'Status',
      render: (value: any) => <StatusBadge status={value} />,
    },
    {
      key: 'delivery_branch_code' as keyof BookingListItem,
      label: 'Branch',
      render: (value: any) => value || '-',
    },
    {
      key: 'created_at' as keyof BookingListItem,
      label: 'Created',
      render: (value: any) => formatDate(value),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Passport Bookings</h1>
          <p className="text-gray-600">Manage all passport booking requests</p>
        </div>
        
        <button
          onClick={() => navigate('/bookings/create')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 font-medium"
        >
          <Plus className="h-4 w-4" />
          New Booking
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
          
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            data-testid="bookings-search-btn"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status-filter"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                <option value="initial">Initial</option>
                <option value="pre_booked">Pre-booked</option>
                <option value="BAGGED">Bagged</option>
                <option value="CLOSED">Closed</option>
                <option value="RECEIVED">Received</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <DateRangePicker
                from={dateFrom}
                to={dateTo}
                onFromChange={setDateFrom}
                onToChange={setDateTo}
              />
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">
              {data.total} booking{data.total !== 1 ? 's' : ''} found
            </h2>
            <p className="text-sm text-gray-600">
              Showing {data.data.length} of {data.total} results
            </p>
          </div>
          
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>

        <DataTable
          data={data.data}
          columns={columns}
          loading={loading}
          pagination={{
            page: data.page,
            total_pages: data.total_pages,
            total: data.total,
            onPageChange: handlePageChange,
          }}
          onRowClick={handleRowClick}
          emptyState={
            <div>
              <p className="text-gray-500 text-lg mb-2">No bookings found</p>
              <p className="text-gray-400 text-sm mb-4">
                {search || status || dateFrom || dateTo
                  ? 'Try adjusting your search filters'
                  : 'Create your first booking to get started'
                }
              </p>
              {!search && !status && !dateFrom && !dateTo && (
                <button
                  onClick={() => navigate('/bookings/create')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 inline-flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create First Booking
                </button>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
}