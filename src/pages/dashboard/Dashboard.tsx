import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Package, 
  Users, 
  CheckCircle, 
  Clock, 
  Plus,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../stores/useAuth';
import { useLanguage } from '../../stores/useLanguage';
import * as bookingsService from '../../services/bookings';

interface DashboardStats {
  totalBookings: number;
  todayBookings: number;
  pendingVerifications: number;
  completedDeliveries: number;
}

export function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    todayBookings: 0,
    pendingVerifications: 0,
    completedDeliveries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Mock dashboard stats
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats({
          totalBookings: 1247,
          todayBookings: 23,
          pendingVerifications: 156,
          completedDeliveries: 891,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: t('total_bookings'),
      value: stats.totalBookings.toLocaleString(),
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+12% from last month',
    },
    {
      title: t('todays_bookings'),
      value: stats.todayBookings.toString(),
      icon: Clock,
      color: 'bg-green-600',
      change: '+5 from yesterday',
    },
    {
      title: t('pending_verifications'),
      value: stats.pendingVerifications.toString(),
      icon: Users,
      color: 'bg-yellow-500',
      change: '-8% from last week',
    },
    {
      title: t('completed_deliveries'),
      value: stats.completedDeliveries.toLocaleString(),
      icon: CheckCircle,
      color: 'bg-emerald-500',
      change: '+23% from last month',
    },
  ];

  const quickActions = [
    {
      title: t('create_booking'),
      description: 'Add a new passport booking request', // Keep English for now
      href: '/bookings/create',
      icon: Plus,
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: t('create_bag'),
      description: 'Create a new delivery bag', // Keep English for now
      href: '/bags/create',
      icon: Package,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: t('all_bookings'),
      description: 'Browse and manage existing bookings', // Keep English for now
      href: '/bookings',
      icon: BookOpen,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      title: t('receive_bag'),
      description: 'Process incoming delivery bags', // Keep English for now
      href: '/bags/receive',
      icon: Package,
      color: 'bg-orange-600 hover:bg-orange-700',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{t('dashboard')}</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          {t('welcome_back')}, {user?.name}!
        </h1>
        <p className="text-green-100 text-lg">
          {t('welcome_message')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            
            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('quick_actions')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              to={action.href}
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{action.description}</p>
              
              <div className="flex items-center text-green-600 text-sm font-medium">
                {t('open')}
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('recent_activity')}</h2>
        <div className="space-y-4">
          {[
            { action: 'New booking created', id: 'APP001', time: '2 minutes ago', status: 'success' },
            { action: 'OTP verified for booking', id: 'APP002', time: '15 minutes ago', status: 'success' },
            { action: 'Bag received', id: 'BAG001', time: '1 hour ago', status: 'info' },
            { action: 'Booking updated', id: 'APP003', time: '2 hours ago', status: 'warning' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                }`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">ID: {activity.id}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}