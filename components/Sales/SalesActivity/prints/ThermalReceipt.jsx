import React, {useEffect} from 'react';
import logo from '../../../../src/assets/logo.png'

function ThermalReceipt(){
  const data1= localStorage.getItem('invoiceViewRef');
      const data= JSON.parse(data1);
  
      const rawtotal = localStorage.getItem('a_total');
      const total = JSON.parse(rawtotal);

  
      const selectivekeys = [ 'rate', 'qty', 'item_desc_invoice'];
      const header = data.length > 0 ? 
      Object.keys(data[0]).filter((key) => selectivekeys.includes(key)).reverse() 
      : 
      [];
  
      const headData =data[0]
      console.log('headData:', headData);
  





  return (
    <div className="container-fluid ms-0 my-2" style={{ width: '80mm', fontSize: '12px' }}>
      <div className="card">
        <div className="card-header text-center">
          <div className='d-flex justify-content-between'>
            <div>
              <img
              src={logo} 
              alt="" 
              style={{
                width: '95px'
              }}
              />
            </div>
            <div></div>
            <div></div>
          </div>
          <h4 style={{ fontSize: '16px' }}>{headData['fld_brand']}</h4>
          <p style={{ fontSize: '12px' }}>{headData['address']}</p>
          <h6 style={{ fontSize: '14px' }}>Sales Receipt</h6>
          <p style={{ fontSize: '12px' }}>Invoice No: {headData['inv_no']}</p>
          <p style={{ fontSize: '12px' }}>Date: {headData['inv_date']}</p>
        </div>
        <div className="card-body">
          <div className="row mb-1">
            <div className="col-6">
              <strong>Bill To: </strong>{headData['customer_nam']}
            </div>
            <div className="col-6 text-end">
              <strong>Cashier: </strong>{headData['sales_man']}
            </div>
          </div>
          <table className="table table-bordered ms-0">
            <thead className="table-light">
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

                      <td key={index}>{(item['qty']*item['rate'])- item['discount']}</td>
              </tr>
                  ))}
                   
            </tbody>
          </table>
          <div className=" container-fluid d-flex justify-content-between">
            <div></div>
            <div></div>
            <div className="col-6 text-end">
              <strong>Total: </strong> {total}
            </div>
          </div>
          
        </div>
        <div className="text-center mt-2">
          <p style={{ fontSize: '12px' }}>Thanks for Shopping</p>
          <p style={{ fontSize: '10px' }}>
            <em>Powered by {headData['fld_brand']} </em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThermalReceipt;
