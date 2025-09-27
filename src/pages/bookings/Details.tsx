import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard as Edit, Phone, MapPin, User, Calendar, CheckCircle, Clock, Package } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { formatDateTime } from '../../lib/date';
import * as bookingsService from '../../services/bookings';
import type { BookingDetails } from '../../types';

export function BookingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const result = await bookingsService.detailsMock(parseInt(id));
        setBooking(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="h-64 bg-gray-200 rounded-2xl"></div>
              <div className="h-48 bg-gray-200 rounded-2xl"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => navigate('/bookings')}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
          <p className="text-gray-600">Booking not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/bookings')}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              Booking #{booking.app_or_order_id}
            </h1>
            <StatusBadge status={booking.status} />
          </div>
          <p className="text-gray-600">Created on {formatDateTime(booking.created_at)}</p>
        </div>
        <button
          onClick={() => navigate(`/bookings/${booking.id}/edit`)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Applicant Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Applicant Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-gray-900 font-medium">{booking.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900 font-medium flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {booking.phone}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Father's Name</label>
                  <p className="text-gray-900">{booking.father_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Mother's Name</label>
                  <p className="text-gray-900">{booking.mother_name}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <p className="text-gray-900 flex items-start gap-1">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  {booking.address}
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="text-gray-900">{booking.emergency_contact_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-900 flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {booking.emergency_contact_phone}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          {(booking.delivery_branch_code || booking.receiver_name) && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Delivery Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Branch Code</label>
                    <p className="text-gray-900 font-medium">{booking.delivery_branch_code || '-'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Receiver Name</label>
                    <p className="text-gray-900">{booking.receiver_name || '-'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Division</label>
                    <p className="text-gray-900">{booking.division || '-'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">District</label>
                    <p className="text-gray-900">{booking.district || '-'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Police Station</label>
                    <p className="text-gray-900">{booking.police_station || '-'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Post Office</label>
                    <p className="text-gray-900">{booking.post_office || '-'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Address Type</label>
                    <p className="text-gray-900 capitalize">{booking.address_type || '-'}</p>
                  </div>
                </div>
                
                {booking.street_address && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Street Address</label>
                    <p className="text-gray-900">{booking.street_address}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Status Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Status Timeline
          </h2>
          
          <div className="space-y-4">
            {booking.status_history.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    item.status === 'initial' ? 'bg-gray-400' :
                    item.status === 'pre_booked' ? 'bg-blue-500' :
                    item.status === 'BAGGED' ? 'bg-yellow-500' :
                    item.status === 'CLOSED' ? 'bg-orange-500' :
                    'bg-green-500'
                  }`} />
                  {index < booking.status_history.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-200 mt-2" />
                  )}
                </div>
                
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge status={item.status as any} />
                    <span className="text-sm text-gray-500">
                      {formatDateTime(item.timestamp)}
                    </span>
                  </div>
                  {item.note && (
                    <p className="text-sm text-gray-600">{item.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {booking.status !== 'RECEIVED' && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Waiting for next status update...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}