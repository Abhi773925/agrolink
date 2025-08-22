import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'p-6',
  glass = true,
  status, // 'success' | 'warning' | 'error' | 'info'
  ...props 
}) => {
  // AgroLink theme colors
  const statusStyles = {
    success: {
      bg: 'bg-[#22C55E]/20',
      text: 'text-[#22C55E]'
    },
    warning: {
      bg: 'bg-[#FACC15]/20',
      text: 'text-[#FACC15]'
    },
    error: {
      bg: 'bg-[#EF4444]/20',
      text: 'text-[#EF4444]'
    },
    info: {
      bg: 'bg-[#3B82F6]/20',
      text: 'text-[#3B82F6]'
    }
  };

  const currentStatus = status ? statusStyles[status] : {};
  const baseClasses = `
    ${padding} rounded-2xl border border-[#374151] 
    bg-[#1F2937] text-[#FFFFFF] 
    transition-all duration-300 
    ${hover ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FACC15]/20' : ''} 
    ${glass ? 'backdrop-blur-md bg-opacity-80' : ''}
    ${currentStatus.bg || ''} ${currentStatus.text || ''}
    ${className}
  `;

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = '' }) => {
  return (
    <h3 
      className={`text-xl font-bold text-[#FFFFFF] ${className}`}
    >
      {children}
    </h3>
  );
};

const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`text-[#D1D5DB] ${className}`}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;

export default Card;
