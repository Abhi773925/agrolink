import React, { useState, useEffect } from "react";
import {
  Search,
  Menu,
  X,
  User,
  Bell,
  ChevronDown,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/agro.png';
const AgroLinkNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const navGroups = [
    {
      title: "Marketplace",
      items: [
        { name: "Marketplace", href: "/marketplace" },
        { name: "My Crops", href: "/mycrop" },
        { name: "Buy Crops", href: "#" },
      ],
    },
    {
      title: "Resources",
      items: [
        { name: "Learning Center", href: "#" },
        { name: "Weather", href: "/weather" },
        { name: "Community", href: "/chat" },
      ],
    },
  ];
  const go=()=>{
    navigate('/');
  }
  return (
    <nav className="bg-black/95 backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mr-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative cursor-pointer" onClick={go}>
              <img  className="h-13"src={logo}></img>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-4 items-center rounded-2xl border-1 border-amber-100">
            {/* Dashboard */}
            <a
              href="/"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group text-yellow-400"
            >
              Dashboard
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
            </a>

            {/* Dropdown Groups */}
            {navGroups.map((group) => (
              <div key={group.title} className="relative group">
                <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-all duration-300 flex items-center space-x-1">
                  <span>{group.title}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full  w-52 p-2 bg-gray-900/95 backdrop-blur-md border border-yellow-500/20 rounded-xl shadow-lg shadow-yellow-400/10 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50 space-y-1">
                  {group.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-all duration-300 rounded-lg"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-yellow-400/50" />
              </div>
              <input
                type="text"
                placeholder="Search crops, courses..."
                className="pl-10 pr-4 py-2 bg-gray-800/50 border-1 border-amber-100 rounded-2xl text-sm w-64 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
              />
            </div>

            {/* Notifications */}
            {user && (
              <button className="relative p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-800/50 rounded-lg transition-all duration-300">
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
              </button>
            )}

            {/* Profile or Auth */}
            <div className="relative">
              {user ? (
                <>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 rounded-lg transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-black" />
                    </div>
                    <span className="text-sm hidden sm:block">
                      {user.name || user.email}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-xl shadow-black/20 py-2 z-50">
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-all duration-300"
                      >
                        My Profile
                      </a>
                      <a
                        href="/myorders"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-all duration-300"
                      >
                        My Orders
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-all duration-300"
                      >
                        Saved Courses
                      </a>
                      <hr className="my-2 border-gray-700/50" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800/50 transition-all duration-300"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 rounded-lg transition-all duration-300"
                  >
                    <LogIn className="h-4 w-4 mr-1" /> Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="flex items-center px-4 py-2 text-sm bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-medium rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg shadow-yellow-400/20"
                  >
                    <UserPlus className="h-4 w-4 mr-1" /> Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-800/50 rounded-lg transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-800/50">
            <div className="px-2 mt-4 pt-4 pb-3 space-y-1 bg-gray-900/50 backdrop-blur-md rounded-2xl">
              {/* Search */}
              <div className="md:hidden mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search crops, courses..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Dashboard */}
              <a
                href="/"
                className="block px-3 py-2 rounded-lg text-base font-medium text-yellow-400 bg-yellow-400/10"
              >
                Dashboard
              </a>

              {/* Mobile Dropdown Groups */}
              {navGroups.map((group) => (
                <div key={group.title} className="mb-4 p-3 bg-gray-900/80 border border-yellow-500/10 rounded-xl">
                  <span className="block text-sm font-semibold text-gray-400 mb-2">
                    {group.title}
                  </span>
                  {group.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-all duration-300"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              ))}

              {/* Auth in Mobile */}
              {!user ? (
                <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-800/50">
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full text-center px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 rounded-lg transition-all duration-300 border border-gray-700/50"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="w-full text-center px-4 py-2 text-sm bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-medium rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg shadow-yellow-400/20"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-gray-800/50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-center px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800/50 rounded-lg transition-all duration-300 border border-gray-700/50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AgroLinkNavbar;
