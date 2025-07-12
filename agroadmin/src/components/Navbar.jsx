"use client";
import logo from "../../../frontend/src/assets/agro.png";
import { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Bell,
  Search,
  Menu,
  X,
  LogIn,
  Shield,
  Eye,
  List,
  BarChart3,
  Warehouse,
  ChevronDown,
  Settings,
  LifeBuoy,
  Mail,
  LineChart,
  ClipboardList,
  UsersRound,
  LayoutDashboard,
  Lock,
} from "lucide-react";

const ADMIN_SECRET_CODE = "7739254874";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPasskeyInput, setShowPasskeyInput] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState(null);
  const [openMobileCollapsible, setOpenMobileCollapsible] = useState(null);

  const profileDropdownRef = useRef(null);
  const desktopNavDropdownRef = useRef(null);
  const passkeyInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Working Link component from first navbar
  const Link = ({ to, children, className = '', onClick }) => {
    return (
      <RouterLink
        to={to}
        className={className}
        onClick={(e) => {
          if (onClick) onClick(e);
        }}
      >
        {children}
      </RouterLink>
    );
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setOpenDesktopDropdown(null);
      }
      if (
        desktopNavDropdownRef.current &&
        !desktopNavDropdownRef.current.contains(event.target)
      ) {
        setOpenDesktopDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus on passkey input when it appears
  useEffect(() => {
    if (showPasskeyInput && passkeyInputRef.current) {
      passkeyInputRef.current.focus();
    }
  }, [showPasskeyInput]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDesktopDropdown(null);
    setOpenMobileCollapsible(null);
  }, [location.pathname]);

  const navGroups = [
    {
      title: "Dashboard",
      items: [
        { name: "Overview", to: "/overview", icon: LayoutDashboard },
        { name: "Recent Orders", to: "/recent-orders", icon: ShoppingCart },
        { name: "Analytics", to: "/analytics", icon: TrendingUp },
        { name: "Notifications", to: "/notifications", icon: Bell },
      ],
    },
    {
      title: "Management",
      items: [
        { name: "All Farmers", to: "/all-farmers", icon: Users },
        { name: "All Listings", to: "/all-listings", icon: List },
        { name: "Stocks", to: "/stocks", icon: Warehouse },
        { name: "Products", to: "/products", icon: Package },
        { name: "Customers", to: "/customers", icon: UsersRound },
      ],
    },
    {
      title: "Reports",
      items: [
        { name: "Total Orders", to: "/total-orders", icon: BarChart3 },
        { name: "Total Earnings", to: "/total-earnings", icon: DollarSign },
        { name: "Sales Trends", to: "/sales-trends", icon: LineChart },
        {
          name: "Inventory Report",
          to: "/inventory-report",
          icon: ClipboardList,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        { name: "General Settings", to: "/general-settings", icon: Settings },
        { name: "Security", to: "/security", icon: Shield },
        { name: "Integrations", to: "/integrations", icon: Eye },
      ],
    },
    {
      title: "Support",
      items: [
        { name: "Help Center", to: "/help-center", icon: LifeBuoy },
        { name: "Contact Us", to: "/contact-us", icon: Mail },
      ],
    },
  ];

  const handleLoginClick = () => {
    setShowPasskeyInput(true);
    setLoginError("");
  };

  const handleLogin = () => {
    if (adminCode === ADMIN_SECRET_CODE) {
      setIsLoggedIn(true);
      setShowPasskeyInput(false);
      setLoginError("");
      setAdminCode("");
      try {
        localStorage.setItem("adminlogin", "true");
        console.log("Login successful - adminlogin set to true");
        // Navigate to dashboard after successful login
        navigate("/overview");
      } catch (error) {
        console.error("Error saving login state:", error);
      }
    } else {
      setLoginError("Invalid passkey. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowPasskeyInput(false);
    setAdminCode("");
    setLoginError("");
    setOpenDesktopDropdown(null);
    setIsMenuOpen(false);
    try {
      localStorage.removeItem("adminlogin");
      console.log("Logout successful - adminlogin removed from localStorage");
      // Navigate to home after logout
      navigate("/");
    } catch (error) {
      console.error("Error removing login state:", error);
    }
  };

  const handleCancelLogin = () => {
    setShowPasskeyInput(false);
    setAdminCode("");
    setLoginError("");
  };

  const toggleDesktopDropdown = (title) => {
    setOpenDesktopDropdown(openDesktopDropdown === title ? null : title);
  };

  const toggleMobileCollapsible = (title) => {
    setOpenMobileCollapsible(openMobileCollapsible === title ? null : title);
  };

  // Check if current route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Check if any item in a group is active
  const isGroupActive = (group) => {
    return group.items.some(item => isActiveRoute(item.to));
  };

  return (
    <nav className="bg-black sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <Link to="/">
                <img
                  src={logo}
                  className="h-10 cursor-pointer transition-transform duration-200 hover:scale-105"
                  alt="AgroLink Logo"
                />
              </Link>
            </div>
            <div>
              <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-yellow-400 font-medium bg-yellow-400/10 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                Admin
              </span>
            </div>
          </div>
          
          {/* Desktop Nav (only shown if logged in) */}
          {isLoggedIn && (
            <div className="hidden lg:flex xl:space-x-2 lg:space-x-1 items-center">
              {/* Dashboard - Direct Link */}
              <Link
                to={navGroups[0].items[0].to}
                className={`xl:px-4 lg:px-3 py-2 rounded-lg xl:text-sm lg:text-xs font-medium transition-all duration-300 relative group ${
                  isActiveRoute(navGroups[0].items[0].to)
                    ? 'text-yellow-400 bg-gray-800/50'
                    : 'text-white hover:text-yellow-400 hover:bg-gray-800'
                }`}
              >
                <span className="hidden xl:inline">{navGroups[0].title}</span>
                <span className="xl:hidden lg:inline">Dash</span>
                {isActiveRoute(navGroups[0].items[0].to) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                )}
              </Link>
              
              {/* Dropdown Groups */}
              {navGroups.slice(1).map((group) => (
                <div
                  key={group.title}
                  className="relative"
                  ref={desktopNavDropdownRef}
                >
                  <button
                    onClick={() => toggleDesktopDropdown(group.title)}
                    className={`xl:px-4 lg:px-3 py-2 rounded-lg xl:text-sm lg:text-xs font-medium transition-all duration-300 flex items-center space-x-1 ${
                      isGroupActive(group)
                        ? 'text-yellow-400 bg-gray-800/50'
                        : 'text-white hover:text-yellow-400 hover:bg-gray-800'
                    }`}
                  >
                    <span className="hidden xl:inline">{group.title}</span>
                    <span className="xl:hidden lg:inline">
                      {group.title === "Management"
                        ? "Mgmt"
                        : group.title === "Settings"
                        ? "Set"
                        : group.title === "Reports"
                        ? "Rep"
                        : group.title === "Support"
                        ? "Sup"
                        : group.title}
                    </span>
                    <ChevronDown
                      className={`h-3 w-3 xl:h-4 xl:w-4 transition-transform duration-200 ${
                        openDesktopDropdown === group.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDesktopDropdown === group.title && (
                    <div className="absolute top-full left-0 mt-2 w-52 p-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl shadow-black/30 transition-all duration-200 z-50 space-y-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          onClick={() => setOpenDesktopDropdown(null)}
                          className={`flex items-center space-x-3 px-4 py-2 text-sm rounded-md transition-all duration-300 w-full text-left ${
                            isActiveRoute(item.to)
                              ? 'text-yellow-400 bg-gray-800'
                              : 'text-white hover:text-yellow-400 hover:bg-gray-800'
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Right Side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search */}
            {isLoggedIn && (
              <div className="hidden lg:block relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search admin panel..."
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm xl:w-64 lg:w-48 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                />
              </div>
            )}
            
            {/* Search Icon for md screens */}
            {isLoggedIn && (
              <div className="md:block lg:hidden">
                <button className="p-2 text-white hover:text-yellow-400 hover:bg-gray-800 rounded-lg transition-all duration-300">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            )}
            
            {/* Notifications */}
            {isLoggedIn && (
              <Link
                to="/notifications"
                className={`relative p-2 rounded-lg transition-all duration-300 ${
                  isActiveRoute("/notifications")
                    ? 'text-yellow-400 bg-gray-800'
                    : 'text-white hover:text-yellow-400 hover:bg-gray-800'
                }`}
              >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold hidden sm:inline">
                    5
                  </span>
                </div>
              </Link>
            )}
            
            {/* Profile or Auth */}
            <div className="relative" ref={profileDropdownRef}>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-xl shadow-sm text-black bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform mr-4 shadow-lg hover:shadow-xl"
                >
                  Logout
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  {!showPasskeyInput ? (
                    <button
                      onClick={handleLoginClick}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-medium rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg shadow-yellow-400/20"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      <span className="text-sm">Login</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <div className="flex items-center">
                          <Lock className="h-4 w-4 text-gray-400 absolute left-3 z-10" />
                          <input
                            ref={passkeyInputRef}
                            type="password"
                            placeholder="Enter passkey"
                            value={adminCode}
                            onChange={(e) => {
                              setAdminCode(e.target.value);
                              setLoginError("");
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleLogin();
                              } else if (e.key === "Escape") {
                                handleCancelLogin();
                              }
                            }}
                            className="pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm w-36 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                          />
                        </div>
                        {loginError && (
                          <p className="absolute -bottom-6 left-0 text-red-400 text-xs w-full text-center whitespace-nowrap">
                            {loginError}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={handleLogin}
                        className="flex items-center px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
                      >
                        <span className="text-sm">Go</span>
                      </button>
                      <button
                        onClick={handleCancelLogin}
                        className="flex items-center px-3 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Mobile Toggle */}
            {isLoggedIn && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 text-white hover:text-yellow-400 hover:bg-gray-800 rounded-lg transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
                <span className="sr-only">Toggle navigation menu</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && isLoggedIn && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden pointer-events-auto"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      
      {/* Mobile Menu Content */}
      {isLoggedIn && (
        <div
          className={`fixed inset-y-0 left-0 w-64 sm:w-72 bg-gray-950 border-r border-gray-800 p-4 sm:p-6 z-50 transform transition-transform duration-300 ease-in-out lg:hidden pointer-events-auto ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Close button for mobile menu */}
            <div className="flex justify-end mb-4 sm:mb-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white hover:text-yellow-400 hover:bg-gray-800 rounded-lg transition-all duration-300"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            
            {/* Logo in mobile sheet */}
            <div className="flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-yellow-400/20 shadow-lg">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold text-white">
                  AgroLink
                </span>
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-yellow-400 font-medium bg-yellow-400/10 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                  Admin
                </span>
              </div>
            </div>
            
            {/* Search in Mobile */}
            <div className="mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search admin panel..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                />
              </div>
            </div>
            
            {/* Mobile Navigation Links */}
            <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-3">
              {navGroups.map((group) => (
                <div key={group.title} className="w-full">
                  <button
                    onClick={() => toggleMobileCollapsible(group.title)}
                    className={`flex w-full items-center justify-between px-3 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                      isGroupActive(group)
                        ? 'text-yellow-400 bg-gray-800'
                        : 'text-white hover:text-yellow-400 hover:bg-gray-800'
                    }`}
                  >
                    <span>{group.title}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        openMobileCollapsible === group.title
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openMobileCollapsible === group.title
                        ? "max-h-screen opacity-100 pt-1"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-2 sm:ml-4 space-y-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 w-full text-left ${
                            isActiveRoute(item.to)
                              ? 'text-yellow-400 bg-gray-800'
                              : 'text-white hover:text-yellow-400 hover:bg-gray-800'
                          }`}
                        >
                          <item.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Auth in Mobile */}
            <div className="mt-auto pt-4 sm:pt-6 border-t border-gray-800">
              <button
                onClick={handleLogout}
                className="w-full text-center px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg transition-all duration-300 border border-gray-700 bg-transparent"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Access Denied Overlay */}
      {!isLoggedIn && !showPasskeyInput && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 flex items-center justify-center">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-md mx-4 text-center">
            <Lock className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Access Restricted
            </h2>
            <p className="text-gray-400 mb-6">
              Please login with your admin passkey to access the dashboard.
            </p>
            <button
              onClick={handleLoginClick}
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-medium rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg shadow-yellow-400/20"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Login to Continue
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;