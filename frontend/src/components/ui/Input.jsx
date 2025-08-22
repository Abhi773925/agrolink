import React, { forwardRef } from 'react';

const Input = forwardRef(({
  type = 'text',
  label,
  error,
  className = '',
  icon: Icon,
  ...props
}, ref) => {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label 
          className="block text-sm font-medium text-[#D1D5DB]"
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon className="w-5 h-5 text-[#D1D5DB]" />
          </div>
        )}

        <input
          ref={ref}
          type={type}
          className={`
            w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3
            rounded-xl border border-[#374151] bg-[#1F2937] text-[#FFFFFF]
            placeholder-[#D1D5DB] transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E]
            ${error ? 'border-[#EF4444] text-[#EF4444] focus:ring-[#EF4444]/50 focus:border-[#EF4444]' : ''}
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm text-[#EF4444] mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
