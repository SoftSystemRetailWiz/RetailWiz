import React from 'react'
import { CirclePlus, List, LucideSendHorizonal, Minus, Plus, PrinterIcon, SendHorizonal, SendHorizonalIcon, SquareCheck } from "lucide-react";

function EmployeeData() {
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
                 <div className="tooltip-text">Employee List</div>

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
             <div className="tooltip-text">Add Employee</div>
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
       {/* circle plus / add  */}
       <div
         className="tab-pane fade"
         id="profile"
         role="tabpanel"
         aria-labelledby="profile-tab"
       >
       <div className='mt-4'>
       <lable>
                <b
                style={{
                    padding : '10px',
                    borderBottom: '1px solid lightgrey',
                    borderRight:'1px solid lightgrey',
                    borderTop:'1px solid lightgrey',
                    borderRadius: '5px'
                }}
                >
                    Employee Data
                </b>
      </lable>
      <form className="mt-3">

        <div
            className="p-3 border rounded"
            style={{
                border: "1px solid lightgrey",
                borderRadius: "10px"
            }}
            >
            

            <div className="row g-3 mt-3">

            
            <div class="col-6  col-md-6 form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                style={{
                    border: 'none',
                    borderBottom: '1px solid lightgrey'
                 }}
                />
                <label for="floatingInput">Email address</label>
            </div>

           
            <div className="col-6 col-md-6 form-floating">  
               <input
                  id="floatingInput"
                  className="form-control"
                  type="text"
                  placeholder="XXXXX-XXXXXXX-X"
                  pattern="^\d{5}-\d{7}-\d{1}$"
                  required
                  style={{
                        border: 'none',
                        borderBottom: '1px solid lightgrey',
                  }}
               />
               <label htmlFor="floatingInput">
                  <h6>Biomatrix-Id</h6>
               </label>
            </div>


            <label className="form-label mt-5">
             
                    <b
                    style={{
                        padding : '10px',
                        borderBottom: '1px solid lightgrey',
                        borderRight:'1px solid lightgrey',
                        borderTop:'1px solid lightgrey',
                        borderRadius: '5px'
                    }}
                    >
                    Employee Information

                    </b>
            </label>
            <div className="col-md-4">
    <div className="form-floating">
        <input
            id="name"
            className="form-control"
            type="text"
            placeholder="Employee Name"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="name">Name</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="FatherName"
            className="form-control"
            type="text"
            placeholder="Employee Father Name"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="FatherName">Father Name</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="NICNumber"
            className="form-control"
            type="text"
            placeholder="NIC Number"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="NICNumber">NIC Number</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="DateOfBirth"
            className="form-control"
            type="date"
            placeholder="Date of Birth"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="DateOfBirth">Date Of Birth</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="PhoneNumber"
            className="form-control"
            type="text"
            placeholder="03XXXXXXXXX / 042XXXXXXXX"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="PhoneNumber">Phone Number</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="Email"
            className="form-control"
            type="email"
            placeholder="example@gmail.com"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="Email">Email</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <select
            id="Gender"
            name="Gender"
            required
            className="form-control"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        >
            <option value="" disabled>
                Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>
        <label htmlFor="Gender">Gender</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="Education"
            className="form-control"
            type="text"
            placeholder="(SSC)/(HSSC)/(HEC)"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="Education">Education</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="ReferanceNote"
            className="form-control"
            type="text"
            placeholder="Reference Notes"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="ReferanceNote">Reference Note</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="Guarantors"
            className="form-control"
            type="text"
            placeholder="Guarantors"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="Guarantors">Guarantors</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="Address"
            className="form-control"
            type="text"
            placeholder="Street #"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="Address">Address</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="LastEmployer"
            className="form-control"
            type="text"
            placeholder="Employer Name"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="LastEmployer">Last Employer</label>
    </div>
</div>


            <label className="form-label mt-5">
             
                    <b
                    style={{
                        padding : '10px',
                        borderBottom: '1px solid lightgrey',
                        borderRight:'1px solid lightgrey',
                        borderTop:'1px solid lightgrey',
                        borderRadius: '5px'
                    }}
                    >
                    Company Data

                    </b>
            </label>
           

            <div className="col-md-4">
    <div className="form-floating">
        <input
            id="Department"
            className="form-control"
            type="text"
            placeholder="Department"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="Department">Department</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="Location"
            className="form-control"
            type="text"
            placeholder="Location"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="Location">Location Id</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="Designation"
            className="form-control"
            type="text"
            placeholder="Designation"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="Designation">Designation</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="Group"
            className="form-control"
            type="text"
            placeholder="Group"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="Group">Group</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="JoingDate"
            className="form-control"
            type="date"
            placeholder="Joining Date"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="JoingDate">Joining Date</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="ProbitionPeriod"
            className="form-control"
            type="number"
            placeholder="Probation Period"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="ProbitionPeriod">Probation Period</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="Shift"
            className="form-control"
            type="text"
            placeholder="Shift"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="Shift">Shift</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="Status"
            className="form-control"
            type="text"
            placeholder="Status"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="Status">Status</label>
    </div>
</div>

<div className="col-md-4">
    <div className="form-floating">
        <input
            id="ResignDate"
            className="form-control"
            type="text"
            placeholder="Terminate/Resign Date"
            style={{
                border: 'none',
                borderBottom: '1px solid lightgrey',
            }}
        />
        <label htmlFor="ResignDate">Resign Date</label>
    </div>
</div>



            {/* submit*/}
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
    </div>


       </div>
       
     </div>
   </div>
   </>
  )
}

export default EmployeeData
