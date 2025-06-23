"use client"
import axiosInstance from '@/utils/axiosInstance';
import { useAuth } from '@/utils/useAuth.js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardLayout({ children }) {
  const { loading } = useAuth();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <div className="text-gray-600 font-medium">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  const handleLogOut = async() => {
    try {
      setIsMobileMenuOpen(false); // Close mobile menu
      const response = await axiosInstance.post('/auth/signout');
      console.log(response.data);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch(err) {
      console.log(err);
    }
  }

  const handleRouter = (route) => {
    console.log(`Navigating to ${route}...`);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
    setTimeout(() => {
      router.push(`${route}`);
    }, 300);
  }

  const navItems = [
    { 
      label: 'Dashboard Overview', 
      route: '/admin/dashboard', 
      icon: '📊',
      description: 'Main dashboard view'
    },
    { 
      label: 'Contact Reviews', 
      route: '/admin/dashboard/contactus', 
      icon: '💬',
      description: 'Manage contact inquiries'
    },
    { 
      label: 'Reservations', 
      route: '/admin/dashboard/reservations', 
      icon: '📅',
      description: 'View and manage bookings'
    },
    { 
      label: 'Gallery Management', 
      route: '/admin/dashboard/gallery', 
      icon: '🖼️',
      description: 'Upload and organize images'
    },
    { 
      label: 'Create Blog Post', 
      route: '/blogs/create', 
      icon: '✍️',
      description: 'Write new blog content'
    },
    { 
      label: 'Back to Website', 
      route: '/', 
      icon: '🏠',
      description: 'Return to main site'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 roboto-en relative">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${isCollapsed ? 'w-20' : 'w-72'} 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        fixed md:static inset-y-0 left-0 z-50
        bg-white border-r border-gray-200 shadow-sm 
        transition-all duration-300 ease-in-out 
        flex flex-col
        md:w-auto md:${isCollapsed ? 'w-20' : 'w-72'}
      `}>
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Management Dashboard</p>
              </div>
            )}
            <div className="flex items-center space-x-2">
              {/* Mobile close button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
                title="Close menu"
              >
                <span className="text-gray-500 text-xl">×</span>
              </button>
              {/* Desktop collapse button */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors hidden md:block"
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <span className="text-gray-500">
                  {isCollapsed ? '→' : '←'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 md:p-4 overflow-y-auto">
          <ul className="space-y-1 md:space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleRouter(item.route)}
                  className="w-full flex items-center p-2 md:p-3 rounded-lg text-left hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                  title={isCollapsed ? item.label : ''}
                >
                  <span className="text-lg md:text-xl mr-2 md:mr-3 group-hover:scale-110 transition-transform flex-shrink-0">
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 group-hover:text-blue-700 text-sm md:text-base truncate">
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        {item.description}
                      </div>
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section & Logout */}
        <div className="p-3 md:p-4 border-t border-gray-200">
          <div className="mb-3">
            {!isCollapsed && (
              <div className="flex items-center p-2 md:p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base flex-shrink-0">
                  A
                </div>
                <div className="ml-2 md:ml-3 min-w-0 flex-1">
                  <div className="font-medium text-gray-900 text-sm md:text-base truncate">Administrator</div>
                  <div className="text-xs text-gray-500 truncate">System Admin</div>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={handleLogOut}
            className="w-full flex items-center p-2 md:p-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 group"
            title={isCollapsed ? 'Logout' : ''}
          >
            <span className="text-lg md:text-xl mr-2 md:mr-3 group-hover:scale-110 transition-transform flex-shrink-0">
              🚪
            </span>
            {!isCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <div className="font-medium text-sm md:text-base truncate">Logout</div>
                <div className="text-xs text-red-400 truncate">Sign out of account</div>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen md:ml-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
                title="Open menu"
              >
                <span className="text-gray-600 text-xl">☰</span>
              </button>
              
              <div className="min-w-0 flex-1">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 truncate">Dashboard</h2>
                <p className="text-xs md:text-sm text-gray-500 truncate">Welcome back to your admin panel</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="text-xs md:text-sm text-gray-500 hidden sm:block">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
              {/* Mobile date */}
              <div className="text-xs text-gray-500 sm:hidden">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6 bg-gray-50 overflow-auto">
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}