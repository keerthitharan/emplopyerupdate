import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Users } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Staffing Expertises', href: '/staffing-expertises' },
    { name: 'Employee', href: '/employee' },
    { name: 'Contact', href: '/contact' },
    { name: 'Employer', href: '/employer' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 hover:shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Users className="h-8 w-8 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:text-blue-700" />
            <span className="text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-105">Hardskello</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50 shadow-md'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-lg'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 hover:rotate-180"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden border-t border-gray-200 transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          {isMenuOpen && (
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 transform hover:translate-x-2 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50 shadow-md'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;