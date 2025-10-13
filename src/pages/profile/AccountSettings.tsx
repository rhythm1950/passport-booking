import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Key, Bell, Globe, Palette, Save, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../stores/useAuth';
import { useTheme } from '../../stores/useTheme';
import { useLanguage } from '../../stores/useLanguage';

export function AccountSettings() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    bookingUpdates: true,
    systemAlerts: true,
    weeklyReports: false,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginAlerts: true,
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // Handle password change
    console.log('Password change requested');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSecurityChange = (key: keyof typeof security, value: any) => {
    setSecurity(prev => ({ ...prev, [key]: value }));
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('account_settings')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('security')} {t('preferences')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password & Security */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('security')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('password_security')}</p>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('current_password')}
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('new_password')}
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('confirm_password')}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <Key className="h-4 w-4" />
              {t('update_password')}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{t('two_factor_auth')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('security')}</p>
              </div>
              <button
                onClick={() => handleSecurityChange('twoFactorAuth', !security.twoFactorAuth)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  security.twoFactorAuth ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('session_timeout')}
              </label>
              <select
                value={security.sessionTimeout}
                onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('notifications')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('notification_preferences')}</p>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {key === 'emailNotifications' && 'Receive notifications via email'}
                    {key === 'smsNotifications' && 'Receive notifications via SMS'}
                    {key === 'pushNotifications' && 'Receive push notifications'}
                    {key === 'bookingUpdates' && 'Get notified about booking status changes'}
                    {key === 'systemAlerts' && 'Receive system maintenance alerts'}
                    {key === 'weeklyReports' && 'Get weekly activity reports'}
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange(key as keyof typeof notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('preferences')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings')}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('theme')}
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => theme === 'dark' && toggleTheme()}
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                    theme === 'light'
                      ? 'border-green-600 bg-green-50 dark:bg-green-900'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white border border-gray-200 rounded mx-auto mb-2"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Light</span>
                  </div>
                </button>
                <button
                  onClick={() => theme === 'light' && toggleTheme()}
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                    theme === 'dark'
                      ? 'border-green-600 bg-green-50 dark:bg-green-900'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gray-800 rounded mx-auto mb-2"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Dark</span>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('language')}
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                    language === 'en'
                      ? 'border-green-600 bg-green-50 dark:bg-green-900'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-2xl mb-2 block">🇺🇸</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">English</span>
                  </div>
                </button>
                <button
                  onClick={() => setLanguage('bn')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                    language === 'bn'
                      ? 'border-green-600 bg-green-50 dark:bg-green-900'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-2xl mb-2 block">🇧🇩</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">বাংলা</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('system_information')}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('account_created')}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">January 15, 2020</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('password_changed')}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">30 {t('date')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('login_sessions')}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">2 {t('active')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('data_usage')}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">2.4 GB</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium">
              {t('deactivate_account')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}