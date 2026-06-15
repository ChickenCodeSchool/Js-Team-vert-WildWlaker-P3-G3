import { useEffect, useRef } from "react";

import type { ModalImagePickerProps } from "../../types/Events";

import "./ModalImagePicker.css";

function ModalImagePicker({
  isOpen,
  onClose,
  images,
  onSelectImage,
}: ModalImagePickerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      onClose();
    }
  };
  return (
    <dialog
      ref={dialogRef}
      className="ModalImagePicker-Backdrop"
      onClick={handleBackdropClick}
      onKeyUp={() => {}}
      onCancel={onClose}
      aria-labelledby="modal-image-title"
    >
      <div className="ModalImagePicker-Global">
        <h3 className="ModalImagePicker-Title" id="modal-image-title">
          Changez l'image de votre événement
        </h3>
        <div className="ModalImagePicker-Grid">
          {images.map((img) => (
            <button
              key={img}
              type="button"
              className="ModalImagePicker-ImageButton"
              onClick={() => onSelectImage(img)}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}${img}`}
                alt={img}
                className="ModalImagePicker-Image"
              />
            </button>
          ))}
        </div>
        <div className="ModalImagePicker-Footer">
          <button
            type="button"
            className="ModalImagePicker-ButtonCancel"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ModalImagePicker;
