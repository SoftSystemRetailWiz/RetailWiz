import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";  // Import the autoTable plugin
import { FaRegFilePdf } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import { fetchData } from "../utills/ApiRequest";

function InventoryList() {
    const [inventory, setInventory] = useState([]); // Store inventory data
    const [searchTerm, setSearchTerm] = useState(""); // Search term for modal
  
    const serv_id = localStorage.getItem('serv_id');
  
    // Fetch inventory data via SOAP
    const fetchInventoryData = async () => {
      if (!localStorage.getItem("inventory")) {
        const result = await fetchData('inventory_rep', [{ parameter: 'serv_id', value: serv_id }], 'inventory_repResponse', 'inventory_repResult');
        if (result) {
          const inventoryData = JSON.parse(result);
          localStorage.setItem("inventory", JSON.stringify(inventoryData)); // Save to localStorage
          setInventory(inventoryData);
        }
      } else {
        const storedInventory = JSON.parse(localStorage.getItem("inventory"));
        setInventory(storedInventory);
      }
    };
  
    useEffect(() => {
      fetchInventoryData();
    }, []); // Empty dependency array to run once after initial render
  
    const filteredInventory = inventory.filter(
      (item) =>
        item.Item_desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.item_code.toString().includes(searchTerm) ||
        item.cost.toString().includes(searchTerm) ||
        item.rate.toString().includes(searchTerm) ||
        (item.rate+item.cost).toString().includes(searchTerm) ||
        item.catagory.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const generatepdf=()=>{
        const doc = new jsPDF();
        const table= document.getElementById('ListView-Inventory')

        doc.autoTable({
            html: table,
            theme: 'striped',
            headStyles: { fillColor: [0, 0, 0] },
            columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 50 } },
          });
        doc.save('Inventory-List.pdf')
    }

    const generateCSV=()=>{
        const headers= [
            'Index',
            'Item Code',
            'Description',
            'Category',
            'Cost',
            'Rate',
            'Total'
        ]
        const rows = filteredInventory.map((item, index)=>[
            index+1,
            item.item_code,
            item.Item_desc,
            item.catagory,
            item.cost,
            item.rate,
            item.cost +item.rate
        ])

        let csvContent= 'data:text/csv;charset=utf-8,';
        csvContent += headers.join(',')+ '\n';
        rows.forEach((row)=>{
            csvContent += row.join(',')+ '\n';
        })

        //  create a link to trigger the csv download

        const encodedUri = encodeURI(csvContent);
        const link= document.createElement('a')
        link.setAttribute('href', encodedUri)
        link.setAttribute('download', 'Inventory-List.csv')
        document.body.appendChild(link)
        link.click()
    }
  
    return (
      <div className="mt-5 container-fluid mt-3 col-12 col-md-12 col-sm-12">
        <div className="row d-flex justify-content-between">
        <span className="d-flex" style={{ marginLeft: "20px" }}>
          <b>List View &nbsp; / &nbsp; Inventory List</b>
        </span>
        <div className="ms-3 ">
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
          <div className="d-flex pe-4 mt-4">
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
          <table className="table mt-3 modal-subdiv-3-table " id="ListView-Inventory">
            <thead>
              <tr className="modal-table-thead-tr">
                <th className="modal-table-thead-tr-th">#</th>
                <th className="modal-table-thead-tr-th">Item Code</th>
                <th className="modal-table-thead-tr-th">Description</th>
                <th className="modal-table-thead-tr-th">Category</th>
                <th className="modal-table-thead-tr-th">Cost</th>
                <th className="modal-table-thead-tr-th">Rate</th>
                <th className="modal-table-thead-tr-th">Total</th>
              </tr>
            </thead>
            <tbody className="modal-subdiv-3-table-body">
              {filteredInventory.map((item, index) => (
                <tr className="modal-subdiv-3-table-body-tr" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.item_code}</td>
                  <td>{item.Item_desc}</td>
                  <td>{item.catagory}</td>
                  <td>{item.cost}</td>
                  <td>{item.rate}</td>
                  <td>{item.cost + item.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default InventoryList;
  