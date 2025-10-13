import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, MessageCircle, Phone, Mail, Book, Search, ChevronDown, ChevronRight, Send } from 'lucide-react';
import { useLanguage } from '../../stores/useLanguage';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export function HelpSupport() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [supportForm, setSupportForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    message: '',
  });

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I create a new passport booking?',
      answer: 'To create a new passport booking, navigate to Bookings > Create Booking from the sidebar menu. Fill in all required information including applicant details, contact information, and emergency contact details.',
      category: 'bookings',
    },
    {
      id: '2',
      question: 'What is OTP verification and why is it required?',
      answer: 'OTP (One-Time Password) verification is a security measure to confirm the delivery phone number. It ensures that the passport will be delivered to the correct person at the verified phone number.',
      category: 'security',
    },
    {
      id: '3',
      question: 'How do I track the status of a booking?',
      answer: 'You can track booking status by going to Bookings > All Bookings and clicking on the specific booking. The status timeline shows all updates from initial creation to final delivery.',
      category: 'bookings',
    },
    {
      id: '4',
      question: 'What should I do if I forgot my password?',
      answer: 'Contact your system administrator to reset your password. For security reasons, password resets must be handled by authorized personnel.',
      category: 'account',
    },
    {
      id: '5',
      question: 'How do I create and manage delivery bags?',
      answer: 'Go to Bags > Create Bag to create a new delivery bag. You can add items to the bag, close it when ready, and track its delivery status through the bags section.',
      category: 'bags',
    },
    {
      id: '6',
      question: 'Can I change the language of the interface?',
      answer: 'Yes, you can switch between English and Bengali by clicking on the language dropdown in the header next to your profile icon.',
      category: 'general',
    },
  ];

  const categories = [
    { key: 'all', label: 'All Categories' },
    { key: 'bookings', label: 'Bookings' },
    { key: 'bags', label: 'Bags & Delivery' },
    { key: 'security', label: 'Security' },
    { key: 'account', label: 'Account' },
    { key: 'general', label: 'General' },
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle support ticket submission
    console.log('Support ticket submitted:', supportForm);
    alert('Support ticket submitted successfully! We will get back to you within 24 hours.');
    setSupportForm({ subject: '', category: '', priority: 'medium', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('help_support')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('contact_support')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Options */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('contact_support')}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{t('phone_support')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">+880-2-9898989</p>
                  <p className="text-xs text-gray-500">Mon-Fri, 9 AM - 6 PM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Mail className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{t('email_support')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">support@passport.gov.bd</p>
                  <p className="text-xs text-gray-500">Response within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <MessageCircle className="h-5 w-5 text-purple-600" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{t('live_chat')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Available 24/7</p>
                  <button className="text-xs text-purple-600 hover:text-purple-700">Start Chat</button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('help_support')}</h3>
            <div className="space-y-2">
              {[
                { label: 'User Manual', icon: Book },
                { label: 'Video Tutorials', icon: HelpCircle },
                { label: 'System Status', icon: MessageCircle },
                { label: 'Release Notes', icon: Book },
              ].map((link, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <link.icon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t('faq')}</h3>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('search_faqs')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.key} value={category.key}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* FAQ List */}
            <div className="space-y-3">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No FAQs found matching your search.</p>
                </div>
              ) : (
                filteredFAQs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                      {expandedFAQ === faq.id ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                    {expandedFAQ === faq.id && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full capitalize">
                          {faq.category}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Support Ticket Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t('submit_ticket')}</h3>
            
            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('ticket_subject')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={supportForm.subject}
                    onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="Brief description of your issue"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('ticket_category')} *
                  </label>
                  <select
                    required
                    value={supportForm.category}
                    onChange={(e) => setSupportForm({ ...supportForm, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="technical">Technical Issue</option>
                    <option value="account">Account Problem</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('ticket_priority')}
                </label>
                <select
                  value={supportForm.priority}
                  onChange={(e) => setSupportForm({ ...supportForm, priority: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('ticket_message')} *
                </label>
                <textarea
                  required
                  rows={6}
                  value={supportForm.message}
                  onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="Please provide detailed information about your issue..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 font-medium"
              >
                <Send className="h-4 w-4" />
                {t('submit_ticket_btn')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}