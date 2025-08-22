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
import logo from '../../assets/agro.png'
import { useNavigate } from "react-router-dom"

const FooterSection = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const navigate = useNavigate()

  const gotohome = () => {
    navigate('/')
    scrollToTop()
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

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
    { icon: Facebook, href: "https://facebook.com/agrolink" },
    { icon: Twitter, href: "https://twitter.com/agrolink" },
    { icon: Instagram, href: "https://instagram.com/agrolink" },
    { icon: Linkedin, href: "https://linkedin.com/company/agrolink" },
    { icon: Youtube, href: "https://youtube.com/agrolink" },
  ]

  const achievements = [
    { icon: Users, text: "15K+ Farmers" },
    { icon: Globe, text: "500+ Cities" },
    { icon: Award, text: "98% Satisfaction" },
    { icon: Shield, text: "100% Secure" },
  ]

  return (
    <footer className="bg-[#111827] text-[#FFFFFF]">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-12">
          {/* Brand */}
          <div className="text-center lg:text-left">
            <div onClick={gotohome} className="flex items-center justify-center lg:justify-start gap-3 mb-4 cursor-pointer">
              <div className="w-12 h-12 bg-[#1F2937] rounded-xl flex items-center justify-center shadow">
                <img src={logo} alt="AgroLink Logo" />
              </div>
              <h3 className="text-2xl font-black">AgroLink</h3>
            </div>
            <p className="text-[#D1D5DB] text-lg max-w-md mx-auto lg:mx-0">
              Connecting farmers with the future of agriculture through technology and innovation.
            </p>
          </div>

          {/* Achievements */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4">
            {achievements.map((achievement, i) => (
              <div key={i} className="text-center p-4 bg-[#1F2937] rounded-xl border border-[#374151]">
                <achievement.icon className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-sm font-bold">{achievement.text}</p>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="text-center lg:text-right">
            <h4 className="text-xl font-bold mb-3">Stay Updated</h4>
            <p className="text-[#D1D5DB] mb-4 text-sm">Get the latest agricultural news and updates</p>
            <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm mx-auto lg:ml-auto lg:mr-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-[#1F2937] border border-[#374151] rounded-l-lg px-4 py-2.5 text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none text-sm"
                required
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-[#FFFFFF] px-4 py-2.5 rounded-r-lg transition-all duration-300"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {isSubscribed && <p className="text-green-400 text-sm mt-2">✅ Successfully subscribed!</p>}
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([section, links], i) => (
            <div key={i}>
              <h5 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </h5>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-[#D1D5DB] hover:text-green-400 text-sm font-medium"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left mb-12">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#FFFFFF]" />
            </div>
            <div>
              <p className="text-[#D1D5DB] text-xs">Email Us</p>
              <a href="mailto:support@agrolink.com" className="text-[#FFFFFF] font-bold hover:text-green-400">rockabhisheksingh778189@gmail.com</a>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#FFFFFF]" />
            </div>
            <div>
              <p className="text-[#D1D5DB] text-xs">Call Us</p>
              <a href="tel:+1234567890" className="text-[#FFFFFF] font-bold hover:text-green-400">+91 7739254874</a>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#FFFFFF]" />
            </div>
            <div>
              <p className="text-[#D1D5DB] text-xs">Visit Us</p>
              <p className="text-[#FFFFFF] font-bold">Chapra, Bihar, India</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#D1D5DB] text-sm">
            <span>© 2025 AgroLink. Made with</span>
            <Heart className="w-4 h-4 text-[#F87171]" />
            <span>for farmers worldwide.</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1F2937] rounded-lg flex items-center justify-center text-[#D1D5DB] hover:text-green-400 transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-[#FFFFFF] hover:bg-green-700 transition-all duration-300"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
