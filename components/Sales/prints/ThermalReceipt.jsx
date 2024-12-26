import React from 'react';

const ThermalReceipt = ({
  invoiceData,
  customerData,
  cashier,
  products,
  totals,
}) => {
  return (
    <div className="container my-2" style={{ width: '80mm', fontSize: '12px' }}>
      <div className="card">
        <div className="card-header text-center">
          <h4 style={{ fontSize: '16px' }}>{invoiceData.storeName}</h4>
          <p style={{ fontSize: '12px' }}>{invoiceData.storeAddress}</p>
          <h6 style={{ fontSize: '14px' }}>Sales Receipt</h6>
          <p style={{ fontSize: '12px' }}>Invoice No: {invoiceData.invoiceNo}</p>
          <p style={{ fontSize: '12px' }}>Date: {invoiceData.date}</p>
        </div>
        <div className="card-body">
          <div className="row mb-1">
            <div className="col-6">
              <strong>Bill To: </strong>{customerData.name}
            </div>
            <div className="col-6 text-end">
              <strong>Cashier: </strong>{cashier}
            </div>
          </div>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.qty}</td>
                  <td>{product.rate}</td>
                  <td>{product.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <div className="col-6">
              <strong>Total Qty: </strong>{totals.totalQty}
            </div>
            <div className="col-6 text-end">
              <strong>Total: </strong>{totals.totalAmount}
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-6">
              <strong>Paid: </strong>{totals.paidAmount}
            </div>
            <div className="col-6 text-end">
              <strong>Change: </strong>{totals.changeAmount}
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <p style={{ fontSize: '12px' }}>Thanks for Shopping</p>
          <p style={{ fontSize: '10px' }}>
            <em>Powered by {invoiceData.poweredBy}</em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThermalReceipt;
