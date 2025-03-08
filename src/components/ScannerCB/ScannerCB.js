import React, { useRef, useEffect } from "react";

const BarcodeScannerModal = ({ barcode, setBarcode, onClose, onScan }) => {
    const barcodeInputRef = useRef(null);

    // Foca automaticamente no input invisível quando o modal é aberto
    useEffect(() => {
        if (barcodeInputRef.current) {
            barcodeInputRef.current.focus();
        }
    }, []);

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Escaneie o Código de Barras</h2>
                <p>Aponte a máquina leitora para escanear o código.</p>
                <input
                    type="text"
                    ref={barcodeInputRef}
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    onKeyDown={onScan}
                    style={{ opacity: 0, position: 'absolute', top: '-9999px' }} // Input invisível
                    autoFocus // Foca automaticamente no campo
                />
            </div>
        </div>
    );
};

export default BarcodeScannerModal;