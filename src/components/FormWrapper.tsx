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
      className="max-w-lg mx-auto p-8 bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_30px_rgb(59,130,246,0.12),0_20px_60px_rgb(37,99,235,0.15)] flex flex-col gap-6 border border-blue-100/60 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50/60 before:via-sky-50/40 before:to-indigo-50/50 before:rounded-[2rem] before:-z-10"
    >
      {/* Floating orbs */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-blue-400/25 via-sky-400/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tr from-indigo-400/25 via-blue-400/15 to-transparent rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-sky-300/8 via-blue-300/8 to-indigo-300/8 rounded-full blur-3xl"></div>

      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-blue-50/30 rounded-[2rem] pointer-events-none"></div>

      <div className="relative z-10">
        {title && (
          <div className="mb-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 bg-clip-text text-transparent tracking-tight leading-snug drop-shadow-md transition-transform duration-300 hover:scale-105">
              {title}
            </h2>
            <div className="w-20 h-1.5 rounded-full mx-auto mt-4 bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 shadow-lg animate-pulse"></div>
          </div>
        )}
        {description && (
          <p className="text-sm text-slate-600/90 text-center mb-2 leading-relaxed font-medium">
            {description}
          </p>
        )}
      </div>

      <div className="relative z-10 space-y-5">{children}</div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)]"></div>
    </form>
  );
}
