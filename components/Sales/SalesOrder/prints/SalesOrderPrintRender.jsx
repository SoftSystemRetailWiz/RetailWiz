import React, { useState } from 'react';
import SalesOrderInvoiceA4 from './SalesOrderInvoiceA4';
import SalesOrderInvoiceA5 from './SalesOrderInvoiceA5';
import SalesOrderThermalReceipt from './SalesOrderThermalReceipt';


function SalesOrderPrintRender() {
    const [A4, setA4] = useState(true);
    const [A5, setA5] = useState(false);
    const [thermal, setThermal] = useState(false);

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
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;

        window.location.reload(); // Ensure the React app re-renders
    };

    return (
        <div>
            <div className="d-flex gap-3 mt-4 mb-2 ms-3" id="printwindow">
                <div>
                    <button onClick={handleA4} className="btn btn-outline-primary btn-sm">
                        A4
                    </button>
                </div>
                <div>
                    <button onClick={handleA5} className="btn btn-outline-primary btn-sm">
                        A5
                    </button>
                </div>
                <div>
                    <button onClick={handleThermal} className="btn btn-outline-primary btn-sm">
                        Thermal
                    </button>
                </div>
                <div>
                    <button onClick={handlePrint} className="btn btn-outline-primary btn-sm">
                        Print
                    </button>
                </div>
            </div>

            <div id="printScreen">
                {A4 && <SalesOrderInvoiceA4 />}
                {A5 && <SalesOrderInvoiceA5 />}
                {thermal && <SalesOrderThermalReceipt/>}
                    
               
            </div>
        </div>
    );
}

export default SalesOrderPrintRender;
