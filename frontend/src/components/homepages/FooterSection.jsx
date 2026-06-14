import { ArrowUp, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/agro.png";

const footerLinks = {
  Platform: [
    { name: "Marketplace", href: "/marketplace" },
    { name: "My Crops", href: "/mycrop" },
    { name: "Community", href: "/chat" },
    { name: "Weather", href: "/weather" },
  ],
  Account: [
    { name: "Profile", href: "/profile" },
    { name: "Orders", href: "/myorders" },
    { name: "Login", href: "/login" },
    { name: "Sign Up", href: "/signup" },
  ],
};

const FooterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  const onSubscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 2500);
  };

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-8">
        <section className="lg:col-span-4">
          <button onClick={() => navigate("/")} className="mb-4 flex items-center gap-2" aria-label="Go home">
            <img src={logo} alt="AgroLink" className="h-10 w-10 rounded-md object-cover" />
            <span className="text-lg font-semibold text-gray-900">AgroLink</span>
          </button>
          <p className="max-w-md text-sm leading-6 text-gray-600">
            Enterprise-grade digital agriculture platform connecting farmers, buyers, and logistics through reliable
            commerce and operational tools.
          </p>
          <div className="mt-6 space-y-3 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-green-700" />
              rockabhisheksingh778189@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-green-700" />
              +91 7739254874
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-700" />
              Chapra, Bihar, India
            </p>
          </div>
        </section>

        <section className="grid gap-8 sm:grid-cols-2 lg:col-span-4">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-sm text-gray-600 hover:text-green-700">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="lg:col-span-4">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">Newsletter</h3>
          <p className="mb-4 text-sm text-gray-600">Get product and market updates in your inbox.</p>
          <form onSubmit={onSubscribe} className="flex w-full max-w-sm">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-10 w-full rounded-l-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
            <button type="submit" className="inline-flex h-10 w-10 items-center justify-center rounded-r-lg bg-green-700 text-white hover:bg-green-800" aria-label="Subscribe">
              <Send className="h-4 w-4" />
            </button>
          </form>
          {subscribed && <p className="mt-3 text-sm text-green-700">Subscribed successfully.</p>}
        </section>
      </div>

      <div className="border-t border-gray-200">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-600">© 2026 AgroLink. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
