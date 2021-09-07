import React from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = ({onClick}) => {
  return <div className={styles.backdrop} onClick={onClick}></div>;
};
const ModalOverlay = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const overlaysPortal = document.getElementById("overlays");
const Modal = ({ children, onHide }) => {
  return (
    <>
      {ReactDom.createPortal(<Backdrop onClick={onHide} />, overlaysPortal)}
      {ReactDom.createPortal(
        <ModalOverlay> {children} </ModalOverlay>,
        overlaysPortal
      )}
    </>
  );
};

export default Modal;
