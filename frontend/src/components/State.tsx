import type { ReactNode } from "react";

export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="glass-panel rounded-[28px] p-8 text-center text-sm text-slate-300">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-emerald-400/40 border-t-emerald-300" />
      <p className="mt-4">{label}</p>
    </div>
  );
}

export function EmptyState({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="glass-panel rounded-[28px] p-8 text-center text-slate-200">
      <p className="text-sm font-medium">{title}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-[28px] border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200 shadow-soft">
      {message}
    </div>
  );
}
