import React, { useState } from 'react';
import { FilePenLine, Printer, Send } from 'lucide-react';
import { fetchData } from '../../utills/ApiRequest';

function Activity() {
    const [activityData, setActivityData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [search, setsearch] = useState('');

    const [inv_ref, setInvRef] = useState('');
    const [printDisplay, setPrintDisplay]= useState(true)

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
        )
    const serv_id = localStorage.getItem('serv_id');

    const fetch_Data = async (st_date, ed_date) => {
        try {
            const result = await fetchData('inv_rep', [
                { parameter: 'serv_id', value: serv_id },
                { parameter: 'st_date', value: st_date },
                { parameter: 'ed_date', value: ed_date }
            ], 'inv_repResponse', 'inv_repResult');

            // Check if the result is valid and parse it correctly
            if (result) {
                const Data = JSON.parse(result);  // Assuming the result is a JSON string
                setActivityData(Data);            // Update state with the fetched data
                console.log('Fetched Data:', Data); // Log data to verify
            } else {
                setActivityData([]); // Set to an empty array if no data is returned
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="container-fluid mt-3">
            
            <div className="row">
                <div className="col-12 col-md-12 mb-1">
                    <div className="d-flex gap-2 flex-column flex-md-row">
                       
                      
                        <div className='d-flex gap-2'>
                            <label className='d-flex' htmlFor="startDate" style={{ width: '120px', alignItems: 'center', height: '60px' }}>Start Date:</label>
                            <input
                                id='startDate'
                                className="form-control"
                                type="date"
                                onChange={(e) => handleStartDate(e)}
                                style={{ height: '60px', border: 'none' }}
                            />
                        </div>

                        {/* End Date Picker */}
                        <div className='d-flex gap-2'>
                            <label className='d-flex' htmlFor="endDate" style={{ width: '120px', alignItems: 'center', height: '60px' }}>End Date:</label>
                            <input
                                id='endDate'
                                className="form-control"
                                type="date"
                                onChange={(e) => handleEndDate(e)}
                                style={{ height: '60px', border: 'none' }}
                            />
                        </div>

                        {/* Button to trigger data fetch */}
                        <button
                            className="btn btn-primary btn-sm mt-3"
                            style={{ maxHeight: '35px', width: '35px' }}
                            onClick={() => fetch_Data(startDate, endDate)}
                        >
                            <Send size={'16px'} />
                        </button>
                    </div>

                    {/* Render the table if data is available */}
                    <div style={{ position: 'relative' }}>
                        <div style={{width: '300px'}}>
                            <input 
                            type="text" 
                            placeholder='Search'
                            className="form-control w-100 mb-2 mb-md-0 "
                            onChange={(e)=> setsearch(e.target.value)}
                            style={{
                                borderRadius: '5px',
                                height: '35px',
                                width: '200px',
                                border: '1px solid lightgrey',
                            }}
                            />
                        </div>
                        <div
                            className="col-md-12 mt-1"
                            style={{ overflowY: 'auto', backgroundColor: 'rgb(232,233,233)', height: '67vh' }}
                        >
                            <table className="table">
                                <thead>
                                    <tr style={{ backgroundColor: 'rgb(232,233,233)', borderBottom: '1px solid grey' }}>
                                        <th>Invoice Referance</th>
                                        <th>Date</th>
                                        <th>Total Amount</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Map through activityData to populate rows */}
                                    {filteredData && filteredData.length > 0 ? (
                                        filteredData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.inv_ref}</td>
                                                <td>{item.inv_date}</td>
                                                <td>{item.total_amt}</td>
                                                <td className='d-flex gap-3'
                                                style={{
                                                    padding: '0px',
                                                }}
                                                >
                                                    
                                                    <button
                                                        className="btn btn-outline-primary btn-sm mt-3 mb-2"
                                                        style={{ maxHeight: '35px', width: '35px' }}
                                                    >
                                                        DO
                                                    </button>


                                                    <button
                                                        className="btn btn-outline-danger btn-sm mt-3 mb-2"
                                                        style={{ maxHeight: '35px', width: '35px' }}
                                                    >
                                                        <FilePenLine size={'16px'} />
                                                    </button>


                                                    <button
                                                        className="btn btn-outline-success btn-sm mt-3 mb-2"
                                                        style={{ maxHeight: '35px', width: '35px' }}
                                                    >
                                                        <Printer size={'16px'}/>
                                                    </button>


                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Activity;
