import React, { useEffect, useState } from 'react';
import { FilePenLine, Printer, Send } from 'lucide-react';
import { fetchData } from '../../utills/ApiRequest';
import Loader from '../../Loader/Loader';


function SalesOrder() {
    const [orderData, setOrderData] = useState([]);
    const [search, setSearch] = useState('');
    const [invoiceViewRef, setInvoiceViewRef] = useState([]);





    
    const filteredData = orderData.filter(
        (item) =>
            
            item.ord_date.toLowerCase().includes(search.toLowerCase()) ||
            item.total_amount.toString().includes(search.toLowerCase()) ||
            item.cust_name.toLowerCase().includes(search.toLowerCase()) ||
            item.delivery_date.toLowerCase().includes(search.toLowerCase()) 
    );

    const serv_id = localStorage.getItem('serv_id');

    const fetch_Data = async () => {
        try {
            const result = await fetchData('so_list_view', [
                { parameter: 'serv_id', value: serv_id }
            ], 'so_list_viewResponse', 'so_list_viewResult');

            if (result) {
                const Data = JSON.parse(result);
                setOrderData(Data);
                
            } else {
                setOrderData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
   
    
    useEffect(()=>{
        fetch_Data(serv_id)
    }, [])


    const fetch_Data_SalesOrder_view = async (serv_id, inv_ref) => {
        try {
            const result = await fetchData('so_view_ref', [
                { parameter: 'serv_id', value: serv_id },
                { parameter: 'refstr', value: inv_ref }
            ],
                'so_view_refResponse',
                'so_view_refResult');

            if (result) {
                const rawData = JSON.parse(result);
                localStorage.setItem('salesOrderViewRef',JSON.stringify(rawData) );
                
            } else {
                localStorage.setItem('salesOrderViewRef', []);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const selectivekeys = [ 'cust_name','ord_date', 'delivery_date','total_amount' ];
    const header = orderData.length > 0
    ? Object.keys(orderData[0])
        .filter((key) => selectivekeys.includes(key))  // Filter keys that exist in selectivekeys
        .sort((a, b) => selectivekeys.indexOf(a) - selectivekeys.indexOf(b))  // Sort based on the order in selectivekeys
    : [];

    
  




   
    const handleSalesOrderView = (inv_ref, total) => {
        fetch_Data_SalesOrder_view(serv_id, inv_ref);
        localStorage.setItem('total', JSON.stringify(total))
        
        

        const url = '/sale/sales_order/print'; // Replace with the desired URL
        window.open(url, '_blank', 'noopener,noreferrer');
    };


    return (
        <div id='SalesActivity' className="container-fluid mt-3 col-12 col-md-12 col-sm-12">
            <div className="row">
                <div className="col-12 col-md-12 mb-1">
                <span className="d-flex" style={{ marginLeft: "20px" }}>
                <b>Sales &nbsp; / &nbsp; Sale Order</b>
                </span>
                   
                    <div className="w-100 mb-1 mt-2">
                        <input
                            type="text"
                            placeholder='Search'
                            className="form-control mb-2"
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                borderRadius: '5px',
                                height: '35px',
                                width: '230px',
                                border: '1px solid lightgrey',
                            }}
                        />
                    </div>

                    <div className="col-md-12 mt-2" style={{ overflowY: 'auto', backgroundColor: 'rgb(232,233,233)', height: '67vh' }}>
                        <table className="table table-responsive">
                            <thead>
                                <tr style={{ backgroundColor: 'rgb(232,233,233)', borderBottom: '1px solid grey' }}>
                                    
                                    <th>Customer Name</th>
                                    <th>Order Date</th>
                                    <th>Delivery Date</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                               {orderData? 
                               (
                                filteredData && filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (
                                        <tr key={index} className='align-item-center'>
                                            <td>{item.cust_name}</td>
                                            <td>{new Date(item.ord_date).toLocaleDateString('en-GB')}</td>
                                            {/* Format delivery_date to dd-mm-yyyy */}
                                            <td>{new Date(item.delivery_date).toLocaleDateString('en-GB')}</td>
                                            <td>{item.total_amount}</td>
                                                <td className='d-flex gap-3'>
                                                   
    
                                                    <div className='tooltip-container'>
                                                        <button
                                                            className="btn btn-outline-danger btn-sm"
                                                        >
                                                            <FilePenLine size={'12px'} />
                                                        </button>
                                                        <div className="tooltip-text">Modify</div>
                                                    </div>
    
                                                    <div className='tooltip-container'>
                                                        <button
                                                            className="btn btn-outline-success btn-sm"
                                                            onClick={() => handleSalesOrderView(item.ref_doc_no, item.total_amount)} 
                                                        >
                                                            <Printer size={'16px'} />
                                                        </button>
                                                        <div className="tooltip-text">Print</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No data available</td>
                                        </tr>
                                    )
                               )
                               :
                               (
                                <Loader/>
                               )} 
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


           
        </div>
    );
}

export default SalesOrder;