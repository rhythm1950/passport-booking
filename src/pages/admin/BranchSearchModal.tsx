import { useState, useEffect } from 'react';
import { Search, X, MapPin, Building } from 'lucide-react';
import * as bagService from '../../features/bag/service';
import type { Branch } from '../../types';

interface BranchSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (branch: Branch) => void;
}

export function BranchSearchModal({ isOpen, onClose, onSelect }: BranchSearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);

  const searchBranches = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const resp = await bagService.branchList({ q: searchQuery });
      // The bag API may return { data: [branches], pagination } or plain array
      const data = resp?.data?.data ?? resp?.data ?? [];
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Branch search failed:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchBranches(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      // Load initial results
      searchBranches('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Search Branches</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            data-testid="branch-search-close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, code, or division..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              data-testid="branch-search-input"
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Searching branches...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {query ? 'No branches found matching your search' : 'Start typing to search branches'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {results.map((branch) => (
                <button
                  key={branch.code}
                  onClick={() => onSelect(branch)}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:bg-green-50"
                  data-testid={`branch-option-${branch.code}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      branch.type === 'main' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {branch.type === 'main' ? (
                        <Building className={`h-5 w-5 ${branch.type === 'main' ? 'text-green-600' : 'text-blue-600'}`} />
                      ) : (
                        <MapPin className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{branch.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          branch.type === 'main' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {branch.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Code: <span className="font-mono">{branch.code}</span></span>
                        <span>{branch.division}, {branch.district}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}