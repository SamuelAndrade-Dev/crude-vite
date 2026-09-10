import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ open, onClose, title, children }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        aria-label="Fechar modal"
        className="absolute inset-0 h-full w-full cursor-default bg-slate-950/40"
        onClick={onClose}
      />

      <section className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 id="modal-title" className="text-xl font-semibold text-slate-900">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Fechar modal"
            className="cursor-pointer rounded-md p-2 text-2xl leading-none text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        {children}
      </section>
    </div>
  );
};
