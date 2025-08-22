import React, { useState } from 'react';
import { Clock, ArrowRight, X } from 'lucide-react';

const Notifications = () => {
  const [dismissed, setDismissed] = useState(false);
  
  // Replace this with your actual Google Form URL
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdvKpeY7wmGDCA0m9DY7asC6cPFUg1baEFdC7F2E3LhkblAlg/viewform?usp=sharing&ouid=107018076541286586913";
  
  const handleFeedbackClick = () => {
    window.open(googleFormUrl, '_blank');
  };

  if (dismissed) return null;

  return (
    <div className="fixed top-18 left-4 right-4 z-50 sm:top-18 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2">
      <div className="bg-gradient-to-r from-yellow-300 via-amber-200 to-amber-400 backdrop-blur-md border border-gray-200/50 rounded-full shadow-lg px-3 py-1 sm:px-6 max-w-md mx-auto">
        
        {/* Unified Layout - Horizontal for both mobile and desktop */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {/* Beta Badge */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="bg-blue-100 rounded-full p-1 sm:p-1.5">
              <Clock className="text-blue-600" size={14} />
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="bg-blue-600 text-[#FFFFFF] text-xs font-semibold px-2 py-1 rounded-full">
                Beta
              </span>
              <span className="text-gray-800 text-xs font-semibold sm:text-sm">
                We're actively improving.
              </span>
            </div>
          </div>

          {/* Share Feedback Button */}
          <button
            onClick={handleFeedbackClick}
            className="bg-[#22C55E] hover:bg-[#374151 text-[#D1D5DB] font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#22C55E]/20 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap"
          >
            <span className="hidden sm:inline">Share Feedback</span>
            <span className="sm:hidden">Feedback</span>
            <ArrowRight size={12} className="sm:hidden" />
            <ArrowRight size={14} className="hidden sm:inline" />
          </button>

          {/* Dismiss Button
          <button
            onClick={() => setDismissed(true)}
            className="text-[#D1D5DB] hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Notifications;