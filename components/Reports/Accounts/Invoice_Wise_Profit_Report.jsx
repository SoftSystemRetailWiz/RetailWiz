import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { fetchData } from '../../utills/ApiRequest';
import { use } from 'framer-motion/m';
import Loader from '../../Loader/Loader';

function  InvoiceWiseProfit() {
    const [activityData, setActivityData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [search, setSearch] = useState('');

    const [total, setTotal]= useState()

    const [isLoading, setIsLoading]= useState(false)

    const handleTotal=()=>{
        let total= 0

        activityData.forEach(item => {
            let data= parseFloat(item.t_value)
            total += data

        });
        setTotal(total)
    }
   

    useEffect(()=>{
        handleTotal()
    })

   


    

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    };

    const filteredData = activityData.filter(
        (item) =>
            item.qty.toString().includes(search.toLowerCase()) ||
            item.inv_no.toString().includes(search.toLowerCase()) ||
            item.t_value.toString().includes(search.toLowerCase()) ||
            item.t_sale_value.toString().includes(search.toLowerCase()) ||
            item.dt_date.toLowerCase().includes(search.toLowerCase()) ||
            item.item_desc.toLowerCase().includes(search.toLowerCase())
    );

    const serv_id = localStorage.getItem('serv_id');

    const fetch_Data = async (st_date, ed_date) => {
        setIsLoading(true)
        try {
            const result = await fetchData('profit_inv_get', [
                { parameter: 'serv_id', value: serv_id },
                { parameter: 'st_date', value: st_date },
                { parameter: 'ed_date', value: ed_date }
            ], 'profit_inv_getResponse', 'profit_inv_getResult');

            if (result) {
                const Data = JSON.parse(result);
                console.log('main data',Data)
                setActivityData(Data);
            } else {
                setActivityData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setIsLoading(false)
    };

   
  


  

    return (
        <div id='SalesActivity' className="container-fluid mt-3 col-12 col-md-12 col-sm-12">
            <div className="row">
                <div className="col-12 col-md-12 mb-1">
                <span className="d-flex" style={{ marginLeft: "20px" }}>
                <b>Reports &nbsp; / &nbsp;Account &nbsp; / &nbsp; Invoice Wise Profit Report</b>
                </span>
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
                            <div className="tooltip-text">Generate</div>
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
                    <div>
                        <span><b>Total Profit: </b>{total}</span>
                    </div>

                    <div className="col-md-12 mt-2" style={{ overflowY: 'auto', backgroundColor: 'rgb(232,233,233)', height: '67vh' }}>
                        <table className="table table-responsive">
                            <thead>
                                <tr style={{ backgroundColor: 'rgb(232,233,233)', borderBottom: '1px solid grey' }}>
                                    <th>Invoice No</th>
                                    <th>Date</th>
                                    <th>Descritpion</th>
                                    <th>Qty</th>
                                    <th>Cost</th>
                                    <th> Sale</th>
                                    <th>Profit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading?
                                
                                (
                                    <tr colspan='6'>
                                        <td>
                                            <Loader/>

                                        </td>
                                    </tr>
                                )
                                :
                                (
                                filteredData && filteredData.length>0 ?
                              (
                                filteredData.map((item, index)=>(
                                  <tr key={index}>
                                    <td>{item.inv_no}</td>
                                    <td>{new Date(item.dt_date).toLocaleDateString('en-GB')}</td>
                                    <td>{item.item_desc}</td>
                                    <td>{ item.qty}</td>
                                    <td>{ item.cogs_value}</td>
                                    <td>{item.t_sale_value}</td>
                                    <td>{item.t_value}</td>
                                    
                                </tr>
                                  
                                
                                ))
                            )
                              :
                              (
                                <tr>
                                  <td>No Data Found</td>
                                </tr>
                              )
                                )
                            }
                              
                              
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


           
        </div>
    );
}

export default  InvoiceWiseProfit;