"use client";
import { useRef, useState, useEffect } from "react";

export default function Modal({
    isOpen,
    hasCloseButton,
    onClose,
    children,
}: {
    isOpen: boolean;
    hasCloseButton?: boolean;
    onClose?: Function;
    children: React.ReactNode;
}) {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        setIsModalOpen(isOpen);
        const modalElement = modalRef.current;
        if (modalElement) {
            if (isModalOpen) {
                modalElement.close();
                modalElement.showModal();
            } else {
                modalElement.close();
            }
        }
    }, [isModalOpen, isOpen]);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setIsModalOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };

    return (
        <dialog ref={modalRef} className="p-4 rounded-md bg-slate-100" onKeyDown={handleKeyDown}>
            {hasCloseButton && (
                <span className="cursor-pointer ml-80 px-2 py-1 rounded-md text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-800" onClick={handleCloseModal}>
                    Close
                </span>
            )}
            {children}
        </dialog>
    );
}
