
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";  // Import the autoTable plugin
import { FaRegFilePdf } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import { fetchData } from "../utills/ApiRequest";


function SupplierList() {
    const [Supplier, setSupplier] = useState([]); // Store inventory data
    const [searchTerm, setSearchTerm] = useState(""); // Search term for modal
  
    const serv_id = localStorage.getItem('serv_id');
  
    const fetchSupplierData = async () => {
        const storedSupplier = localStorage.getItem("Supplier");
    
        if (!storedSupplier) {
            const result = await fetchData(
                'supplier_list',
                [{ parameter: 'serv_id', value: serv_id }],
                'supplier_listResponse',
                'supplier_listResult'
            );
    
            if (result) {
                try {
                    const supplierData = JSON.parse(result);
                    localStorage.setItem("Supplier", JSON.stringify(supplierData)); // Save to localStorage
                    setSupplier(supplierData);
                } catch (error) {
                    console.error("Failed to parse supplier data:", error);
                    setSupplier([]); // Ensure state is an array
                }
            } else {
                console.error("Failed to fetch supplier data.");
                setSupplier([]); // Ensure state is an array
            }
        } else {
            try {
                const parsedSupplier = JSON.parse(storedSupplier);
                setSupplier(parsedSupplier);
            } catch (error) {
                console.error("Failed to parse stored supplier data:", error);
                setSupplier([]); // Ensure state is an array
            }
        }
    };
    
    const handleDateFormat=(timestamp)=>{
        return format(parseISO(timestamp), 'dd-MM-yyyy')
    }

  
    useEffect(() => {
        fetchSupplierData();
    }, []);
  
    const filteredSupplier = Supplier.filter((item) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            item.cust_name?.toLowerCase().includes(searchLower) ||
            item.cust_code?.toString().includes(searchTerm) ||
            item.cust_bal?.toString().includes(searchTerm) ||
            item.ph_no?.toString().includes(searchTerm) ||
            item.Last_pur_sal_date?.toLowerCase().includes(searchLower) ||
            item.Last_trans_date?.toLowerCase().includes(searchLower)
        );
    });

    const generatepdf = () => {
        const doc = new jsPDF();
        const table = document.getElementById('ListView-Supplier');
        doc.autoTable({
            html: table,
            theme: 'striped',
            headStyles: { fillColor: [255, 0, 0] },
        });
        doc.save('Supplier-List.pdf');
    };

    const generateCSV = () => {
        const headers = [
            'Index',
            'Customer Name',
            'Customer Code',
            'Customer Bal',
            'Phone Number',
            'Last Purchase/Sale Date',
            'Last Transaction Date',
            'Active/Deactive',
        ];
        const rows = filteredSupplier.map((item, index) => [
            index + 1,
            item.cust_name,
            item.cust_code,
            item.cust_bal,
            item.ph_no,
            item.Last_pur_sal_date,
            item.Last_trans_date,
            item.active
        ]);

        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += headers.join(',') + '\n';
        rows.forEach((row) => {
            csvContent += row.join(',') + '\n';
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'Supplier-List.csv');
        document.body.appendChild(link);
        link.click();



    };

    return (
        <div className="mt-5">
            <div className="modal-subdiv-2 d-flex justify-content-between">
                <span className="d-flex" style={{ marginLeft: "20px" }}>
                    <b>List View &nbsp; / &nbsp; Suppliers List</b>
                </span>
                <input
                    className="p-1 ps-2"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="d-flex pe-4 ">
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
                <table className="table mt-3" id="ListView-Supplier">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer Name</th>
                            <th>Customer Code</th>
                            <th>Customer Bal</th>
                            <th>Phone Number</th>
                            <th>Last Purchase/Sale Date</th>
                            <th>Last Transaction Date</th>
                            <th>Active/Deactive</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSupplier.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.cust_name? item.cust_name: '0'}</td>
                                <td>{item.cust_code? item.cust_code: '0'}</td>
                                <td>{item.cust_bal? item.cust_bal: '0'}</td>
                                <td>{item.ph_no? item.ph_no: '0'}</td>
                                <td>{item.Last_pur_sal_date? handleDateFormat(item.Last_pur_sal_date): ' '}</td>
                                <td>{item.Last_trans_date? handleDateFormat(item.Last_trans_date): ' '}</td>
                                <td>{item.active? 'Active': 'In-Active'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default SupplierList