import * as React from "react"

interface SelectContextValue {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled: boolean;
  name?: string;
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

const useSelectContext = () => {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within a Select")
  }
  return context
}

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  children: React.ReactNode;
}

const Select = ({ value, defaultValue, onValueChange, disabled = false, name, children }: SelectProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const [open, setOpen] = React.useState(false)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleValueChange = (newValue: string) => {
    if (disabled) return
    
    if (!isControlled) {
      setInternalValue(newValue)
    }
    
    if (onValueChange) {
      onValueChange(newValue)
    }
    
    setOpen(false)
  }

  return (
    <SelectContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, open, setOpen, disabled, name }}>
      {children}
    </SelectContext.Provider>
  )
}

const SelectGroup = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <div className={className}>{children}</div>
}

interface SelectValueProps {
  placeholder?: string;
}

const SelectValue = ({ placeholder }: SelectValueProps) => {
  const { value } = useSelectContext()
  
  return (
    <span className={!value ? "text-gray-400" : ""}>
      {value || placeholder}
    </span>
  )
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className = "", children, ...props }, ref) => {
    const { open, setOpen, disabled } = useSelectContext()
    const triggerRef = React.useRef<HTMLButtonElement>(null)
    const [triggerWidth, setTriggerWidth] = React.useState(0)

    React.useImperativeHandle(ref, () => triggerRef.current!)

    React.useEffect(() => {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.offsetWidth)
      }
    }, [])

    const handleClick = () => {
      if (!disabled) {
        setOpen(!open)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    return (
      <>
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={`flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          data-width={triggerWidth}
          {...props}
        >
          {children}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-50"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </>
    )
  }
)

SelectTrigger.displayName = "SelectTrigger"

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
  position?: "popper" | "item-aligned";
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className = "", children, position = "popper" }, ref) => {
    const { open, setOpen, value, name } = useSelectContext()
    const contentRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => contentRef.current!)

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
          const trigger = document.querySelector('[role="combobox"]')
          if (trigger && !trigger.contains(event.target as Node)) {
            setOpen(false)
          }
        }
      }

      if (open) {
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [open, setOpen])

    if (!open) return null

    return (
      <>
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
        <div
          ref={contentRef}
          role="listbox"
          className={`absolute z-50 mt-1 max-h-60 min-w-[8rem] overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg ${className}`}
          style={{
            width: position === "popper" ? "var(--radix-select-trigger-width)" : undefined
          }}
        >
          <div className="p-1">
            {children}
          </div>
        </div>
        {name && (
          <input
            type="hidden"
            name={name}
            value={value}
          />
        )}
      </>
    )
  }
)

SelectContent.displayName = "SelectContent"

interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`px-2 py-1.5 text-sm font-semibold text-gray-900 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SelectLabel.displayName = "SelectLabel"

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className = "", value: itemValue, children, disabled = false, ...props }, ref) => {
    const { value, onValueChange } = useSelectContext()
    const isSelected = value === itemValue

    const handleClick = () => {
      if (!disabled) {
        onValueChange(itemValue)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    }

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 ${
          disabled ? "pointer-events-none opacity-50" : ""
        } ${className}`}
        {...props}
      >
        <span className="flex-1">{children}</span>
        {isSelected && (
          <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
      </div>
    )
  }
)

SelectItem.displayName = "SelectItem"

interface SelectSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`-mx-1 my-1 h-px bg-gray-200 ${className}`}
        {...props}
      />
    )
  }
)

SelectSeparator.displayName = "SelectSeparator"

const SelectScrollUpButton = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex cursor-default items-center justify-center py-1 ${className}`}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </div>
  )
}

const SelectScrollDownButton = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex cursor-default items-center justify-center py-1 ${className}`}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}