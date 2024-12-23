import { CircleX, Search, UserPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../utills/ApiRequest';

function Invoice() {
    const [inventory, setInventory] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [searchView, setSearchView] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [customerListView, setCustomerListView]= useState(false)
    const [searchIn, setSearchIn] = useState('');
    const [searchCustomer, setSearchCustomer] = useState('');
    const [searchOut, setSearchOut] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [customerName, setCustomerName] = useState('');

    const [showDropup, setShowDropUp]=useState(false)

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleSearchView = () => setSearchView(!searchView);
    const handleCustomerListView= ()=> setCustomerListView(!customerListView)
    const toggleDropup= () => setShowDropUp(true)
    const handleCloseDropUp=()=> setShowDropUp(false)
                            
    const serv_id = localStorage.getItem('serv_id');
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


     const fetchCustomerData = async () => {
            if (!localStorage.getItem("Customer")) {
                const result = await fetchData(
                    'customer_list', 
                    [{ parameter: 'serv_id', value: serv_id }], 
                    'customer_listResponse', 
                    'customer_listResult');
                if (result) {
                    const customerData = JSON.parse(result);
                    localStorage.setItem("Customer", JSON.stringify(customerData)); // Save to localStorage
                    setCustomer(customerData);
                }
            } else {
                const storedCustomer = JSON.parse(localStorage.getItem("Customer"));
                setCustomer(storedCustomer);
            }
        };

        useEffect(() => {
            fetchCustomerData();
        }, []);
        
        useEffect(() => {
            fetchInventoryData();
        }, []);
    useEffect(() => {
        let qty = 0;
        let discount = 0;
        let amount = 0;

        selectedItems.forEach((item) => {
            qty += parseInt(item.qty);
            discount += parseInt(item.discount);
            amount += (item.qty * item.rate) - item.discount;
        });

        setTotalQuantity(qty);
        setTotalDiscount(discount);
        setTotalAmount(amount);
    }, [selectedItems]);

     // Sync searchIn with searchOut
    useEffect(() => {
        setSearchIn(searchOut);
    }, [searchOut]);


    const filteredInventoryData = inventory.filter(
        (item) =>
            item.item_code.toString().includes(searchIn.toLowerCase()) ||
            item.Item_desc.toLowerCase().includes(searchIn.toLowerCase()) ||
            item.catagory.toLowerCase().includes(searchIn.toLowerCase()) ||
            item.rate.toString().toLowerCase().includes(searchIn.toLowerCase())
    );

    const filteredCustomerData = customer.filter(
        (item) =>
            item.cust_name.toLowerCase().includes(searchCustomer.toLowerCase())
           
    );

    const handleOuterSearch = (e) => {
        if (e?.key === 'Enter') {
            const foundItem = inventory.find(
                (item) =>
                    item.item_code.toString().includes(searchOut.toLowerCase()) ||
                    item.Item_desc.toLowerCase().includes(searchOut.toLowerCase()) ||
                    item.catagory.toLowerCase().includes(searchOut.toLowerCase()) ||
                    item.rate.toString().toLowerCase().includes(searchOut.toLowerCase())
            );

            if (foundItem) {
                const isItemSelected = selectedItems.some(
                    (selectedItem) => selectedItem.item_code === foundItem.item_code
                );
                if (!isItemSelected) {
                    setSelectedItems((prevItems) => [
                        ...prevItems, { ...foundItem, qty: 1, discount: 0, percentDiscount: 0 }
                    ]);
                }
            }
            setSearchOut('');
        }
    };

    const handleItemClick = (item) => {
        const isItemSelected = selectedItems.some(selectedItem => selectedItem.item_code === item.item_code);
        if (!isItemSelected) {
            setSelectedItems((prevItems) => [...prevItems, { ...item, qty: 1, discount: 0, percentDiscount: 0 }]);
        }
        setSearchView(false);
    };

    const handleCustomerClick= (item)=> {
        setCustomerName(item)
        setCustomerListView(false)
    }

    const handleQuantityChange = (index, value) => {
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index].qty = value;
        newSelectedItems[index].discount = (newSelectedItems[index].percentDiscount / 100) * (newSelectedItems[index].rate * newSelectedItems[index].qty);
        setSelectedItems(newSelectedItems);
    };

    const handleDiscountChange = (index, value) => {
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index].discount = value;
        newSelectedItems[index].percentDiscount = (value / (newSelectedItems[index].rate * newSelectedItems[index].qty)) * 100;
        setSelectedItems(newSelectedItems);
    };

    const handlePercentDiscountChange = (index, value) => {
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index].percentDiscount = value;
        newSelectedItems[index].discount = (value / 100) * (newSelectedItems[index].rate * newSelectedItems[index].qty);
        setSelectedItems(newSelectedItems);
    };

    const handleRemoveItem = (index) => {
        const newSelectedItems = selectedItems.filter((_, i) => i !== index);
        setSelectedItems(newSelectedItems);
    };

    return (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-12 col-md-9 mb-1">
                <span className="d-flex" style={{ marginLeft: "20px" }}>
                <b>Sales &nbsp; / &nbsp; Sale Invoice</b>
                </span>
                    <div className='col-3 col-md-3 mt-3 '>
                        <h6 style={{ color: '#4285f4', marginLeft: "20px"  }}>{customerName}</h6>
                    </div>
                    <div className="d-flex flex-column flex-md-row align-items-center">
                        <input
                            type="text"
                            placeholder="Search"
                            className="form-control w-100 mb-2 mb-md-0"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={searchOut}
                            onChange={(e) => setSearchOut(e.target.value)}
                            onKeyDown={handleOuterSearch}
                            style={{
                                borderRadius: '5px',
                                height: '35px',
                                border: isFocused ? '1px solid #007bff' : '1px solid lightgrey',
                            }}
                        />
                        <button
                            className="btn btn-outline-primary btn-sm ms-md-1"
                            style={{ border: 'none' }}
                            onClick={handleSearchView}
                        >
                            <Search size={15} />
                        </button>
                        <div className="ms-md-5 mt-2 mt-md-0">
                            <div className="d-flex flex-wrap gap-2 align-items-center">
                                <input
                                   
                                    type="text"
                                    placeholder="Order Reference"
                                    className="form-control"
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    style={{
                                        borderRadius: '5px',
                                        height: '35px',
                                        border: isFocused ? '1px solid #007bff' : '1px solid lightgrey',
                                    }}
                                />
                                <button
                                    className="btn btn-primary btn-sm"
                                    style={{ maxHeight: '40px', width: '30px' }}
                                >
                                    --
                                </button>
                                <button className="btn btn-primary btn-sm" onClick={handleCustomerListView}>
                                    <UserPlus size={15} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        {searchView && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    zIndex: 10,
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                    padding: '20px',
                                    overflowY: 'auto',
                                }}
                            >
                                <input
                                    className="form-control mb-2"
                                    type="text"
                                    placeholder="Search from Inventory"
                                    value={searchIn}
                                    onChange={(e) => setSearchIn(searchOut)}
                                    style={{ position: 'sticky', top: '0' }}
                                    hidden
                                />
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Description</th>
                                            <th> Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredInventoryData.map((item, index) => (
                                            <tr
                                                key={index}
                                                onClick={() => handleItemClick(item)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <td>{item.item_code}</td>
                                                <td>{item.Item_desc}</td>
                                                <td>{item.rate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                        )}

                        {customerListView && (
                            <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                zIndex: 10,
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                padding: '20px',
                                overflowY: 'auto',
                            }}
                        >
                            <input
                                className="form-control mb-2"
                                type="text"
                                placeholder="Search Customer"
                                value={searchCustomer}
                                onChange={(e) => setSearchCustomer(e.target.value)}
                                style={{ position: 'sticky', top: '0' }}
                            />
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone No</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomerData.map((item, index) => (
                                        <tr
                                            key={index}
                                            onClick={() => handleCustomerClick(item.cust_name)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <td>{item.cust_name}</td>
                                            <td>{item.ph_no}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        )}
                        <div
                            className="col-md-12 mt-1"
                            style={{
                                overflowY: 'auto',
                                backgroundColor: 'rgb(232,233,233)',
                                height: '67vh',
                            }}
                        >
                            <table className="table">
                                <thead>
                                    <tr
                                        style={{
                                            backgroundColor: 'rgb(232,233,233)',
                                            borderBottom: '1px solid grey',
                                        }}
                                    >
                                        <th style={{ backgroundColor: 'rgb(232,233,233)' }}>Code</th>
                                        <th style={{ backgroundColor: 'rgb(232,233,233)' }}>Product</th>
                                        <th style={{ backgroundColor: 'rgb(232,233,233)' }}>Qty</th>
                                        <th style={{ backgroundColor: 'rgb(232,233,233)' }}>Rate</th>
                                        <th style={{ backgroundColor: 'rgb(232,233,233)' }}>Disc</th>
                                        <th style={{ backgroundColor: 'rgb(232,233,233)' }}>%Disc</th>
                                        <th style={{ backgroundColor: 'rgb(232,233,233)' }}>Amount</th>
                                        <th style={{ backgroundColor: 'rgb(232,233,233)' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.item_code}</td>
                                            <td>{item.Item_desc}</td>
                                            <td className='invoice-items-inputs'>
                                                <input type="number" min={1}
                                                    value={item.qty}
                                                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                                                />
                                            </td>
                                            <td>{item.rate}</td>
                                            <td className='invoice-items-inputs'>
                                                <input
                                                    type="number"
                                                    value={item.discount}
                                                    onChange={(e) => handleDiscountChange(index, e.target.value)}
                                                />
                                            </td>
                                            <td className='invoice-items-inputs'>
                                                <input
                                                    type="number"
                                                    value={item.percentDiscount}
                                                    onChange={(e) => handlePercentDiscountChange(index, e.target.value)}
                                                />
                                            </td>
                                            <td className='invoice-items-inputs'>
                                                <input
                                                    type="text"
                                                    value={`${(item.qty * item.rate) - item.discount}`}
                                                    readOnly
                                                />
                                            </td>
                                            <td>
                                                <button className='btn btn-outline-danger btn-sm'
                                                    onClick={() => handleRemoveItem(index)}
                                                    style={{
                                                        border: 'none',
                                                        height: '27px',
                                                        width: '27px',
                                                        padding: '0'
                                                    }}
                                                >
                                                    <CircleX />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                      
                <div className="col-12 col-md-3 mb-3">
                    <button className="btn btn-outline-primary w-100">All Orders</button>
                    <button className="btn btn-outline-primary w-100 mt-1">All Returns</button>

                    <div className="col-md-12 col-sm-4">
                        <div
                            className="d-flex justify-content-between mt-3"
                            style={{
                                borderBottom: '1px solid rgb(181, 196, 212)',
                            }}
                        >
                            <small>Total Units</small>
                            <small>{totalQuantity}</small>
                        </div>
                        <div
                            className="d-flex justify-content-between mt-3"
                            style={{
                                borderBottom: '1px solid rgb(181, 196, 212)',
                            }}
                        >
                            <small>Subtotal</small>
                            <small>{totalAmount}</small>
                        </div>
                        <div
                            className="d-flex justify-content-between mt-3"
                            style={{
                                borderBottom: '1px solid rgb(181, 196, 212)',
                            }}
                        >
                            <small className="me-5">Discount</small>
                            <input
                                type="Number"
                                placeholder="Rs"
                                min="0"
                                step="any"
                                value={totalDiscount}
                                style={{ width: '70px' }}
                            />
                        </div>
                        <div
                            className="d-flex justify-content-between mt-3"
                            style={{
                                borderBottom: '1px solid rgb(181, 196, 212)',
                            }}
                        >
                            <small>Tax</small>
                            <small>Rs 0.00</small>
                        </div>
                        <div>
                        {showDropup && (
                            <div className="dropup" style={{ position: 'absolute', zIndex: 10 }}>
                                <div
                                    className="bg-white border rounded p-3 col-10 col-sm-8 col-md-6 col-lg-4 mx-auto"
                                    style={{ minWidth: '250px' }} // Set a min-width for better control on small screens
                                >
                                    <div style={{ width: '100%', alignItems: 'flex-end', display: 'flex' }}>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={handleCloseDropUp}
                                            style={{
                                                border: 'none',
                                                height: '27px',
                                                width: '27px',
                                                padding: '0',
                                                marginLeft: 'auto',
                                            }}
                                        >
                                            <CircleX size="18px" />
                                        </button>
                                    </div>

                                    <h6 className="mb-3">Select Options</h6>
                                    <div className="mb-3">
                                        <label htmlFor="option1" className="form-label">Option 1</label>
                                        <select id="option1" className="form-select">
                                            <option value="">Select...</option>
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="option2" className="form-label">Option 2</label>
                                        <select id="option2" className="form-select">
                                            <option value="">Select...</option>
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                        </select>
                                    </div>
                                    {/* Add more options as needed */}
                                </div>
                            </div>
                        )}

                        </div>
                        <div
                            className="d-flex justify-content-between mt-3"
                            style={{
                                borderBottom: '1px solid rgb(181, 196, 212)',
                            }}
                        >
                            <small>
                                <b>Total</b>
                            </small>
                            <small>
                                <b>{totalAmount}</b>
                            </small>
                        </div>
                        <div
                            className="d-flex mt-3"
                            style={{
                                borderBottom: '1px solid rgb(181, 196, 212)',
                            }}
                        >
                            <small
                                className="d-flex justify-content-between"
                                style={{
                                    width: '300px',
                                }}
                            >
                                <div>
                                    Cash Sale
                                    <input className="ms-2" type="radio" name="sale-type" />
                                </div>
                                <div>
                                    Credit Sale
                                    <input
                                        className="ms-2"
                                        type="radio"
                                        name="sale-type"
                                    />
                                </div>
                            </small>
                        </div>
                        <div
                            className="mt-3"
                            style={{
                                borderBottom: '1px solid rgb(181, 196, 212)',
                            }}
                        >
                            <div>
                                <small>Cash</small>
                                <br />
                            </div>
                            <div
                                className="p-1"
                                style={{
                                    width: '100%',
                                    height: '35px',
                                    borderRadius: '5px',
                                    backgroundColor: 'grey',
                                }}
                            >
                                500
                            </div>
                        </div>
                        <div
                            className="mt-2"
                            style={{
                                borderBottom: '1px solid rgb(181, 196, 212)',
                            }}
                        >
                            <div>
                                <small>Bank Transfers</small>
                                <br />
                            </div>
                            <div
                                className="p-1"
                                style={{
                                    width: '100%',
                                    height: '35px',
                                    borderRadius: '5px',
                                    backgroundColor: 'grey',
                                }}
                            >
                                211
                            </div>
                        </div>
                        <div
                            className="d-flex justify-content-between mt-3"
                            style={{
                                borderBottom: '1px solid rgb(181, 196, 212)',
                            }}
                        >
                            <small>
                                <b>Change</b>
                            </small>
                            <small>
                                <b>Rs 0.00</b>
                            </small>
                        </div>
                        
                        <div
                            className="d-flex justify-content-between mt-3"
                            style={{
                                borderBottom: '1px solid rgb(181, 196, 212)',
                            }}
                        >
                      
                            <button
                                className="btn btn-primary btn-sm"
                                style={{ width: '40%' }}
                            >
                                Save
                            </button>
                            <button
                                className="btn btn-outline-primary btn-sm"
                                style={{ width: '55%' }}
                                onClick={toggleDropup}
                            >
                                Split Amount
                            </button>
                       
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Invoice;