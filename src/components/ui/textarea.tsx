import * as React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[60px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
