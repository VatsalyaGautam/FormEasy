import * as React from "react";

interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
}

const RadioGroupContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
  disabled: boolean;
  name?: string;
} | null>(null);

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className = "",
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      name,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue || "",
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleValueChange = (newValue: string) => {
      if (disabled) return;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    return (
      <RadioGroupContext.Provider
        value={{
          value: currentValue,
          onValueChange: handleValueChange,
          disabled,
          name,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={`grid gap-2 ${className}`}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className = "", value, disabled: itemDisabled, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext);

    if (!context) {
      throw new Error("RadioGroupItem must be used within a RadioGroup");
    }

    const {
      value: groupValue,
      onValueChange,
      disabled: groupDisabled,
      name,
    } = context;
    const isChecked = groupValue === value;
    const isDisabled = groupDisabled || itemDisabled;

    const handleClick = () => {
      if (!isDisabled) {
        onValueChange(value);
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
        role="radio"
        aria-checked={isChecked}
        data-state={isChecked ? "checked" : "unchecked"}
        disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`aspect-square h-4 w-4 rounded-full border border-gray-900 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 inline-flex items-center justify-center transition-colors ${
          isChecked ? "border-blue-600" : "border-gray-300"
        } ${className}`}
        {...props}
      >
        {isChecked && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-blue-600"
          >
            <circle cx="12" cy="12" r="12" />
          </svg>
        )}
        {name && (
          <input
            type="radio"
            name={name}
            value={value}
            checked={isChecked}
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

RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
