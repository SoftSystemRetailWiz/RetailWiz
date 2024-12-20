import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { CirclePlus, List, LucideSendHorizonal, Minus, Plus, PrinterIcon, SendHorizonal, SendHorizonalIcon, SquareCheck } from "lucide-react";

function PurchaseOrder() {
  return (
    <>
      <div className="container mt-2">
        {/* Nav Tabs */}
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              
            >
                <div className="tooltip-container">
                    <List/>
                    <div className="tooltip-text">PO's List</div>

                </div>
            </a>
          </li>
          <li className="nav-item ms-2" >
            <a
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
            >
              <div className="tooltip-container"
                style={{
                  zIndex: 1
                }}>
                <CirclePlus/>
                <div className="tooltip-text">Create PO's</div>
              </div>
              
            </a>
          </li>
         
        </ul>

        {/* Tab Content */}
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="mt-2"
            style={{
                width: '100%',
                // backgroundColor: 'red',
                height: '100%'
            }}
            >
                <div className="d-flex ">
                    <div className="d-flex">
                        <small className="mt-2 me-1">Start Date</small>
                        <input 
                        className="p-1 me-2 " 
                        type="date" 
                        style={{
                            borderRadius: '10px',
                            border: '1px solid lightgrey'
                        }}
                        />
                    </div>
                    <div className="d-flex">
                        <small className="mt-2 me-1">End Date</small>
                        <input 
                        className="p-1 me-2 " 
                        type="date" 
                        style={{
                            borderRadius: '10px',
                            border: '1px solid lightgrey'
                        }}
                        
                        />
                        
                    </div>

                    <div className="mt-1 ms-2 tooltip-container"
                    style={{
                        backgroundColor: 'none'
                    }}
                    >
                    
                        <LucideSendHorizonal/>
                        <div className="tooltip-text">send</div>
                    </div>
                </div>
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
                <th className="modal-table-thead-tr-th" scope="col">PO-no</th>
                <th className="modal-table-thead-tr-th" scope="col">PO-Date</th>
                <th className="modal-table-thead-tr-th" scope="col">Total Amount</th>
                <th className="modal-table-thead-tr-th" scope="col">Vendor Name</th>
                <th className="modal-table-thead-tr-th" scope="col">PO-Referance</th>
                <th className="modal-table-thead-tr-th" scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td scope="col">#</td>
                <td scope="col">PO-no</td>
                <td scope="col">PO-Date</td>
                <td scope="col">Total Amount</td>
                <td scope="col">Vendor Name</td>
                <td scope="col">PO-Referance</td>
                <td scope="col">Status</td>
              </tr>
              
            <tr>
                <td scope="col">#</td>
                <td scope="col">PO-no</td>
                <td scope="col">PO-Date</td>
                <td scope="col">Total Amount</td>
                <td scope="col">Vendor Name</td>
                <td scope="col">PO-Referance</td>
                <td scope="col">Status</td>
              </tr>
              
            <tr>
                <td scope="col">#</td>
                <td scope="col">PO-no</td>
                <td scope="col">PO-Date</td>
                <td scope="col">Total Amount</td>
                <td scope="col">Vendor Name</td>
                <td scope="col">PO-Referance</td>
                <td scope="col">Status</td>
              </tr>
              
            <tr>
                <td scope="col">#</td>
                <td scope="col">PO-no</td>
                <td scope="col">PO-Date</td>
                <td scope="col">Total Amount</td>
                <td scope="col">Vendor Name</td>
                <td scope="col">PO-Referance</td>
                <td scope="col">Status</td>
              </tr>
              
            <tr>
                <td scope="col">#</td>
                <td scope="col">PO-no</td>
                <td scope="col">PO-Date</td>
                <td scope="col">Total Amount</td>
                <td scope="col">Vendor Name</td>
                <td scope="col">PO-Referance</td>
                <td scope="col">Status</td>
              </tr>
              
            </tbody>
          </table>
        </div>

            </div>
          </div>

          {/* page -2 */}
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
           <div className="d-flex mt-2 justify-content-between">
            <div></div>
            <div>
                <div className="tooltip-container ms-1"
                >
                  <PrinterIcon/>
                  <div className="tooltip-text">print</div>
                </div>
                <div className="tooltip-container ms-3">
                    <SquareCheck/>
                    <div className="tooltip-text">Approved</div>
                </div>
            </div>
           </div>

        <form className="mt-3">
        <div
            className="p-3 border rounded"
            style={{
            border: "1px solid lightgrey",
            borderRadius: "10px",
            }}
        >
            <div className="row g-3">
            {/* Po-No */}
            <div className="col-md-4">
                <label htmlFor="poNo" className="form-label small">
                Po-No
                </label>
                <input
                id="poNo"
                className="form-control"
                type="number"
                placeholder="Enter Po-No"
                style={{
                    borderRadius: "10px",
                }}
                />
            </div>

            {/* Po-Reference No */}
            <div className="col-md-4">
                <label htmlFor="poRefNo" className="form-label small">
                Po-Reference No
                </label>
                <input
                id="poRefNo"
                className="form-control"
                type="text"
                placeholder="Enter Po-Reference No"
                style={{
                    borderRadius: "10px",
                }}
                />
            </div>

            {/* Ref-Doc-No */}
            <div className="col-md-4">
                <label htmlFor="refDocNo" className="form-label small">
                Ref-Doc-No
                </label>
                <input
                id="refDocNo"
                className="form-control"
                type="text"
                placeholder="Enter Ref-Doc-No"
                style={{
                    borderRadius: "10px",
                }}
                />
            </div>

            
            {/* Vendor-Project*/}
            <div className="col-md-4">
                <label htmlFor="VendorProject" className="form-label small">
                Vendor Project
                </label>
                <input
                id="refDocNo"
                className="form-control"
                type="text"
                placeholder="Enter Vendor-Project"
                style={{
                    borderRadius: "10px",
                }}
                />
            </div>

            {/* Delivery-Date */}
            <div className="col-md-4">
                <label htmlFor="refDocNo" className="form-label small">
                Delivery-Date
                </label>
                <input
                id="refDocNo"
                className="form-control"
                type="date"
                placeholder="Enter Delivery-Date"
                style={{
                    borderRadius: "10px",
                }}
                />
            </div>

            {/* Order-Date */}
            <div className="col-md-4">
                <label htmlFor="refDocNo" className="form-label small">
                Order-Date
                </label>
                <input
                id="refDocNo"
                className="form-control"
                type="date"
                placeholder="Enter Order-Date"
                style={{
                    borderRadius: "10px",
                }}
                />
            </div>

            {/* PO-Status*/}
            <div className="col-md-4">
                <label htmlFor="refDocNo" className="form-label small">
                PO-Status
                </label>
                <input
                id="refDocNo"
                className="form-control"
                type="text"
                placeholder="Enter PO-Status"
                style={{
                    borderRadius: "10px",
                }}
                />
            </div>

            {/* Delivery-Date */}
            <div className="col-md-4">
                <button
                className="btn btn-primary "
                style={{
                    marginTop: '30px'
                }}
                >Save</button>
            </div>


            </div>


        </div>
        </form>
        <div  className="d-flex justify-content-between"
        style={{
          width: '70px',
          padding: '5px',

        }}
        >
          <div className="tooltip-container"
                style={{
                  zIndex: 1
                }}>
                <Plus/>
                <div className="tooltip-text">Add</div>
          </div>
          <div className="tooltip-container"
            style={{
              zIndex: 1
            }}>
            <Minus/>
            <div className="tooltip-text">Remove</div>
          </div>
        </div>
        <div className="table-wrapper  d-flex mt-2"
        style={{
              maxHeight: '450px',
              overflowY: 'auto',
              overflowX: 'auto',
              border: '1px solid lightgrey',
              borderRadius: '10px'
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
                <th className="modal-table-thead-tr-th" scope="col">S.No</th>
                <th className="modal-table-thead-tr-th" scope="col">Code</th>
                <th className="modal-table-thead-tr-th" scope="col">Product</th>
                <th className="modal-table-thead-tr-th" scope="col">UOM</th>
                <th className="modal-table-thead-tr-th" scope="col">Qty</th>
                <th className="modal-table-thead-tr-th" scope="col">Rate</th>
                <th className="modal-table-thead-tr-th" scope="col">Value Ex. S.Tax</th>
                <th className="modal-table-thead-tr-th" scope="col">GST</th>
                <th className="modal-table-thead-tr-th" scope="col">GST Amount</th>
                <th className="modal-table-thead-tr-th" scope="col">Incl. S.Tax</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td scope="col">S.No</td>
                <td scope="col">Code</td>
                <td scope="col">Product</td>
                <td scope="col">UOM</td>
                <td scope="col">Qty</td>
                <td scope="col">Rate</td>
                <td scope="col">Value Ex. S.Tax</td>
                <td scope="col">GST</td>
                <td scope="col">GST Amount</td>
                <td scope="col">Incl. S.Tax</td>
              </tr>
              
            <tr>
                <td scope="col">S.No</td>
                <td scope="col">Code</td>
                <td scope="col">Product</td>
                <td scope="col">UOM</td>
                <td scope="col">Qty</td>
                <td scope="col">Rate</td>
                <td scope="col">Value Ex. S.Tax</td>
                <td scope="col">GST</td>
                <td scope="col">GST Amount</td>
                <td scope="col">Incl. S.Tax</td>
              </tr>
              
            <tr>
                <td scope="col">S.No</td>
                <td scope="col">Code</td>
                <td scope="col">Product</td>
                <td scope="col">UOM</td>
                <td scope="col">Qty</td>
                <td scope="col">Rate</td>
                <td scope="col">Value Ex. S.Tax</td>
                <td scope="col">GST</td>
                <td scope="col">GST Amount</td>
                <td scope="col">Incl. S.Tax</td>
              </tr>
              
            <tr>
                <td scope="col">S.No</td>
                <td scope="col">Code</td>
                <td scope="col">Product</td>
                <td scope="col">UOM</td>
                <td scope="col">Qty</td>
                <td scope="col">Rate</td>
                <td scope="col">Value Ex. S.Tax</td>
                <td scope="col">GST</td>
                <td scope="col">GST Amount</td>
                <td scope="col">Incl. S.Tax</td>
              </tr>
              
            <tr>
                <td scope="col">S.No</td>
                <td scope="col">Code</td>
                <td scope="col">Product</td>
                <td scope="col">UOM</td>
                <td scope="col">Qty</td>
                <td scope="col">Rate</td>
                <td scope="col">Value Ex. S.Tax</td>
                <td scope="col">GST</td>
                <td scope="col">GST Amount</td>
                <td scope="col">Incl. S.Tax</td>
              </tr>
              
            <tr>
                <td scope="col">S.No</td>
                <td scope="col">Code</td>
                <td scope="col">Product</td>
                <td scope="col">UOM</td>
                <td scope="col">Qty</td>
                <td scope="col">Rate</td>
                <td scope="col">Value Ex. S.Tax</td>
                <td scope="col">GST</td>
                <td scope="col">GST Amount</td>
                <td scope="col">Incl. S.Tax</td>
              </tr>
              
            </tbody>
          </table>
        </div>


          </div>
          
        </div>
      </div>
    </>
  );
}

export default PurchaseOrder;
