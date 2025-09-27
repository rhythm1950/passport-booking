import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Package, 
  Users, 
  Menu, 
  X,
  FileText,
  Plus,
  List,
  PackagePlus,
  PackageCheck,
  UserCog
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      name: 'Bookings',
      icon: BookOpen,
      children: [
        { name: 'Create Booking', href: '/bookings/create', icon: Plus },
        { name: 'All Bookings', href: '/bookings', icon: List },
      ],
    },
    {
      name: 'Bags',
      icon: Package,
      children: [
        { name: 'Create Bag', href: '/bags/create', icon: PackagePlus },
        { name: 'Receive Bag', href: '/bags/receive', icon: PackageCheck },
        { name: 'Received Bags', href: '/bags/received', icon: List },
      ],
    },
    {
      name: 'Admin',
      icon: Users,
      children: [
        { name: 'Branch Mapping', href: '/admin/branch-mapping', icon: UserCog },
        { name: 'Operators', href: '/admin/operators', icon: Users },
      ],
    },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex-shrink-0 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={onToggle}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.href ? (
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActivePath(item.href)
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ) : (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-900">
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </div>
                  <div className="ml-6 space-y-1">
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={cn(
                          'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                          isActivePath(child.href)
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        )}
                      >
                        <child.icon className="h-4 w-4" />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}