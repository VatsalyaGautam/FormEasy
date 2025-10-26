import React from "react";

interface FormWrapperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export default function FormWrapper({
  title,
  description,
  children,
  onSubmit,
}: FormWrapperProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg flex flex-col gap-5 border border-neutral-200 dark:border-neutral-800"
    >
      {title && (
        <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      )}

      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-2">
          {description}
        </p>
      )}

      {children}
    </form>
  );
}