
import React, { useEffect } from 'react';
import logo from "../../../../src/assets/logo.png"


function SalesOrderInvoiceA4(){
    const data1= localStorage.getItem('salesOrderViewRef');
    const data= JSON.parse(data1);
   

    const rawtotal = localStorage.getItem('total');
    const total = JSON.parse(rawtotal);
    

    const shop_name= localStorage.getItem('shop_name');
    const shop_address= localStorage.getItem('shop_address');
    const phone_no= localStorage.getItem('phone_no');

    const selectivekeys = ['item_desc', 'qty', 'rate'];
    const header =  Object.keys(data[0])
    .filter((key)=> selectivekeys.includes(key))
    .sort((a,b)=> selectivekeys.indexOf(a)- selectivekeys.indexOf(b))
    

    const headData =data[0]
    

   

    return (
        <div
            style={{
                width: '210mm',
                height: '297mm',
                margin: '0',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <div className='printScreen'
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
                    </div>
                    <div style={{ textAlign: 'center' ,width: '70mm'}}>
                        <h4>{shop_name}</h4>
                        <p>{shop_address}</p>
                        <p>{phone_no}</p>
                    </div>
                    <div style={{width: '70mm'}}></div>
                </div>

                {/* Header Section */}
                <div className='mt-1' style={{ display: 'flex', justifyContent: 'between' }}>
                    <div>
                        <b>Sales Order No: </b>{headData['so_no']}
                    </div>
                    <div></div>
                    <div></div>
                    
                </div>
                
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'between' }}>
                    <div></div>
                    <div>
                        <b>Delivery Date: </b>{new Date(headData['delivery_date']).toLocaleDateString('en-GB')}
                    </div>
                    <div></div>
                    
                </div>
                
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'between' }}>
                    <div></div>
                    <div>
                        <b>Customer: </b>{headData['cust_name']}
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
                            {header.map((item, index)=>(
                                <th key={index}>{item}</th>
                            ))}
                           <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {data.map((item, index) => (
                        <tr key={index}>
                                {header.map((key, index) => (
                                    <td key={index}>{item[key]}</td>
                                ))}
                                <td>{item['rate']*item['qty']}</td>
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

export default SalesOrderInvoiceA4;
