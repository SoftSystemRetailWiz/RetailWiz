import React, { useState } from 'react';
import { FilePenLine, Printer, Send } from 'lucide-react';
import { fetchData } from '../../utills/ApiRequest';

function Activity() {
    const [activityData, setActivityData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [search, setSearch] = useState('');
    const [invoiceViewRef, setInvoiceViewRef] = useState([]);
    

   


    

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    };

    const filteredData = activityData.filter(
        (item) =>
            item.total_amt.toString().includes(search.toLowerCase()) ||
            item.inv_date.toLowerCase().includes(search.toLowerCase()) ||
            item.inv_ref.toLowerCase().includes(search.toLowerCase())
    );

    const serv_id = localStorage.getItem('serv_id');

    const fetch_Data = async (st_date, ed_date) => {
        try {
            const result = await fetchData('inv_rep', [
                { parameter: 'serv_id', value: serv_id },
                { parameter: 'st_date', value: st_date },
                { parameter: 'ed_date', value: ed_date }
            ], 'inv_repResponse', 'inv_repResult');

            if (result) {
                const Data = JSON.parse(result);
                setActivityData(Data);
                console.log('Fetched Data:', Data);
            } else {
                setActivityData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetch_Data_Invoise_view = async (serv_id, inv_ref) => {
        try {
            const result = await fetchData('invoice_view_ref', [
                { parameter: 'serv_id', value: serv_id },
                { parameter: 'refstr', value: inv_ref }
            ],
                'invoice_view_refResponse',
                'invoice_view_refResult');

            if (result) {
                const Data = JSON.parse(result);
                localStorage.setItem('invoiceViewRef', JSON.stringify(Data));
                console.log('Fetched Data:', Data);
            } else {
                localStorage.setItem('invoiceViewRef', []);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const selectivekeys = ['discount', 'rate', 'qty', 'item_desc_invoice'];
    const modlebody = invoiceViewRef.length > 0 ? Object.keys(invoiceViewRef[0]).filter((key) => selectivekeys.includes(key)).reverse() : [];

  




    const headerData = invoiceViewRef.length > 0 ? invoiceViewRef[0] : [];
    console.log('headerData:', headerData);

    const handleInvoiceView = (inv_ref,total) => {
        fetch_Data_Invoise_view(serv_id, inv_ref);
        
        localStorage.setItem('total',JSON.stringify(total));

        const url = '/sale/salesActivity/print'; // Replace with the desired URL
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const openModal = () => {
        setModalOpen(true);
    };


    return (
        <div id='SalesActivity' className="container-fluid mt-3 col-12 col-md-12 col-sm-12">
            <div className="row">
                <div className="col-12 col-md-12 mb-1">
                    <div className="d-flex gap-2 flex-column flex-md-row">
                        <div className='d-flex gap-2'>
                            <label htmlFor="startDate" className="d-flex" style={{ width: '120px', alignItems: 'center', height: '60px' }}>Start Date:</label>
                            <input
                                id='startDate'
                                className="form-control w-100"
                                type="date"
                                onChange={handleStartDate}
                                style={{ height: '60px', border: 'none' }}
                            />
                        </div>

                        <div className='d-flex gap-2'>
                            <label htmlFor="endDate" className="d-flex" style={{ width: '120px', alignItems: 'center', height: '60px' }}>End Date:</label>
                            <input
                                id='endDate'
                                className="form-control w-100"
                                type="date"
                                onChange={handleEndDate}
                                style={{ height: '60px', border: 'none' }}
                            />
                        </div>

                        <div className="tooltip-container">
                            <button
                                className="btn btn-primary btn-sm mt-3 modal-subdiv-1-btn"
                                style={{ maxHeight: '35px', width: '35px' }}
                                onClick={() => fetch_Data(startDate, endDate)}
                            >
                                <Send size={'16px'} />
                            </button>
                            <div className="tooltip-text">Send</div>
                        </div>
                    </div>

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
                                    <th>Invoice Reference</th>
                                    <th>Date</th>
                                    <th>Total Amount</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData && filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.inv_ref}</td>
                                            <td>{item.inv_date}</td>
                                            <td>{item.total_amt}</td>
                                            <td className='d-flex gap-3'>
                                                <div className='tooltip-container'>
                                                    <button
                                                        className="btn btn-outline-primary btn-sm"
                                                    >
                                                        <small>DO</small>
                                                    </button>
                                                    <div className="tooltip-text">DO</div>
                                                </div>

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
                                                        onClick={() => handleInvoiceView(item.inv_ref, item.total_amt)} 
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
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


           
        </div>
    );
}

export default Activity;