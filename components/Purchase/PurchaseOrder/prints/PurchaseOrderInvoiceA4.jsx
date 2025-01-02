import React, { useEffect, useState } from 'react';
import logo from "../../../../src/assets/logo.png"

function PurchaseOrderInvoiceA4(){
    const [totalQty, setTotalQty]= useState()



    const data1= localStorage.getItem('PurchaseOrderViewRef');
    
    const data= data1? JSON.parse(data1): [];
 

    const selectivekeys = ['item_desc', 'qty', 'rate',];
    const header = data.length > 0
    ? Object.keys(data[0])
    .filter((key)=> selectivekeys.includes(key))
    .sort((a,b)=> selectivekeys.indexOf(a)- selectivekeys.indexOf(b))
    : 
    [];

    console.log('header', header)

    let headData =data[0]
    console.log('headData:', headData);

   



    
    const handleQtyTotal=()=>{
        let total=0
        data.forEach(item => {
            total +=  parseInt(item.qty);
        });
        setTotalQty(total)
    }

    useEffect(() => {
        handleQtyTotal();
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
                <div className='mb-2'
                style={{
                    borderBottom: '1px solid lightgrey'
                }}
                >
                    <div className='container-fluid d-flex justify-content-between'
                    >
                        {/* Header Section */}
                        <div style={{width: '70mm'}}>
                            <img
                                src={logo} 
                                alt="" 
                                style={{
                                width: '125px'
                                }}
                            />
                        </div>
                        {/* Brand Info Section */}
                        <div style={{width: '70mm', textAlign: 'center'}}>
                            <h4><b>RetailWiz Pvt.Ltd.</b></h4>
                            <p>alhafeez executive <br /> office# 811 Firdous market Lahore </p>
                        </div>
                        <div style={{width: '70mm'}}></div>
                    </div>
                    {/* Title Section */}
                    <div className='container-fluid d-flex justify-content-between mt-4'>
                        <div style={{width: '70mm'}}></div>
                        <div style={{width: '70mm'}}><h5><b>PURCHASE ORDER</b></h5></div>
                        <div style={{width: '70mm'}}></div>
                    </div>
                </div>


                {/* Body Head Section */}

                <div className='mb-2' style={{
                    borderBottom: '1px solid lightgrey'
                }}>
                    <div className='container-fluid d-flex justify-content-between'>
                        <div className='d-flex justify-content-between ' style={{width: '70mm', height: '40mm', flexDirection: 'column'}}>

                            <div>
                                <b>Supplier name: </b>
                                <p>{headData['cust_name']}</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div>Lahore</div>
                                <div></div>
                            </div>

                        </div>
                        <div style={{width: '70mm'}}>
                            <div className='d-flex justify-content-between'><b>Po No : </b>{headData['po_no']}</div>
                            <div className='d-flex justify-content-between'><b>Po Type: </b>{headData['po_type']}</div>
                            <div className='d-flex justify-content-between'><b>Ship To : </b>{headData['shipto']}</div>
                            <div className='d-flex justify-content-between'><b>Bill To : </b>{headData['billto']}</div>
                            
                        </div>
                        <div className='d-flex justify-content-between' style={{width: '70mm'}}>
                            <div></div>
                            <div><b>Date: </b> {new Date(headData['ord_date']).toLocaleDateString('en-GB')}</div>
                        </div>
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
                            <th>Desc</th>
                            <th>Qty</th>
                            <th>Rate</th>
                           <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index)=>(
                            <tr key={index}>
                                {header.map((subitem, subind)=>{
                                   return <td key={subind}>{item[subitem]}</td>
                                })}
                                <td >{item['rate']*item['qty']}</td>
                            </tr>
                        ))}

                       
                   
                    </tbody>
                </table>
                </div>

                {/* Totals Section */}
                <div className='d-flex justify-content-between me-3'>
                    <div></div>
                    <div>
                        <div className='mb-2 mt-2'><b>T_Qty: </b>{totalQty}</div>
                        <div><b>Total: </b>{headData['total_amount']}</div>
                        
                    </div>
                </div>

                {/* Remarks Section */}

                <div>
                    Remarks ___________________________________________________________________________
                    ___________________________________________________________________________________
                    ___________________________________________________________________________________
                    ___________________________________________________________________________________
                </div>


                {/* Footer */}
                <footer className='mt-5 pt-5'>
                    <div className='d-flex justify-content-between'>
                        <div style={{width: '67.75mm'}}>
                            <p>____________</p>
                            <p> Prepared By</p>
                        </div>
                        <div style={{width: '67.75mm' }}>
                            <p>___________</p>
                            <p>Reviewed by <br />Manager</p>
                        </div>
                        <div style={{width: '67.75mm' }}>
                            <p>_____________</p>
                            <p>Acknowledged <br />By Accounts</p>
                        </div>
                        <div style={{width: '67.75mm'}}>
                            <p>_______________</p>
                            <p>Approved by CEO</p>
                        </div>
                    </div>
                    
                </footer>
            </div>
        </div>
    );
};

export default PurchaseOrderInvoiceA4;
