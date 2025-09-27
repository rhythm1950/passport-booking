import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Package, Clock, CheckCircle } from 'lucide-react';
import { formatDateTime } from '../../lib/date';
import * as bagsService from '../../services/bags';
import type { ReceivedBag } from '../../types';

export function ReceivedBagsList() {
  const [bags, setBags] = useState<ReceivedBag[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedBags, setExpandedBags] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBags = async () => {
      try {
        const result = await bagsService.receivedListMock();
        setBags(result);
      } catch (error) {
        console.error('Failed to fetch received bags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBags();
  }, []);

  const toggleBagExpansion = (bagId: string) => {
    const newExpanded = new Set(expandedBags);
    if (newExpanded.has(bagId)) {
      newExpanded.delete(bagId);
    } else {
      newExpanded.add(bagId);
    }
    setExpandedBags(newExpanded);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Received Bags</h1>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Loading received bags...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Received Bags</h1>
          <p className="text-gray-600">View all bags that have been received and processed</p>
        </div>
      </div>

      {bags.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Received Bags</h3>
          <p className="text-gray-500 mb-6">
            No bags have been received yet. Bags will appear here once they are processed.
          </p>
          <button
            onClick={() => navigate('/bags/receive')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium"
          >
            Receive New Bag
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">
              {bags.length} bag{bags.length !== 1 ? 's' : ''} received
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {bags.map((bag) => (
              <div key={bag.id} className="p-6">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleBagExpansion(bag.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-green-600" />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">Bag #{bag.bag_id}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Received {formatDateTime(bag.received_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          {bag.items_count} items
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Line: {bag.line_id}</p>
                      {bag.recv_instruction && (
                        <p className="text-xs text-gray-500 truncate max-w-32">
                          {bag.recv_instruction}
                        </p>
                      )}
                    </div>
                    
                    {expandedBags.has(bag.id) ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedBags.has(bag.id) && (
                  <div className="mt-4 pl-14 space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Bag Details</h4>
                      <dl className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <dt className="text-gray-500">Bag ID</dt>
                          <dd className="font-medium text-gray-900">{bag.bag_id}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Line ID</dt>
                          <dd className="font-medium text-gray-900">{bag.line_id}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Items Count</dt>
                          <dd className="font-medium text-gray-900">{bag.items_count}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Received At</dt>
                          <dd className="font-medium text-gray-900">{formatDateTime(bag.received_at)}</dd>
                        </div>
                      </dl>
                      {bag.recv_instruction && (
                        <div className="mt-3">
                          <dt className="text-gray-500 text-sm">Instructions</dt>
                          <dd className="text-gray-900 text-sm">{bag.recv_instruction}</dd>
                        </div>
                      )}
                    </div>

                    {bag.items.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Items in Bag</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {bag.items.map((item, index) => (
                            <div
                              key={index}
                              className="bg-white border border-gray-200 rounded-lg p-3 text-sm"
                            >
                              <div className="font-medium text-gray-900">{item.order_id}</div>
                              <div className="text-gray-500 capitalize">{item.status}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}