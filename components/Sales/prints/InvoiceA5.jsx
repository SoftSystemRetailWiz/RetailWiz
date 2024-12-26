import React from 'react';

const InvoiceA5 = ({ invoiceData, customerData, products, summary }) => {
    return (
        <div
            style={{
                width: '148mm',
                height: '210mm',
                margin: '0',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <div
                style={{
                    width: '100%',
                    padding: '10mm',
                    boxSizing: 'border-box',
                    border: '1px solid #ddd',
                    overflow: 'hidden',
                }}
            >
                {/* Title Section */}
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <h4>{invoiceData.storeName}</h4>
                    <p>{invoiceData.storeAddress}</p>
                </div>

                {/* Header Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <p><b>Invoice No:</b> {invoiceData.invoiceNo}</p>
                        <p><b>Date:</b> {invoiceData.date}</p>
                        <p><b>Customer:</b> {customerData.name}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p><b>Payment Type:</b> {invoiceData.paymentType}</p>
                        <p><b>Wk No:</b> {invoiceData.wkNo}</p>
                    </div>
                </div>

                {/* Products Table */}
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        marginTop: '10px',
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '5px', textAlign: 'left' }}>Code</th>
                            <th style={{ border: '1px solid black', padding: '5px', textAlign: 'left' }}>Product & Description</th>
                            <th style={{ border: '1px solid black', padding: '5px', textAlign: 'left' }}>Qty</th>
                            <th style={{ border: '1px solid black', padding: '5px', textAlign: 'left' }}>Rate</th>
                            <th style={{ border: '1px solid black', padding: '5px', textAlign: 'left' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid black', padding: '5px' }}>{product.code}</td>
                                <td style={{ border: '1px solid black', padding: '5px' }}>{product.description}</td>
                                <td style={{ border: '1px solid black', padding: '5px' }}>{product.qty}</td>
                                <td style={{ border: '1px solid black', padding: '5px' }}>{product.rate}</td>
                                <td style={{ border: '1px solid black', padding: '5px' }}>{product.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Summary Section */}
                <div style={{ marginTop: '10px' }}>
                    <p><b>Amount in Words:</b> {summary.amountInWords}</p>
                    <p><b>Previous Balance:</b> {summary.previousBalance}</p>
                    <p><b>Ledger Current Balance:</b> {summary.ledgerBalance}</p>
                </div>

                {/* Totals Section */}
                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                    <p><b>G. Total:</b> {summary.grossTotal}</p>
                    <p><b>Discount:</b> {summary.discount}</p>
                    <p><b>Net Total:</b> {summary.netTotal}</p>
                </div>

                {/* Footer */}
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <p>Thanks for Shopping</p>
                    <p>Signature: __________________</p>
                </div>
            </div>
        </div>
    );
};

export default InvoiceA5;
