import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, CreditCard as Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../../stores/useAuth';
import { useLanguage } from '../../stores/useLanguage';

export function Profile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: 'admin@passport.gov.bd',
    phone: '+8801712345678',
    address: 'Dhaka, Bangladesh',
    department: 'Passport Office',
    joinDate: '2020-01-15',
  });

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
    // Show success message
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: 'admin@passport.gov.bd',
      phone: '+8801712345678',
      address: 'Dhaka, Bangladesh',
      department: 'Passport Office',
      joinDate: '2020-01-15',
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('profile')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('personal_information')}</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Edit3 className="h-4 w-4" />
          {isEditing ? t('cancel') : t('edit_profile')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{user?.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 capitalize mb-2">{user?.role}</p>
            {user?.branch_code && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                Branch: {user.branch_code}
              </span>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('account_status')}</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{t('active')}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('last_login')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('today')} 9:30 AM</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('personal_information')}</h3>
            {isEditing && (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  {t('cancel')}
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {t('save_changes')}
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('full_name')}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-900 dark:text-white">{formData.name}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('email')}
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-900 dark:text-white">{formData.email}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('phone_number')}
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-900 dark:text-white">{formData.phone}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('full_address')}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-900 dark:text-white">{formData.address}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('department')}
              </label>
              <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-900 dark:text-white">{formData.department}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('join_date')}
              </label>
              <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-900 dark:text-white">{new Date(formData.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t('activity_summary')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">247</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('bookings_created')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">89</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('bags_processed')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">156</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('otps_verified')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">98%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('success_rate')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}