import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ChevronsLeft, ChevronsRight } from 'lucide-react';
import * as bagService from '../../features/bag/service';
import { useAuth } from '../../stores/useAuth';
// Local Branch type (avoid cross-file resolution issues in this environment)
type Branch = {
  code: string;
  name: string;
  division: string;
  district: string;
  type: 'main' | 'sub';
};

export function BranchList() {
  const [query, setQuery] = useState('');
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { permissions } = useAuth();

  const allowed = permissions.includes('admin') || permissions.includes('bags.view_branches');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const resp = await bagService.branchList({ q: query, page, per_page: perPage });
        const data = resp?.data?.data ?? resp?.data ?? [];
        const pagination = resp?.data?.pagination ?? resp?.data?.pagination ?? { total: Array.isArray(data) ? data.length : 0 };
        setBranches(Array.isArray(data) ? data : []);
        setTotal(pagination.total ?? (Array.isArray(data) ? data.length : 0));
      } catch (err) {
        console.error('Failed to fetch branches', err);
        setBranches([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [query, page, perPage]);

  if (!allowed) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-lg font-semibold">Access denied</h2>
          <p className="text-sm text-gray-600">You do not have permission to view branches.</p>
        </div>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/dashboard')} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Branches</h1>
          <p className="text-gray-600">Search and browse branches</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search branches" className="w-full pl-10 pr-4 py-3 border rounded-lg" />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(1)} disabled={page === 1} className="px-3 py-2 border rounded"> <ChevronsLeft className="h-4 w-4" /> </button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-2 border rounded">Prev</button>
            <div className="px-3">{page} / {totalPages}</div>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-2 border rounded">Next</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-3 py-2 border rounded"> <ChevronsRight className="h-4 w-4" /> </button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : branches.length === 0 ? (
          <div className="p-8 text-center">No branches found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {branches.map((b) => (
              <div key={b.code} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{b.name}</h3>
                    <div className="text-sm text-gray-500">Code: <span className="font-mono">{b.code}</span></div>
                  </div>
                  <div className="text-sm text-gray-500">{b.type}</div>
                </div>
                <div className="mt-2 text-sm text-gray-600">{b.division}, {b.district}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
