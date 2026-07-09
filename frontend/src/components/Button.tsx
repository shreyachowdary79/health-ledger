import type { ButtonHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}

export function PremiumButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full bg-premium px-5 py-3 text-sm font-semibold text-slate-950 shadow-glow transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_90px_rgba(16,185,129,0.26)] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute inset-0 -translate-x-full bg-white/30 mix-blend-screen transition-transform duration-700 group-hover:animate-sheen" />
      <span className="relative">{props.children}</span>
    </button>
  );
}

export function GlassButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 shadow-soft backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}
