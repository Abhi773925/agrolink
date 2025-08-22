import React from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  className = '' 
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#111827]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className={`relative w-full ${sizes[size]} bg-[#1F2937] border border-[#374151] rounded-xl shadow-2xl transform transition-all ${className}`}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-[#374151]">
            <h3 className="text-xl font-bold text-[#FFFFFF]">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#D1D5DB] hover:text-[#FFFFFF] hover:bg-[#374151] transition-all duration-200"
            >
              ✕
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6 text-[#FFFFFF]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
