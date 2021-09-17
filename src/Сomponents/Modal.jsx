import React from "react";

export default function Modal({ activeModal, setActiveModal, children }) {
  const closeActiveModal = () => {
    setActiveModal(false);
  };

  return (
    <div
      className={activeModal ? "modal active" : "modal"}
      onClick={closeActiveModal}
    >
      <div
        className={activeModal ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__close" onClick={closeActiveModal}>
          <span>×</span>
        </div>
        {children}
      </div>
    </div>
  );
}
