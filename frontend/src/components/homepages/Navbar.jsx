import React, { useEffect, useState } from "react";
import { Bell, LogIn, Menu, User, UserPlus, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/agro.png";

const navItems = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "My Crops", href: "/mycrop" },
  { label: "Weather", href: "/weather" },
  { label: "Community", href: "/chat" },
];

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
          aria-label="Go to home"
        >
          <img src={logo} alt="AgroLink" className="h-9 w-9 rounded-md object-cover" />
          <span className="text-lg font-semibold text-gray-900">AgroLink</span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Dashboard
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user && (
            <button
              className="hidden h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 md:flex"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
          )}

          {user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-700 text-xs font-semibold text-white">
                  {(user.name || user.email || "U").slice(0, 1).toUpperCase()}
                </span>
                <span className="max-w-32 truncate">{user.name || user.email}</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
                  <Link to="/profile" className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Profile
                  </Link>
                  <Link to="/myorders" className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <button
                onClick={() => navigate("/login")}
                className="inline-flex h-10 items-center rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <LogIn className="mr-1 h-4 w-4" />
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="inline-flex h-10 items-center rounded-lg bg-green-700 px-3 text-sm font-medium text-white hover:bg-green-800"
              >
                <UserPlus className="mr-1 h-4 w-4" />
                Sign Up
              </button>
            </div>
          )}

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <nav className="space-y-1 p-4" aria-label="Mobile navigation">
            <Link to="/" className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Dashboard
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              {user ? (
                <>
                  <Link to="/profile" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Profile
                  </Link>
                  <Link to="/myorders" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => navigate("/login")}
                    className="flex h-10 w-full items-center justify-center rounded-lg border border-gray-300 text-sm font-medium text-gray-700"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="flex h-10 w-full items-center justify-center rounded-lg bg-green-700 text-sm font-medium text-white"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
