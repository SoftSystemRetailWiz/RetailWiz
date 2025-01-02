import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";  // Import the autoTable plugin
import { FaRegFilePdf } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import { fetchData } from "../utills/ApiRequest";
import { format, parseISO} from 'date-fns'
import Loader from "../Loader/Loader";

function CustomerList() {
    const [customer, setCustomer] = useState([]); // Store inventory data
    const [searchTerm, setSearchTerm] = useState(""); // Search term for modal
    const [isLoading , setIsLoading] = useState(false)
  
    const serv_id = localStorage.getItem('serv_id');
  
    const fetchCustomerData = async () => {
        setIsLoading(true)
        if (!localStorage.getItem("Customer")) {
            const result = await fetchData('customer_list', [{ parameter: 'serv_id', value: serv_id }], 'customer_listResponse', 'customer_listResult');
            if (result) {
                const customerData = JSON.parse(result);
                localStorage.setItem("Customer", JSON.stringify(customerData)); // Save to localStorage
                setCustomer(customerData);
            }
        } else {
            const storedCustomer = JSON.parse(localStorage.getItem("Customer"));
            setCustomer(storedCustomer);
        }
        setIsLoading(false)
    };
  
    useEffect(() => {

        fetchCustomerData();
    }, []);
  
    const filteredCustomer = customer.filter((item) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            item.item_code?.toString().includes(searchTerm) ||
            item.current_bal?.toString().includes(searchTerm) ||
            item.prv_bal?.toString().includes(searchTerm) ||
            item.cust_name?.toLowerCase().includes(searchLower) ||
            item.ph_no?.toString().includes(searchTerm) ||
            item.Last_pur_sal_date?.toLowerCase().includes(searchLower) ||
            item.Last_trans_date?.toLowerCase().includes(searchLower)
        );
    });

    const generatepdf = () => {
        const doc = new jsPDF();
        const table = document.getElementById('ListView-Customer');
        doc.autoTable({
            html: table,
            theme: 'striped',
            headStyles: { fillColor: [255, 0, 0] },
        });
        doc.save('Customer-List.pdf');
    };

    const generateCSV = () => {
        const headers = [
            'Index',
            'Item Code',
            'Customer Name',
            'Phone Number',
            'Last Purchase/Sale Date',
            'Last Transaction Date',
            'Previous Balance',
            'Current Balance'
        ];
        const rows = filteredCustomer.map((item, index) => [
            index + 1,
            item.item_code,
            item.cust_name,
            item.ph_no,
            item.Last_pur_sal_date,
            item.Last_trans_date,
            item.prv_bal,
            item.current_bal
        ]);

        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += headers.join(',') + '\n';
        rows.forEach((row) => {
            csvContent += row.join(',') + '\n';
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'Customer-List.csv');
        document.body.appendChild(link);
        link.click();
    };

    const handleDateFormat=(timestamp)=>{
        return format(parseISO(timestamp), 'dd-MM-yyyy')
    }

    return (
        <div className="mt-5 container-fluid mt-3 col-12 col-md-12 col-sm-12">
            <div className="row d-flex justify-content-between">
                <span className="d-flex" style={{ marginLeft: "20px" }}>
                    <b>List View &nbsp; / &nbsp; Customer List</b>
                </span>
                <div  className="ms-3 ">
                <input
                    className="p-1 ps-2 mt-1 "
                    style={{
                        borderRadius: '10px',
                        border: 'none'
                    }}
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                </div>
                <div className="d-flex pe-4 mt-4 ">
                    <button  className="tooltip-container"
                    style={{
                        borderRadius: "10px",
                        border: "1px solid lightgrey",
                        padding: "5px",
                        marginLeft: "30px",
                    }}
                    onClick={generatepdf}
                    >
                <FaRegFilePdf />
                <div className="tooltip-text">Generate-Pdf</div>

            </button>
            <button  className="tooltip-container"
            style={{
                borderRadius: "10px",
                border: "1px solid lightgrey",
                padding: "5px",
                marginLeft: "30px",
              }}
            onClick={generateCSV}
            >
                <BsFiletypeCsv />
                <div className="tooltip-text">Generate-CSV</div>

            </button>
                </div>
            </div>

            <div className="modal-subdiv-3">
                <table className="table mt-3" id="ListView-Customer">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer Name</th>
                            <th>Phone Number</th>
                            <th>Last Purchase/Sale Date</th>
                            <th>Last Transaction Date</th>
                            <th>Previous Balance</th>
                            <th>Current Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading? 
                        
                        (
                            <tr>
                                <td>
                                    <Loader/>
                                </td>
                            </tr>
                        )
                        :
                        (
                            filteredCustomer.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.cust_name? item.cust_name: '0'}</td>
                                    <td>{item.ph_no? item.ph_no: '0'}</td>
                                    <td>{item.Last_pur_sal_date? handleDateFormat(item.Last_pur_sal_date): ' '}</td>
                                    <td>{item.Last_trans_date? handleDateFormat(item.Last_trans_date): ' '}</td>
                                    <td>{item.prv_bal? item.prv_bal: '0'}</td>
                                    <td>{item.current_bal? item.current_bal: '0'}</td>
                                </tr>
                            ))
                        )
                        }
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
}

  

export default CustomerList