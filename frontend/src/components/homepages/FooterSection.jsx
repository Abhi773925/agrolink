"use client"

import { useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Leaf,
  Wheat,
  Users,
  Shield,
  Award,
  Globe,
  ArrowUp,
  Heart,
} from "lucide-react"
import logo from '../../assets/agro.png';
import { useNavigate } from "react-router-dom";
const FooterSection = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const navigate= useNavigate();
  const gotohome=()=>{
    navigate('/');
    scrollToTop();
  }
  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
    services: [
      { name: "For Farmers", href: "/farmers" },
      { name: "For Buyers", href: "/buyers" },
      { name: "Marketplace", href: "/marketplace" },
      { name: "Weather API", href: "/weather" },
      { name: "Logistics", href: "/logistics" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faq" },
      { name: "Community", href: "/community" },
      { name: "Documentation", href: "/docs" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Refund Policy", href: "/refund" },
      { name: "Compliance", href: "/compliance" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/agrolink", color: "hover:text-blue-400" },
    { icon: Twitter, href: "https://twitter.com/agrolink", color: "hover:text-sky-400" },
    { icon: Instagram, href: "https://instagram.com/agrolink", color: "hover:text-pink-400" },
    { icon: Linkedin, href: "https://linkedin.com/company/agrolink", color: "hover:text-blue-500" },
    { icon: Youtube, href: "https://youtube.com/agrolink", color: "hover:text-red-400" },
  ]

  const achievements = [
    { icon: Users, text: "15K+ Farmers", color: "text-blue-400" },
    { icon: Globe, text: "500+ Cities", color: "text-green-400" },
    { icon: Award, text: "98% Satisfaction", color: "text-yellow-400" },
    { icon: Shield, text: "100% Secure", color: "text-purple-400" },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-green-400/10 to-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-r from-yellow-400/8 to-yellow-600/8 rounded-full blur-3xl"></div>

        {/* Floating Elements */}
        <div className="absolute top-10 right-10 w-6 h-6 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-4 h-4 bg-gradient-to-r from-yellow-400/25 to-yellow-600/25 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-5 h-5 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-full"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="border-b border-gray-700/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Brand Section */}
              <div className="text-center lg:text-left">
                <div onClick={gotohome} className="flex items-center justify-center lg:justify-start gap-3 mb-4 cursor-pointer">
                  <div onClick={gotohome} className="w-12 h-12 bg-gradient-to-r from-green-400 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg cursor-pointer">
                    
                    <img src={logo}></img>
                  </div>
                  <h3 className="text-2xl font-black">
                    <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                      AgroLink
                    </span>
                  </h3>
                </div>
                <p className="text-gray-300 text-lg font-medium max-w-md mx-auto lg:mx-0">
                  Connecting farmers with the future of agriculture through technology and innovation.
                </p>
              </div>

              {/* Achievements */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
                  >
                    <achievement.icon className={`w-6 h-6 ${achievement.color} mx-auto mb-2`} />
                    <p className="text-white font-bold text-sm">{achievement.text}</p>
                  </div>
                ))}
              </div>

              {/* Newsletter */}
              <div className="text-center lg:text-right">
                <h4 className="text-xl font-bold text-white mb-3">Stay Updated</h4>
                <p className="text-gray-300 mb-4 text-sm">Get the latest agricultural news and updates</p>
                <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm mx-auto lg:ml-auto lg:mr-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 rounded-l-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 backdrop-blur-sm text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-4 py-2.5 rounded-r-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                {isSubscribed && <p className="text-green-400 text-sm mt-2 font-medium">✅ Successfully subscribed!</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Company Links */}
              <div>
                <h5 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  Company
                </h5>
                <ul className="space-y-2">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm font-medium hover:underline"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Links */}
              <div>
                <h5 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <Wheat className="w-4 h-4" />
                  Services
                </h5>
                <ul className="space-y-2">
                  {footerLinks.services.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 text-sm font-medium hover:underline"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h5 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Support
                </h5>
                <ul className="space-y-2">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm font-medium hover:underline"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h5 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Legal
                </h5>
                <ul className="space-y-2">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm font-medium hover:underline"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-gray-700/30 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              {/* Email */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium">Email Us</p>
                  <a
                    href="mailto:support@agrolink.com"
                    className="text-white font-bold hover:text-green-400 transition-colors duration-300"
                  >
                    rockabhisheksingh778189@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium">Call Us</p>
                  <a
                    href="tel:+1234567890"
                    className="text-white font-bold hover:text-yellow-400 transition-colors duration-300"
                  >
                    +91 7739254874
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium">Visit Us</p>
                  <p className="text-white font-bold">Chapra,Bihar, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/30 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>© 2025 AgroLink. Made with</span>
                <Heart className="w-4 h-4 text-red-400" />
                <span>for farmers worldwide.</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-600/30 backdrop-blur-sm`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-green-400/30"
                title="Back to top"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
