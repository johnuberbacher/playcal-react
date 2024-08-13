import React from "react";

const Button = ({ color, text, fullWidth, onClick, disabled, size }) => {
  // Helper function to get Tailwind classes based on button color
  const getColorClasses = (color) => {
    switch (disabled) {
      case true:
        return "bg-gray-300 text-gray-700 cursor-not-allowed";
    }

    switch (color) {
      case "primary":
        return "bg-indigo-600 text-white hover:bg-indigo-500";
      case "blue":
        return "bg-blue-500 text-white hover:bg-blue-600";
      case "red":
        return "bg-red-500 text-white hover:bg-red-600";
      case "green":
        return "bg-green-500 text-white hover:bg-green-600";
      case "yellow":
        return "bg-yellow-500 text-white hover:bg-yellow-600";
      default:
        return "bg-white text-gray-900 hover:bg-gray-50 ring-1 ring-inset ring-gray-300";
    }
  };

  const buttonColorClasses = getColorClasses(color);
  const buttonWidthClasses = fullWidth ? "w-full" : "w-auto";
  const buttonSizeClasses = size === 'small' ? "px-3 h-[30px] text-xs" : "px-4 h-[40px] text-sm";

  const handleClick = () => {
    // Call the onClick function passed as prop
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      disabled={disabled}
      type="button"
      className={`select-none flex items-center justify-center rounded-md ${buttonSizeClasses} ${buttonColorClasses} text-center font-semibold text-gray-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${buttonWidthClasses}`}
      id="menu-button"
      aria-expanded="false"
      aria-haspopup="true"
      onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
