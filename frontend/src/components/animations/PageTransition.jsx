"use client"
import { useState, useEffect } from "react"
import logo from "../../assets/agro.png";

export default function PageTransition({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Super fast loading - just 1 second
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        {/* Sexy logo */}
        <div className="text-center">
          <div className="flex flex-col items-center justify-center mb-8">
            {/* Glassmorphism logo container */}
            <div className="relative group mb-4">
              <img src={logo} alt="AgroLink Logo" className="w-16 h-16 rounded-2xl" />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
            </div>
            
            {/* Sexy text - now below image */}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">Agro</span>Link
              </h1>
            </div>
          </div>
          
          {/* Modern loading indicator */}
          <div className="relative">
            <div className="w-10 h-10 border-3 border-gray-200 border-t-yellow-400 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-10 h-10 border-3 border-transparent border-r-yellow-400/50 rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="animate-in fade-in duration-300">
      {children}
    </div>
  )
}