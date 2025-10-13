import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Mail, MessageSquare, Smartphone, Check, X, Clock, AlertCircle, Shield } from 'lucide-react';
import { useLanguage } from '../../stores/useLanguage';
import { formatDateTime } from '../../lib/date';

interface Notification {
  id: string;
  type: 'booking' | 'system' | 'security' | 'update';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export function Notifications() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'New Booking Created',
      message: 'Booking APP001 has been successfully created and is pending verification.',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      priority: 'medium',
    },
    {
      id: '2',
      type: 'system',
      title: 'System Maintenance Scheduled',
      message: 'The system will undergo maintenance on January 20th from 2:00 AM to 4:00 AM.',
      timestamp: '2024-01-14T14:20:00Z',
      read: false,
      priority: 'high',
    },
    {
      id: '3',
      type: 'security',
      title: 'New Login Detected',
      message: 'A new login was detected from Chrome on Windows at 192.168.1.100.',
      timestamp: '2024-01-14T09:15:00Z',
      read: true,
      priority: 'medium',
    },
    {
      id: '4',
      type: 'update',
      title: 'OTP Verification Successful',
      message: 'OTP verification completed for booking APP002. Delivery can now proceed.',
      timestamp: '2024-01-13T16:45:00Z',
      read: true,
      priority: 'low',
    },
    {
      id: '5',
      type: 'booking',
      title: 'Bag Received',
      message: 'Bag BAG001 has been received and processed with 5 items.',
      timestamp: '2024-01-13T11:20:00Z',
      read: true,
      priority: 'low',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'booking' | 'system' | 'security'>('all');

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Bell className="h-5 w-5 text-blue-600" />;
      case 'system': return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'security': return <Shield className="h-5 w-5 text-red-600" />;
      case 'update': return <Check className="h-5 w-5 text-green-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('notifications')}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All notifications read'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            Mark All Read
          </button>
        )}
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Channels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Mail className="h-6 w-6 text-blue-600" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">admin@passport.gov.bd</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <MessageSquare className="h-6 w-6 text-green-600" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">SMS</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">+880171234****</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Smartphone className="h-6 w-6 text-purple-600" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Push</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Browser enabled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'booking', label: 'Bookings', count: notifications.filter(n => n.type === 'booking').length },
              { key: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length },
              { key: 'security', label: 'Security', count: notifications.filter(n => n.type === 'security').length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  filter === tab.key
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    filter === tab.key
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No notifications</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {filter === 'all' ? 'You have no notifications at the moment.' : `No ${filter} notifications found.`}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {notification.title}
                          {!notification.read && (
                            <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                          )}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {notification.message}
                        </p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDateTime(notification.timestamp)}
                          </span>
                          <span className="capitalize px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                            {notification.type}
                          </span>
                          <span className={`capitalize px-2 py-1 rounded-full ${
                            notification.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                            notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          }`}>
                            {notification.priority}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete notification"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}