import React, { useState, useEffect } from "react";
import JsBarcode from "jsbarcode";
import { CircleX, PrinterIcon, ScanBarcode } from "lucide-react";
import { motion } from 'framer-motion';
import { fetchData } from "../../utills/ApiRequest";
import Loader from "../../Loader/Loader"; // Ensure your Loader component is correctly imported

export default function InventoryRep() {
  const [inventory, setInventory] = useState([]); // Store inventory data
  const [searchTerm, setSearchTerm] = useState(""); // Search term for modal
  const [barcodes, setBarcodes] = useState([]); // Store generated barcodes
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [showSubModal, setShowSubModal] = useState(false); // Control SubModal visibility
  const [isLoading, setIsLoading] = useState(false); // Loader state for inventory data

  const handleShowBarcodeModel = () => setShowModal(true);
  const handleCloseBarcodeModel = () => {
    setShowModal(false);
    setBarcodes([]); // Clear barcodes when modal is closed
    setShowSubModal(false); // Ensure sub-modal is closed when main modal closes
  };

  const handleShowSubModal = () => {
    setShowSubModal(true);
  };

  const handleCloseSubModal = () => {
    setShowSubModal(false);
  };

  const serv_id = localStorage.getItem('serv_id')

  // Fetch inventory data via SOAP
  const fetchInventoryData = async () => {
    setIsLoading(true); // Start the loader
    if (!localStorage.getItem("inventory")) {
      try {
        const result = await fetchData('inventory_rep', [{ parameter: 'serv_id', value: serv_id }], 'inventory_repResponse', 'inventory_repResult');
        if (result) {
          const inventoryData = JSON.parse(result);
          localStorage.setItem("inventory", JSON.stringify(inventoryData)); // Save to localStorage
          setInventory(inventoryData);
        }
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    } else {
      const storedInventory = JSON.parse(localStorage.getItem("inventory"));
      setInventory(storedInventory);
    }
    setIsLoading(false); // Stop the loader once data is fetched
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  // Filter inventory for modal
  const filteredInventory = inventory.filter(
    (item) =>
      item.Item_desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.item_code.toString().includes(searchTerm) ||
      item.catagory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate barcodes
  const handleGenerateBarcodes = () => {
    const selectedItems = [];
    handleShowSubModal();

    // Collect checked items
    const tableRows = document.querySelectorAll(".modal-subdiv-3 .modal-subdiv-3-table .modal-subdiv-3-table-body .modal-subdiv-3-table-body-tr");
    tableRows.forEach((row) => {
        const checkbox = row.querySelector("input[type='checkbox']");
        const quantityInput = row.querySelector(".noOfBarCode");

        if (checkbox.checked) {
            const itemCode = row.cells[2].innerText; // Item Code
            const description = row.cells[3].innerText; // Description
            const category = row.cells[4].innerText; // Category
            const quantity = parseInt(quantityInput.value) || 0; // Quantity

            if (quantity > 0) {
                selectedItems.push({ itemCode, description, category, quantity });
            }
        }
    });

    // Generate barcodes
    const generatedBarcodes = [];
    selectedItems.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
            const canvas = document.createElement("canvas");
            JsBarcode(canvas, item.itemCode, {
                format: "CODE128",
                text: `${item.itemCode}`, // Display the item code as text below the barcode
                width: 1,
                height: 40,
            });
            const bar_code = canvas.toDataURL();
            const quantity= parseInt(item.quantity)
            
            // Push an object containing the barcode and its quantity
            generatedBarcodes.push({ barcode: bar_code, quantity: quantity });
        }
    });

    setBarcodes(generatedBarcodes); // Update state with generated barcodes
};

  // printing barcode
  const handlePrint = () => {
    const printContents = document.getElementById('barcode-print-section').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Barcodes</title>
          <style>
            /* Ensure page breaks after each barcode */
            @media print {
              div {
                page-break-after: always;
              }
              img {
                width: 100%; /* Optional: Adjust based on your need */
                height: auto;
              }
            }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="w-100">
      <div className="mt-2 pt-2 ps-2" style={{ minHeight: "40px", borderRadius: "10px" }}>
        <span className="d-flex" style={{ marginLeft: "20px" }}>
        <b>Reports </b> &nbsp;/ &nbsp;<b>Inventory </b>  &nbsp;/ &nbsp; <b> Inventory Report</b>
        </span>
      </div>

      {/* Barcode modal button */}
      <button
        style={{
          borderRadius: "10px",
          border: "1px solid lightgrey",
          padding: "5px",
          marginLeft: "30px",
        }}
        onClick={handleShowBarcodeModel}
      >
        <ScanBarcode /> Barcode
      </button>

      {/* Modal */}
      {showModal && (
        <motion.div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            padding: "10px",
            justifyContent: 'center'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="modal-main-div"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="modal-subdiv-1">
              <div className="tooltip-container">
                <button className="modal-subdiv-1-btn" onClick={handleGenerateBarcodes}>
                  <ScanBarcode />
                </button>
                <div className="tooltip-text">Generate BarCode</div>
              </div>
              <label>Generate Barcode</label>
              <div className="tooltip-container">
                <button className="modal-subdiv-1-btn" onClick={handleCloseBarcodeModel}>
                  <CircleX />
                </button>
                <div className="tooltip-text">Close</div>
              </div>
            </div>
            
            {/* Sub Modal */}
            {showSubModal && (
        <motion.div
          className="sub-modal"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '550px',
            maxWidth: '90%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            zIndex: 1,
            height: 'auto', // Adjust height for content
            overflowY: 'auto', // Scroll if content overflows
            justifyContent: 'center'

          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="modal-subdiv-1">
            <div className="tooltip-container">
        <button
          className="modal-subdiv-1-btn"
          onClick={() => handlePrint()} // Print function
        >
          <PrinterIcon />
        </button>
        <div className="tooltip-text">Print</div>
            </div>
            <div className="tooltip-container">
              <button className="modal-subdiv-1-btn" onClick={handleCloseSubModal}>
                <CircleX />
              </button>
              <div className="tooltip-text">Close</div>
            </div>
          </div>

          <div
            id="barcode-print-section" // Section to print
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '500px',
              height: '400px',
              padding: '10px',
              
            }}
          >
            {barcodes.map((item, index) => (
              <div
                key={index}
                style={{
                  margin: '5px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  pageBreakAfter: 'always', // Add a page break after each barcode
                }}
              >
                {Array.from({ length: item.quantity / item.quantity }).map((_, qtyIndex) => (
                  <img
                    key={`${index}-${qtyIndex}`}
                    src={item.barcode}
                    alt={`Barcode ${index}-${qtyIndex}`}
                    style={{
                      width: '100px',
                      height: 'auto',
                      margin: '5px',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
  </motion.div>
)}

            <div className="modal-subdiv-2 d-flex justify-content-center">
              <input
                className="p-1 ps-2"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="modal-subdiv-3">
              <table className="table mt-3 modal-subdiv-3-table">
                <thead>
                  <tr className="modal-table-thead-tr">
                    <th className="modal-table-thead-tr-th">
                      <input type="checkbox" />
                    </th>
                    <th className="modal-table-thead-tr-th">#</th>
                    <th className="modal-table-thead-tr-th">Item Code</th>
                    <th className="modal-table-thead-tr-th">Description</th>
                    <th className="modal-table-thead-tr-th">Category</th>
                    <th className="modal-table-thead-tr-th">No. of Barcodes</th>
                  </tr>
                </thead>
                <tbody className="modal-subdiv-3-table-body">
                 
                    {filteredInventory.map((item, index) => (
                      <tr className="modal-subdiv-3-table-body-tr" key={index}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{index + 1}</td>
                        <td>{item.item_code}</td>
                        <td>{item.Item_desc}</td>
                        <td>{item.catagory}</td>
                        <td>
                          <input className="noOfBarCode" type="number" min="0" />
                        </td>
                      </tr>
                    ))}
                  
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Table of products */}
       

        <div className="table-wrapper  d-flex"
        style={{
              maxHeight: '450px',
              overflowY: 'auto',
              overflowX: 'auto',
        }}
        >
          <table
            className="table mt-3"
            style={{
              backgroundColor: "#f2f2f2",
              margin: "30px",
              borderRadius: "10px",
              padding: "30px",
            }}
          >
            <thead>
              <tr className="modal-table-thead-tr">
                <th className="modal-table-thead-tr-th" scope="col">#</th>
                <th className="modal-table-thead-tr-th" scope="col">Item Code</th>
                <th className="modal-table-thead-tr-th" scope="col">Description</th>
                <th className="modal-table-thead-tr-th" scope="col">Category</th>
                <th className="modal-table-thead-tr-th" scope="col">Cost</th>
                <th className="modal-table-thead-tr-th" scope="col">Price</th>
                <th className="modal-table-thead-tr-th" scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
            {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    <Loader /> {/* Show the loader while fetching data */}
                  </td>
                </tr>
              ) : (
              inventory.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.item_code}</td>
                  <td>{item.Item_desc}</td>
                  <td>{item.catagory}</td>
                  <td>{item.cost}</td>
                  <td>{item.rate}</td>
                  <td>{item.cost + item.rate}</td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
     
    </div>
  );
}
