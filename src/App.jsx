import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Sidebar, { SidebarItem } from '../components/sidebar.jsx';
import { DatabaseZap, Landmark, LayoutDashboard, ListOrdered, ListTree, MapPinned, PercentIcon, Replace, ShoppingCart, UserRoundPlus } from 'lucide-react';

// Import your page components

import { link, text } from 'framer-motion/client';
import Login from '../components/login.jsx';


function App() {
  const [activeItem, setActiveItem] = useState();
  const location = useLocation(); // Get the current route location

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/';
  const serv_id= localStorage.getItem('serv_id')

  return (
    <>
    {serv_id ? (
    <>
      {/* Conditionally render Sidebar if not on the login page */}
      {!isLoginPage && (
        
        <Sidebar>
          
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text='Dashboard'
            active={activeItem === 'Dashboard'}
            onClick={() => handleItemClick("Dashboard")}
            link='/dashboard'
          />
          <SidebarItem
          icon={<DatabaseZap size={20}/>}
          text= 'Master Data'
          active={ activeItem === 'Master Data'}
          onClick={()=> handleItemClick('Master Data')}
          isDropdown={true}
          sublist={[
            {text: 'Account', icon: 'Landmark'},
            {text: 'Customer', icon: 'Users'},
            {text: 'Supplier', icon: 'Truck'},
            {text: 'Inventory', icon: 'TableCellsMerge'},
          ]}
          
          />
          
          <SidebarItem
            icon={<ShoppingCart size={20} />}
            text='Purchase'
            active={activeItem === 'Purchase'}
            onClick={() => handleItemClick('Purchase')}
            sublist={[
              { text: 'Purchase Order', icon: 'NotepadTextDashed', link: '/purchase/POs' },
              { text: 'Receipt(GRN)', icon: 'NotepadTextDashed' },
              { text: 'Purchase Bill', icon: 'NotepadTextDashed' },
              { text: 'Purchase Activity', icon: 'NotebookText' },
            ]}
            isDropdown={true}
          />
          <SidebarItem
            icon={<PercentIcon size={20} />}
            text='Sale'
            active={activeItem === 'Sale'}
            onClick={() => handleItemClick('Sale')}
            sublist={[
              { text: 'Sales Order', icon: 'NotepadTextDashed' },
              { text: 'Delivery Notes', icon: 'NotepadTextDashed' },
              { text: 'Sales Invoice', icon: 'NotepadTextDashed' ,link: '/sale/saleInvoice'},
              { text: 'Sales Activity', icon: 'NotepadTextDashed' },
            ]}
            isDropdown={true}
          />

          <SidebarItem
          icon={<ListOrdered size={20}/>}
          text='Inventory'
          active={activeItem === 'Inventory'}
          onClick={()=> handleItemClick('Inventory')}
          isDropdown= {true}
          sublist={[
            {text: 'Inventory List', icon: 'List'},
            {text: 'Adjustments', icon: 'ListPlus'},
            {text: 'Transfers', icon: 'Send'},
          ]}
          />

          <SidebarItem
          icon={<Landmark size={20}/>}
          text='Financials'
          active={activeItem === 'Financials'}
          onClick={()=> handleItemClick('Financials')}
          isDropdown= {true}
          sublist={[
            {text:'Cash Payment Voucher', icon: 'Receipt'},
            {text:'Cash Receipt Voucher', icon: 'Receipt'},
            {text:'Bank Payment Voucher', icon: 'Landmark'},
            {text:'Bank Receipt Voucher', icon: 'Landmark'},
            {text:'Journal Voucher', icon: 'ReceiptText'},
          ]}
          />

        <SidebarItem
            icon={<ListTree size={20} />}
            text='Reports'
            active={activeItem === 'Reports'}
            onClick={() => handleItemClick("Reports")}
            sublist={[
              { text: 'Sales', icon: 'NotepadTextDashed', 
                nestedSubList:[
                  {text: 'Sales By Customer Summary'},
                  {text: 'Sales By Customer Detail'},
                  {text: 'Sales By Item Summary'},
                  {text: 'Sales By Item Detail'},
                  {text: 'Sales By Report Summary'},
                  {text: 'Sales By Report Detail'},
                  {text: 'Sales By Ship To Address'},
                  {text: 'Sales Graph'},
                  {text: 'Pending Sales'},
                  {text: 'Open Sales Order By Customer'},
                  {text: 'Open Sales By Item'},
                ]},
              { text: 'Purchase', icon: 'NotepadTextDashed', 
                nestedSubList:[
                  {text: 'Purchase By Vendor Summary'},
                  {text: 'Purchase By Vendor Detail'},
                  {text: 'Purchase By Item Summary'},
                  {text: 'Purchase By Item Detail'},
                  {text: 'Open Purchase Order'},
                  {text: 'Open Purchase Order Detail'}, 
                  {text: 'Open Purchase Order By Job'}, 
                ]},
              { text: 'Inventory', icon: 'NotepadTextDashed', 
                nestedSubList:[
                  {text: 'Inventory Valuation Summary ', link: '/inventory-report'},
                  {text: 'Inventory Valuation Detail'},
                  {text: 'Inventory Stock Status by Item Vendor'},
                  {text: 'Assembly Shortage By Item'},
                  {text: 'Assembly Shortage By Vendor'},
                  {text: 'Physical Inventory WorkSheet'},
                  {text: 'Pending Builds'},
                  {text: 'Negative Inventory'},
                ]},
            ]}
            isDropdown={true}
            isSubDropdown={true}
          />

          <SidebarItem
          icon={<ListTree size={20}/>}
          text='List View'
          active={activeItem === 'List View'}
          onClick={()=> handleItemClick('List View')}
          isDropdown={true}
          sublist={[
            {text: 'Customer List', icon: 'Users', link:'/List-View/Customer-List'},
            {text: 'Supplier List', icon: 'Truck', link: '/List-View/Supplier-List'},
            {text: 'Inventory List', icon: 'TableCellsMerge', link:'/List-View/Inventory-List' },
            {text: 'Account List', icon: 'Landmark'},
          ]}
          />

          <SidebarItem
          icon={<MapPinned size={20}/>}
          text='IpAddress & Location'
          active={activeItem === 'IpAddress & Location'}
          onClick={()=> handleItemClick('IpAddress & Location')}
          link='/ipinfo'

          />
          <SidebarItem
          icon={<Replace size={20}/>}
          text='Json-Table'
          active={activeItem === 'Json-Table'}
          onClick={()=> handleItemClick('Json-Table')}
          link='/json-table'

          />

          <SidebarItem
          icon={<UserRoundPlus/>}
          text={'Employee-Data'}
          active={activeItem === 'Employee-Data'}
          onClick={()=>handleItemClick('Employee-Data')}
          link={'/EmployeeDataForm'}
          />
        </Sidebar>

      )}

      {/* Define your routes here */}
      <Routes>
        <Route path="/dashboard"/>
        <Route path="/inventory-report" />
        <Route path='/purchase/POs'/>
        {/* sales */}
        <Route path='/sale/saleInvoice'/>
        {/* List View */}

        <Route path='/List-View/Inventory-List'/>
        <Route path='/List-View/Customer-List'/>
        <Route path='/List-View/Supplier-List'/>
        <Route path='/ipinfo'/>
        <Route path= '/json-table'/>
        <Route path='/EmployeeDataForm'/>
        {/* Add more routes as needed */}
      </Routes>
    </>
    ):(
      <Routes>
          {/* Define routes accessible without login */}
          <Route path="/" element={<Login/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )}
    </>
  );
}

export default App;
