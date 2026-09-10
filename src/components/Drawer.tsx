import type { ReactNode } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Drawer = ({ open, onClose, title, children }: DrawerProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Fechar drawer"
        className="absolute inset-0 h-full w-full cursor-default bg-slate-950/40"
        onClick={onClose}
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <button
            type="button"
            aria-label="Fechar drawer"
            className="cursor-pointer rounded-md p-2 text-2xl leading-none text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        {children}
      </aside>
    </div>
  );
};
