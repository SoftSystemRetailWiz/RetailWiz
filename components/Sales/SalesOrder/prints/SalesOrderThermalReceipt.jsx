import React, {useEffect} from 'react';

function SalesOrderThermalReceipt(){
  const data1= localStorage.getItem('salesOrderViewRef');
      const data= JSON.parse(data1);
  
      const rawtotal = localStorage.getItem('total');
      const total = JSON.parse(rawtotal);
      console.log('total:', total);
  
      const selectivekeys = ['item_desc', 'qty', 'rate'];
    const header = data.length > 0
    ? Object.keys(data[0])
    .filter((key)=> selectivekeys.includes(key))
    .sort((a,b)=> selectivekeys.indexOf(a)- selectivekeys.indexOf(b))
    : 
    [];
  
      const headData =data[0]
      console.log('headData:', headData);
  
      useEffect(() => {
          const handleBeforeUnload = () => {
              localStorage.removeItem('salesOrderViewRef');
              localStorage.removeItem('total');
          };
  
          window.addEventListener('beforeunload', handleBeforeUnload);
  
          // Cleanup function to remove the event listener
          return () => {
              window.removeEventListener('beforeunload', handleBeforeUnload);
          };
      }, []);




  return (
    <div className="container-fluid ms-0 my-2" style={{ width: '80mm', fontSize: '12px' }}>
      <div className="card">
        <div className="card-header text-center">
          <h4 style={{ fontSize: '16px' }}>{headData['fld_brand']}</h4>
          <p style={{ fontSize: '12px' }}>{headData['address']}</p>
          <h6 style={{ fontSize: '14px' }}>Sales Receipt</h6>
          <p style={{ fontSize: '12px' }}>Sales Order No: {headData['so_no']}</p>
          <p style={{ fontSize: '12px' }}>Date: {new Date(headData['delivery_date']).toLocaleDateString('en-GB')}</p>
        </div>
        <div className="card-body">
          <div className="row mb-1">
            <div className="col-6">
              <strong>Bill To: </strong>{headData['cust_name']}
            </div>
            <div className="col-6 text-end">
              <strong>Cashier: </strong>{headData['sales_man']}
            </div>
          </div>
          <table className="table table-bordered ms-0">
            <thead className="table-light">
              <tr>
                <th>Desc</th>
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

                    <td key={index}>{(item['qty']*item['rate'])}</td>
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
            <em>Powered by {headData['fld_brand']? headData['fld_brand']: headData['address']} </em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesOrderThermalReceipt;
