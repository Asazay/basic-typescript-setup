import {useRef, useState, useContext, createContext} from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

const ModalContext = createContext<null | any>(null);

// @ts-ignore
export function ModalProvider({ children }) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalContent, setModalContent] = useState<null | React.FunctionComponent>(null);
    // callback function that will be called when modal is closing
    const [onModalClose , setOnModalClose] = useState<null | Function>(null);

    const closeModal = () => {
        setModalContent(null); // clear the modal contents
        // If callback function is truthy, call the callback function and reset it
        // to null:
        if (typeof onModalClose === 'function') {
            setOnModalClose(null);
            onModalClose();
        }
    };

    const contextValue = {
        modalRef, // reference to modal div
        modalContent, // React component to render inside modal
        setModalContent, // function to set the React component to render inside modal
        setOnModalClose, // function to set the callback function called when modal is closing
        closeModal // function to close the modal
    };

    return (
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal() {
    const { modalRef, modalContent, closeModal } = useContext(ModalContext);
    // If there is no div referenced by the modalRef or modalContent is not a
    // truthy value, render nothing:
    if (!modalRef || !modalRef.current || !modalContent) return null;

    // Render the following component to the div referenced by the modalRef
    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={closeModal} />
            <div id="modal-content">
                {modalContent}
            </div>
        </div>,
        modalRef.current
    );
}

export const useModal = () => useContext(ModalContext);