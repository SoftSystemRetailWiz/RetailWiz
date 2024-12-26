
import React, { useEffect } from 'react';


function InvoiceA4(){
    const data1= localStorage.getItem('invoiceViewRef');
    const data= JSON.parse(data1);

    const rawtotal = localStorage.getItem('total');
    const total = JSON.parse(rawtotal);
    console.log('total:', total);

    const selectivekeys = ['discount', 'rate', 'qty', 'item_desc_invoice'];
    const header = data.length > 0 ? 
    Object.keys(data[0]).filter((key) => selectivekeys.includes(key)).reverse() 
    : 
    [];

    const headData =data[0]
    console.log('headData:', headData);

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('invoiceViewRef');
            localStorage.removeItem('total');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <div
            style={{
                width: '210mm',
                height: '297mm',
                margin: '0',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <div
                style={{
                    width: '100%',
                    padding: '20px',
                    border: '1px solid #ddd',
                    boxSizing: 'border-box',
                }}
            >
                {/* Title Section */}
                <div style={{ textAlign: 'center' }}>
                    <h4>{headData['fld_brand']}</h4>
                    <p>Store Address</p>
                </div>

                {/* Header Section */}
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <p><b>Invoice No:</b>{headData['inv_no']}</p>
                        <p><b>Date:</b>{headData['inv_date']}</p>
                        <p><b>Customer:</b>{headData['customer_nam']}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p><b>Payment Type:</b> </p>
                        <p><b>Wk No:</b> </p>
                    </div>
                </div>

                {/* Products Table */}
                <div className='container-fluid'>
                <table className='table table-bordered'
                    style={{
                    }}
                >
                    <thead>
                        <tr>
                            {header.map((item, index)=>(
                                <th key={index}>{item}</th>
                            ))}
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {data.map((item, index) => (
                        <tr>
                                {header.map((key, index) => (
                                    <td key={index}>{item[key]}</td>
                                ))}

                                <td key={index}>{(item['qty']*item['rate'])- item['discount']}</td>
                        </tr>
                            ))}
                   
                    </tbody>
                </table>
                </div>

                {/* Totals Section */}
                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                    <p><b>G. Total:</b>{total}</p>
                    <p><b>Net Total:</b>{total}</p>
                </div>

                {/* Footer */}
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <p>Thanks for Shopping</p>
                    <p>Signature: __________________</p>
                </div>
            </div>
        </div>
    );
};

export default InvoiceA4;
