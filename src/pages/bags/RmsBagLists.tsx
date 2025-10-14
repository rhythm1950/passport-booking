import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../../lib/api';

type RmsItem = {
  order_id: string;
  status?: string;
  [k: string]: unknown;
};

type RmsBag = {
  bag_id: string;
  items: RmsItem[];
  received_at?: string;
  [k: string]: unknown;
};

export function RmsBagLists() {
  const [bags, setBags] = useState<RmsBag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError('');
      try {
        // Full absolute URL (RMS service). Axios instance will still attach auth header.
        const resp = await api.get('http://192.168.1.78:8002/rms/get-bag-lists');
        const data = resp?.data?.data ?? resp?.data ?? [];
        setBags(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        const e = err as { response?: { data?: { message?: string } }; message?: string };
        setError(e?.response?.data?.message ?? (e?.message ?? 'Failed to fetch RMS bag lists'));
        setBags([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/dashboard')} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">RMS Bag Lists</h1>
          <p className="text-gray-600">Read-only RMS bag lists (fetched from remote RMS service)</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {loading ? (
          <div className="p-8 text-center">Loading RMS bag lists...</div>
        ) : error ? (
          <div className="p-6 bg-red-50 border border-red-200 rounded">{error}</div>
        ) : bags.length === 0 ? (
          <div className="p-8 text-center">No bags returned from RMS</div>
        ) : (
          <div className="space-y-4">
            {bags.map((b) => (
              <div key={b.bag_id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Bag: <span className="font-mono">{b.bag_id}</span></h3>
                    {b.received_at && <div className="text-sm text-gray-500">Received: {String(b.received_at)}</div>}
                  </div>
                  <div className="text-sm text-gray-500">{b.items?.length ?? 0} items</div>
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-2">Items</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {b.items?.map((it: RmsItem, idx: number) => (
                      <div key={it.order_id ?? idx} className="p-2 bg-gray-50 border rounded">
                        <div className="text-sm"><strong>{it.order_id}</strong></div>
                        {it.status && <div className="text-xs text-gray-500">{it.status}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
