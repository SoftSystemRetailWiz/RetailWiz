
import React, { useEffect } from 'react';
import logo from "../../../../src/assets/logo.png"


function InvoiceA4(){
    const data1= localStorage.getItem('invoiceViewRef');
    const data= JSON.parse(data1);
    

    const selectivekeys = ['discount', 'rate', 'qty', 'item_desc_invoice'];
    const header = data.length > 0 ? 
    Object.keys(data[0]).filter((key) => selectivekeys.includes(key)).reverse() 
    : 
    [];


    const rawtotal = localStorage.getItem('a_total');
    const total = JSON.parse(rawtotal);
    
    const headData =data[0]
    console.log('headData:', headData);

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('invoiceViewRef');
            localStorage.removeItem('a_total');
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
                <div className='container-fluid d-flex justify-content-between'
                >
                    {/* Title Section */}
                    <div style={{width: '70mm'}}>
                    <img
                        src={logo} 
                        alt="" 
                        style={{
                        width: '125px'
                        }}
                    />
                    </div >
                    <div style={{ textAlign: 'center', width: '70mm' }}>
                        <h4>{headData['fld_brand']}</h4>
                        <p>{headData['address']}</p>
                    </div>
                    <div style={{width: '70mm'}}></div>
                </div>

                {/* Header Section */}
                <div className='mt-1' style={{ display: 'flex', justifyContent: 'between' }}>
                    <div>
                        <b>Invoice No:</b>{headData['inv_no']}
                    </div>
                    <div></div>
                    <div></div>
                    
                </div>
                
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'between' }}>
                    <div></div>
                    <div>
                        <b>Date:</b>{headData['inv_date']}
                    </div>
                    <div></div>
                    
                </div>
                
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'between' }}>
                    <div></div>
                    <div>
                        <b>Customer:</b>{headData['customer_nam']}
                    </div>
                    <div></div>
                    
                </div>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'between' }}>
                    <div></div>
                    <div>
                        <b>Cashier:</b>{headData['sales_man']}
                    </div>
                    <div></div>
                    
                </div>

                
                        

                {/* Products Table */}
                <div className='container-fluid'>
                <table className='table table-bordered'
                    style={{
                    }}
                >
                    <thead>
                        <tr>
                            <th>Desc</th>
                            <th>Disc</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {data.map((item, index) => (
                        <tr key={index}>
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
                <div className='container-fluid d-flex justify-content-between'>
                    <div></div>
                    <div></div>
                    <div style={{ textAlign: 'right', marginTop: '20px' }}>
                        <p><b>G. Total:</b>{total}</p>
                        <p><b>Net Total:</b>{total}</p>
                    </div>

                </div>

                {/* Footer */}
                <div  className='container-fluid d-flex justify-content-between'>
                    <div></div>
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <p>Thanks for Shopping</p>
                        <p>Signature: __________________</p>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceA4;
