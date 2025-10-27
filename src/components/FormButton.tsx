import React, { useState, useRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  throttle?: number;
}

const FormButton: React.FC<ButtonProps> = ({
  type = "submit",
  variant = "primary",
  throttle = 1000,
  className = "",
  children,
  disabled,
  ...props
}) => {
  const [isThrottled, setIsThrottled] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   if (isThrottled || disabled) {
  //     e.preventDefault();
  //     return;
  //   }

  //   setIsThrottled(true);
  //   timerRef.current = setTimeout(() => setIsThrottled(false), throttle);
  // };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isThrottled || disabled) {
      e.preventDefault();
      return;
    }                                                           
    // console.log("clicked!");
    setIsThrottled(true);
    timerRef.current = setTimeout(() => setIsThrottled(false), throttle);
    e.currentTarget.form?.requestSubmit();
  };

  const base =
    "relative overflow-hidden font-medium py-2.5 px-5 rounded-lg shadow-md transition-all duration-300 active:scale-95 focus:outline-none";

  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white",
    secondary:
      "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white",
    danger:
      "bg-gradient-to-r from-red-600 to-pink-600 hover:from-pink-600 hover:to-red-600 text-white",
    outline:
      "border border-gray-400 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isThrottled || disabled}
      className={`${base} ${variants[variant]} ${className} ${
        isThrottled ? "opacity-60 cursor-not-allowed" : ""
      }`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isThrottled && (
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </span>
      <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-10 bg-white transition-opacity duration-300" />
    </button>
  );
};

export default FormButton;
