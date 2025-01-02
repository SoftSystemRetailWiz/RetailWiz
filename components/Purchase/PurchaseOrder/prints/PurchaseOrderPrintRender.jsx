import React, { useState } from 'react';
import PurchaseOrderInvoiceA4 from './PurchaseOrderInvoiceA4';
import PurchaseOrderInvoiceA5 from './PurchaseOrderInvoiceA5';
import PurchaseOrderThermalReceipt from './PurchaseOrderThermalReceipt';
import { ArrowDownToLine } from 'lucide-react';
import { jsPDF } from 'jspdf'; // Make sure to import jsPDF
import html2canvas from 'html2canvas';

function PurchaseOrderPrintRender() {
    const [A4, setA4] = useState(true);
    const [A5, setA5] = useState(false);
    const [thermal, setThermal] = useState(false);

    function generatepdf(newWidth, newHeight) {
        const data = document.getElementById('printScreen');
        html2canvas(data).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            // Get the original dimensions of the canvas
            
            // Create a new jsPDF instance
            const doc = new jsPDF();

            // Add the image to the PDF with the adjusted width and height
            doc.addImage(imgData, 'PNG', 10, 10, newWidth, newHeight);
            A4? doc.save('PurchaseOrderA4.pdf'): A5?  doc.save('PurchaseOrderA5.pdf'): doc.save('PurchaseOrderThermal.pdf')
        });
    }

    const handleA4 = () => {
        setA4(true);
        setA5(false);
        setThermal(false);
    };

    const handleA5 = () => {
        setA4(false);
        setA5(true);
        setThermal(false);
    };

    const handleThermal = () => {
        setA4(false);
        setA5(false);
        setThermal(true);
    };

    const handlePrint = () => {
        const printContents = document.getElementById('printScreen').innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        window.location.reload()

    };

    return (
        <div>
            <div className="d-flex gap-3 mt-4 mb-2 ms-3" id="printwindow">
                <button onClick={handleA4} className="btn btn-outline-primary btn-sm" aria-label="A4 Format">
                    A4
                </button>
                <button onClick={handleA5} className="btn btn-outline-primary btn-sm" aria-label="A5 Format">
                    A5
                </button>
                <button onClick={handleThermal} className="btn btn-outline-primary btn-sm" aria-label="Thermal Receipt">
                    Thermal
                </button>
                <button onClick={handlePrint} className="btn btn-outline-primary btn-sm" aria-label="Print Invoice">
                    Print
                </button>
                
                {/* Correcting the onClick handlers to pass function references */}
                {A4 && (
                    <button onClick={() => generatepdf(320,200 )} className="btn btn-outline-primary btn-sm" aria-label="Download PDF">
                        PDF <ArrowDownToLine />
                    </button>
                )}
                {A5 && (
                    <button onClick={() => generatepdf(450, 200)} className="btn btn-outline-primary btn-sm" aria-label="Download PDF">
                        PDF <ArrowDownToLine />
                    </button>
                )}
                {thermal && (
                    <button onClick={() => generatepdf(300, 100)} className="btn btn-outline-primary btn-sm" aria-label="Download PDF">
                        PDF <ArrowDownToLine />
                    </button>
                )}
            </div>

            <div id="printScreen">
                {A4 && <PurchaseOrderInvoiceA4 />}
                {A5 && <PurchaseOrderInvoiceA5 />}
                <div className="container-fluid d-flex justify-content-between">
                    {thermal && <PurchaseOrderThermalReceipt className="thermal-receipt" />}
                </div>
            </div>
        </div>
    );
}

export default PurchaseOrderPrintRender;
