import { useState, useRef } from "react";

export const Modal = ({title, setModal, children}) => {

    const elOverlay = useRef()


    const styledOverlay = {
        position: "fixed",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        zIndex: "11",
        backgroundColor: "rgba(0, 0, 0, 0.4"
    }

    const handleOverlayClick = (evt) => {
        if (evt.target === elOverlay.current) {
            setModal(false)
        }
    }

	return (
		<div style={styledOverlay} ref={elOverlay} onClick={handleOverlayClick}  className="d-flex justify-content-center align-items-center rounded">
			<div className="my-modal w-50 bg-white p-5 position-relative rounded">
                <div className="modal-header">
                    <h4>{title}</h4>
                    <button onClick={() => setModal(false)} className="btn btn-dark position-absolute top-0 end-0">&times;</button>
                </div>
                <div className="modal-content">{children}</div>
              
            </div>
		</div>
	);
};
