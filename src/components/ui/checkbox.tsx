import * as React from "react";

interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className = "",
      checked,
      defaultChecked,
      onCheckedChange,
      disabled = false,
      required = false,
      name,
      value,
      id,
      ...props
    },
    ref,
  ) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked || false);
    const isControlled = checked !== undefined;
    const checkedState = isControlled ? checked : isChecked;

    const handleClick = () => {
      if (disabled) return;

      const newChecked = !checkedState;

      if (!isControlled) {
        setIsChecked(newChecked);
      }

      if (onCheckedChange) {
        onCheckedChange(newChecked);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checkedState}
        data-state={checkedState ? "checked" : "unchecked"}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        id={id}
        className={`inline-flex items-center justify-center h-4 w-4 shrink-0 rounded-sm border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors hover:border-gray-400 ${
          checkedState ? "bg-blue-600 border-blue-600 text-white" : "bg-white"
        } ${className}`}
        {...props}
      >
        {checkedState && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
        {name && (
          <input
            type="checkbox"
            name={name}
            value={value}
            checked={checkedState}
            required={required}
            onChange={() => {}}
            tabIndex={-1}
            aria-hidden="true"
            style={{
              position: "absolute",
              opacity: 0,
              pointerEvents: "none",
              width: 0,
              height: 0,
            }}
          />
        )}
      </button>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
