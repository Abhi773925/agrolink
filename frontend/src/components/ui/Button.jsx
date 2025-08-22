import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  icon: Icon,
  ...props
}) => {
  // Theme-based styles for AgroLink dark mode
  const getButtonStyle = () => {
    const styles = {
      primary: {
        backgroundColor: "#22C55E", // Green Primary
        color: "#FFFFFF",
        border: "none",
      },
      primaryHover: {
        backgroundColor: "#16A34A", // Green Hover
      },
      secondary: {
        backgroundColor: "#1F2937", // Card
        color: "#FACC15", // Yellow Accent
        border: "1px solid #374151", // Border
      },
      outline: {
        backgroundColor: "transparent",
        color: "#22C55E",
        border: "2px solid #22C55E",
      },
      ghost: {
        backgroundColor: "transparent",
        color: "#FFFFFF",
        border: "none",
      },
      danger: {
        backgroundColor: "#EF4444",
        color: "#FFFFFF",
        border: "none",
      },
    };
    return styles[variant] || styles.primary;
  };

  // Size classes
  const getSizeClasses = () => {
    const sizes = {
      sm: "px-3 py-2 text-sm rounded-lg",
      md: "px-4 py-2.5 text-base rounded-xl",
      lg: "px-6 py-3 text-lg rounded-xl",
      xl: "px-8 py-4 text-xl rounded-2xl",
    };
    return sizes[size] || sizes.md;
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-medium
    transition-all duration-300 transform hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#22C55E]/50
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${loading ? "cursor-wait" : ""}
  `;

  return (
    <button
      className={`${baseClasses} ${getSizeClasses()} ${className}`}
      style={getButtonStyle()}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-[#1F2937] border-t-transparent rounded-full animate-spin" />
      )}
      {Icon && !loading && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};

export default Button;
