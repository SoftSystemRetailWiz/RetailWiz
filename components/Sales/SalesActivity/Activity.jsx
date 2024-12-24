import React, { useState } from 'react';
import {CircleX, FilePenLine, Printer, Send } from 'lucide-react';
import { fetchData } from '../../utills/ApiRequest';

function Activity() {
    const [activityData, setActivityData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [search, setsearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);  // State to manage modal visibility

    const [inv_ref, setInvRef] = useState('');
    const [printDisplay, setPrintDisplay] = useState(true);

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

    const openModal = () => {
        setModalOpen(true);  // Open the modal
    };

    const closeModal = () => {
        setModalOpen(false);  // Close the modal
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

                        <div className='tooltip-container'>
                            <button
                                className="btn btn-primary btn-sm mt-3 modal-subdiv-1-btn"
                                style={{ maxHeight: '35px', width: '35px' }}
                                onClick={() => fetch_Data(startDate, endDate)}
                            >
                                <Send size={'16px'} />
                            </button>
                            <div className="tooltip-text">send</div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div style={{ width: '300px' }}>
                        <input
                            type="text"
                            placeholder='Search'
                            className="form-control w-100 mb-2 mb-md-1 "
                            onChange={(e) => setsearch(e.target.value)}
                            style={{
                                borderRadius: '5px',
                                height: '35px',
                                width: '200px',
                                border: '1px solid lightgrey',
                            }}
                        />
                    </div>

                    {/* Table */}
                    <div
                        className="col-md-12 mt-2"
                        style={{ overflowY: 'auto', backgroundColor: 'rgb(232,233,233)', height: '67vh' }}
                    >
                        <table className="table">
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
                                                        className="btn btn-outline-primary btn-sm mt-3 mb-2"
                                                        style={{ maxHeight: '35px', width: '35px' }}
                                                         // Open Modal on click
                                                    >
                                                        DO
                                                    </button>
                                                    <div className="tooltip-text">Do</div>
                                                </div>

                                                <div className='tooltip-container'>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm mt-3 mb-2"
                                                        style={{ maxHeight: '35px', width: '35px' }}
                                                    >
                                                        <FilePenLine size={'16px'} />
                                                    </button>
                                                    <div className="tooltip-text">Modify</div>
                                                </div>

                                                <div className='tooltip-container'>
                                                    <button
                                                        className="btn btn-outline-success btn-sm mt-3 mb-2"
                                                        style={{ maxHeight: '35px', width: '35px' }}
                                                        onClick={openModal} 
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
                                        <td colSpan="5">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="modal" 
                style={{ 
                    display: 'block', 
                    position: 'fixed', 
                    top: '0', 
                    left: '0', 
                    right: '0', 
                    bottom: '0', 
                    background: 'rgba(0,0,0,0.5)' 
                    }}>
                    <div className="modal-content" 
                    style={{ 
                        background: 'white', 
                        padding: '20px', 
                        maxWidth: '900px', 
                        margin: 'auto', 
                        marginTop: '100px' 
                        }}>
                    <div className='tooltip-container'
                    style={{
                        width: '30px',
                    }}
                    >
                    <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={closeModal}  // Close the modal
                            style={{
                                border: 'none',
                                
                            }}
                        >
                            <CircleX className='' size={'20px'}/>
                        </button>
                        <div className="tooltip-text">Close</div>
                    </div>
                        <h4>Modal Title</h4>
                        <p>Content goes here...</p>
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default Activity;
