import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, User, Moon, Sun, Settings, Bell, Shield, HelpCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '../../stores/useAuth';
import { useTheme } from '../../stores/useTheme';
import { useLanguage } from '../../stores/useLanguage';
import * as authService from '../../services/auth';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await authService.logoutMock();
      logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const profileMenuItems = [
    { icon: User, label: t('profile'), action: () => navigate('/profile') },
    { icon: Settings, label: t('account_settings'), action: () => navigate('/profile/settings') },
    { icon: Bell, label: t('notifications'), action: () => navigate('/profile/notifications') },
    { icon: Shield, label: t('privacy'), action: () => navigate('/profile/privacy') },
    { icon: HelpCircle, label: t('help_support'), action: () => navigate('/profile/help') },
  ];

  const languageOptions = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PB</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('passport_booking')}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{t('government_of_bangladesh')}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
          </div>
          
          <div className="flex items-center gap-1">
            {/* Language Dropdown */}
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <span className="text-sm">
                  {languageOptions.find(opt => opt.code === language)?.flag}
                </span>
                <span className="text-sm font-medium hidden sm:block">
                  {languageOptions.find(opt => opt.code === language)?.label}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => {
                        setLanguage(option.code as 'en' | 'bn');
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        language === option.code 
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span>{option.flag}</span>
                      <span>{option.label}</span>
                      {language === option.code && (
                        <div className="ml-auto w-2 h-2 bg-green-600 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
                    {user?.branch_code && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">Branch: {user.branch_code}</p>
                    )}
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    {profileMenuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setShowProfileDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-1">
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      {t('logout')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}