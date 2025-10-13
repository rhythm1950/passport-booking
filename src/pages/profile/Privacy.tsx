import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, EyeOff, Download, Trash2, Lock, Database, UserCheck } from 'lucide-react';
import { useLanguage } from '../../stores/useLanguage';

export function Privacy() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private',
    activityTracking: false,
    dataCollection: true,
    thirdPartySharing: false,
    marketingEmails: false,
    analyticsOptOut: false,
  });

  const [dataRetention, setDataRetention] = useState({
    loginHistory: '90',
    activityLogs: '365',
    personalData: 'indefinite',
  });

  const handlePrivacyChange = (key: keyof typeof privacySettings, value: any) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
  };

  const handleDataRetentionChange = (key: keyof typeof dataRetention, value: string) => {
    setDataRetention(prev => ({ ...prev, [key]: value }));
  };

  const exportData = () => {
    // Simulate data export
    const data = {
      profile: {
        name: 'System Administrator',
        email: 'admin@passport.gov.bd',
        role: 'admin',
        joinDate: '2020-01-15',
      },
      activity: {
        bookingsCreated: 247,
        bagsProcessed: 89,
        otpsVerified: 156,
        lastLogin: new Date().toISOString(),
      },
      settings: privacySettings,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'passport-booking-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteAllData = () => {
    if (window.confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      // Handle data deletion
      console.log('Data deletion requested');
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('privacy')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('privacy_controls')} {t('data_management')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Privacy Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('privacy_controls')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('data_management')}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('profile_visibility')}
              </label>
              <div className="space-y-2">
                {[
                  { value: 'public', label: t('public'), desc: 'Visible to all users' },
                  { value: 'private', label: t('private'), desc: 'Only visible to you' },
                  { value: 'team', label: t('team_only'), desc: 'Visible to team members' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="profileVisibility"
                      value={option.value}
                      checked={privacySettings.profileVisibility === option.value}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      className="text-green-600 focus:ring-green-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{option.label}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  key: 'activityTracking',
                  title: t('activity_tracking'),
                  description: 'Track usage patterns',
                },
                {
                  key: 'dataCollection',
                  title: t('data_collection'),
                  description: 'Collect usage data',
                },
                {
                  key: 'thirdPartySharing',
                  title: t('third_party_sharing'),
                  description: 'Share data with partners',
                },
                {
                  key: 'marketingEmails',
                  title: t('marketing_emails'),
                  description: 'Receive promotional emails',
                },
                {
                  key: 'analyticsOptOut',
                  title: t('analytics_opt_out'),
                  description: 'Opt out of analytics',
                },
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{setting.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyChange(setting.key as keyof typeof privacySettings, !privacySettings[setting.key as keyof typeof privacySettings])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      privacySettings[setting.key as keyof typeof privacySettings] ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        privacySettings[setting.key as keyof typeof privacySettings] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Database className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Management</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('data_retention')}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">{t('data_retention')}</h4>
              <div className="space-y-4">
                {[
                  { key: 'loginHistory', label: 'Login History', options: ['30', '90', '180', '365'] },
                  { key: 'activityLogs', label: 'Activity Logs', options: ['90', '180', '365', '730'] },
                  { key: 'personalData', label: 'Personal Data', options: ['365', '1095', 'indefinite'] },
                ].map((item) => (
                  <div key={item.key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {item.label}
                    </label>
                    <select
                      value={dataRetention[item.key as keyof typeof dataRetention]}
                      onChange={(e) => handleDataRetentionChange(item.key as keyof typeof dataRetention, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    >
                      {item.options.map((option) => (
                        <option key={option} value={option}>
                          {option === 'indefinite' ? 'Indefinite' : `${option} days`}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">{t('data_management')}</h4>
              <div className="space-y-3">
                <button
                  onClick={exportData}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  {t('export_data')}
                </button>
                <button
                  onClick={deleteAllData}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  {t('delete_all_data')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Usage Overview */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('data_management')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('privacy_controls')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <UserCheck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">Profile Data</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Name, email, role information</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">Activity Data</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Login times, actions performed</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Lock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">Security Data</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Login attempts, device info</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Eye className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">Usage Data</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Feature usage, preferences</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">{t('privacy_rights')}</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>• Right to access your personal data</li>
              <li>• Right to correct inaccurate data</li>
              <li>• Right to delete your data</li>
              <li>• Right to data portability</li>
              <li>• Right to object to processing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}