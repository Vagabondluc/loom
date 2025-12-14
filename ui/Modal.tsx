import React, { useEffect, useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  inert?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, actions, className, inert }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  // Handle escape key via native dialog behavior
  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault(); // Prevent native close to allow controlled state
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle"
      onCancel={handleCancel}
    >
      <div className={cn("modal-box", className)}>
        {title && <h3 className="font-bold text-lg mb-4">{title}</h3>}
        {inert ? (
          <div className="pointer-events-none opacity-80">{children}</div>
        ) : (
          children
        )}

        <div className="modal-action">
          {inert ? (
            actions ? actions : <button className="btn btn-disabled">Close</button>
          ) : (
            actions ? (
              actions
            ) : (
              <form method="dialog">
                <button className="btn" onClick={onClose}>Close</button>
              </form>
            )
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};
