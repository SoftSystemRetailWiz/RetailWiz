import { createContext, useContext, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logo from "../src/assets/logo.png";
import logo_min from "./../src/assets/logo-mini.png";
import whatsapp from "./../src/assets/whatsapp.png"
import * as LucideIcon from "lucide-react";
import {Link,  useLocation } from "react-router-dom";
import Dashboard from "./dashboard";
import InventoryRep from './Reports/Inventory/inventory-report'
import InventoryList from "./ListView/InventoryList";
import CustomerList from "./ListView/CustomerList";
import SupplierList from "./ListView/SupplierList";
import IpAddressLocation from "./IpAddress/IpAddressLoaction";
import JsonTable from './JsonTable'
import Invoice from './Sales/SaleInvoice/Invoice'
import DateTime from "./datetime/datetime";
import EmployeeData from "./forms/EmployeeData";
import Outslip from "../components/Outslip";
import Activity from "./Sales/SalesActivity/Activity";
import SalesOrder from "./Sales/SalesOrder/SalesOrder";
import PurchaseOrder from "./Purchase/PurchaseOrder/PurchaseOrder";
import IncomeStatement from "./IncomeStatement";
import InvoiceWiseProfit from "./Reports/Accounts/Invoice_Wise_Profit_Report";
import ProfitInvoiceCategoryWise from "./Reports/Accounts/ProfitInvoiceCategoryWise";
import { useNavigate } from 'react-router-dom';


// Dynamic Icon Component
function DynamicIcons({ iconName, size = 24 }) {
  const IconComponent = LucideIcon[iconName];
  return IconComponent ? <IconComponent size={size} /> : <LucideIcon.HelpCircle />;
}



// Context for Sidebar State
const SidebarContext = createContext();

export default function Sidebar({ children }) {

  // links routes

  const location = useLocation(); // Get the current route location
  const isDashboard =location.pathname === '/dashboard'
  const ispurchaseOrder = location.pathname ==='/purchase/POs'
  const isOutSlip= location.pathname ==='/OutSlip'
  
  // Reports
  //  Reports/inventory
  const isInventoryreport = location.pathname ==='/inventory/inventory-report'
  // Reports/Account
  const isInvoiceWiseProfitReport= location.pathname === "/account/iwpr"
  const isProfitInvoiceCategoryWise = location.pathname === "/account/picw"



  // Sales
  const isSalesOrder = location.pathname === '/sale/sales_order'
  const isSaleActivity= location.pathname === '/sale/salesActivity'
  const isSaleInvoice= location.pathname === '/sale/saleInvoice'

  // list View
  const isListViewInventory= location.pathname ==='/List-View/Inventory-List'
  const isListViewCustomer= location.pathname ==='/List-View/Customer-List'
  const isListViewSupplier= location.pathname ==='/List-View/Supplier-List'


  // Others

  const isIpaddressLocation= location.pathname=== '/ipinfo'
  const isJsonTable= location.pathname=== '/json-form'
  const isEmployeeDataForm= location.pathname==='/EmployeeDataForm'
  const isIncomeStatement= location.pathname === '/income_statement'

  // login page
  const isLoginPage= location.pathname === '/'
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);

  const [islogout, setIsLogout] = useState(false);


  const toggleSidebar = () => setIsExpanded((prevState) => !prevState);

   // For React Router v6

   const handleLogout = async () => {
    setIsLogout(true);

    // Simulate a delay (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));

    navigate('/');

  }
  

  return (
    <li className="d-flex py-2 px-3 my-1">
      {/* Animated Sidebar */}
      {islogout&&(
        <motion.div 
        initial={{ opacity: 0 }} // Start with a slightly transparent background
        animate={{ opacity: 1 }} // Animate to full opacity
        exit={{ opacity: 0 }} // Fade out when removed from the DOM
        transition={{ duration: 0.8 }}
        className="signout-message">
          <div className="signout-message-content">
            <img src={logo} />
            <h2>Thanks for Using RetailWiz</h2>
          </div>
        </motion.div>
      )}
      <motion.aside
        className={`sidebar text-dark position-fixed  p-2 ${isExpanded? 'overflow-auto bg-light  shadow-sm': ''} `}
        animate={{
          width: isExpanded ? 300 : 65, // Sidebar width toggles between 250px and 55px
          height:isExpanded? '100%': '70px',
        }}
        transition={{
          type: "spring",
          stiffness: 80,
        }}
        style={{
          whiteSpace: "nowrap",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <motion.img
            style={{
              width: isExpanded ? "150px" : "",
            }}
            src={isExpanded ? logo : ''}
            className="logo transition-all"
            animate={{
              opacity: isExpanded ? 1 : 1, // Reduce opacity slightly when collapsed
            }}
          />
          <button
            className={`btn btn-light btn-sm rounded-circle me-0 justify-content-end `}
            onClick={toggleSidebar}
          >
            {isExpanded ? (
              <DynamicIcons iconName="PanelRightOpen" size={18} />
            ) : (
              <DynamicIcons iconName="PanelLeftOpen" size={18} />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ isExpanded, setIsExpanded, handleLogout }}>
          <motion.ul
            className="list-unstyled mt-3"
            animate={{
              opacity: isExpanded ? 1 : 0.7,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            {children}
          </motion.ul>
        </SidebarContext.Provider>
      </motion.aside>

      <div className="w-100"
      style={{
        marginLeft:isExpanded? '310px': '10px',
        marginRight:'10px',
        // marginTop:'10px',
       

      }}
      >
        
      <nav 
          className="col-12 col-md-12 col-sm-12 w-100 d-flex justify-content-between" 
          style={{
              backgroundColor: '#f2f2f2',
              marginTop: '0px',
              padding: '10px',
              paddingLeft: isExpanded ? '10px' : '60px',
          }}
      >
          <div className="d-flex align-items-center">
              {isExpanded ? (
                  <div className="spacer col-sm-0">
                      {isSaleInvoice && (
                          <h5 className="ms-4" style={{ fontWeight: 'bold', color: '#4285f4' }}>
                              Sale Invoice
                          </h5>
                      )}
                      {isOutSlip && (
                          <h5 className="ms-2" style={{ fontWeight: 'bold', color: '#4285f4' }}>
                              OutSlip
                          </h5>
                      )}
                  </div>
              ) : (
                  <div className="d-flex align-items-center">
                      <img style={{ width: '70px' }} src={logo_min} alt="" />
                      {isSaleInvoice && (
                          <h5 className="ms-2" style={{ fontWeight: 'bold', color: '#4285f4' }}>
                              Sale Invoice
                          </h5>
                      )}
                  </div>
              )}
          </div>

          <div className="d-flex align-items-center">
              <li className="d-flex" style={{ listStyleType: 'none' }}>
                  <small className="pe-4">
                      <DateTime />
                  </small>
                  <DynamicIcons iconName={'Headset'} size={18} />
                  <b>:</b>
                  <small className="">042-35764969</small>
              </li>
          </div>
      </nav>


        
        {/* other pages data */}
        {isDashboard &&(
          <Dashboard/>
        )}
        {/*  Report > Inventory > Inventory Summary */}
        {isInventoryreport && (
          <InventoryRep/>
        )}

        {/* Report /Account */}
        {isInvoiceWiseProfitReport &&(
          <InvoiceWiseProfit/>
        )}
        {isProfitInvoiceCategoryWise &&(
          <ProfitInvoiceCategoryWise/>
        )}




        {ispurchaseOrder && (
          <PurchaseOrder/>
        )}
        {/* Sales  */}
          {/* Sales Sale invoice */}
          {isSalesOrder && (
            <SalesOrder/>
          )}
          {isSaleInvoice && (
            <Invoice/>
          )}
          {isSaleActivity&&(
            <Activity/>
          )}

        {/* List View > Inventory List */}
        {isListViewInventory &&(
          <InventoryList/>
        )}
        {isListViewCustomer &&(
          <CustomerList/>
        )}
        {isListViewSupplier&& (
          <SupplierList/>
        )}
        {isIpaddressLocation&&(
          <IpAddressLocation/>
        )}
        {isJsonTable&&(
          <JsonTable/>
        )}
        {isEmployeeDataForm&&(
          <EmployeeData/>
        )}
        {isOutSlip&&(
          <Outslip/>
        )}
        {isIncomeStatement && (
          <IncomeStatement/>
        )}



        
      </div>

    </li>

    

  );
}

// Sidebar Item Component
export function SidebarItem({
  icon,
  text,
  active,
  onClick,
  link,
  sublist = [],
  isDropdown = false,
  isSubDropdown = false,
}) {
  const { isExpanded,  setIsExpanded, handleLogout} = useContext(SidebarContext); 
  const [isOpen, setIsOpen] = useState(false);
  const [OpenSublistIndex, setOpenSublistIndex]=useState(null)
  const width=window.innerWidth

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();
  };

  
  const toggleSubDropdown = (index) => {
    setOpenSublistIndex((prevIndex)=> (prevIndex === index? null: index))
    if (onClick) onClick();
  };


  return (
    <>
      {/* Sidebar Item */}
      {isExpanded && (
  <motion.ul
    className={'d-flex align-items-center py-2 px-3 mb-1 rounded hover:bg-primary'}
    style={{
      backgroundColor: active? 'rgb(0, 123, 255)': '#f8f9fa',
      color: active? '#ffff': 'black',
    }}
    onClick={isDropdown ? toggleDropdown :() => {
      if(width/2<450){
        setIsExpanded(false)

      }
    }}
    whileHover={{ scale: 1.05 }} // Slight zoom on hover
    whileTap={{ scale: 0.95 }} // Slight shrink on click
  >
    {link === '/' ? 
    (
      <Link
      style={{
        color: active? "#ffff": 'black'
      }} 
      onClick={handleLogout}
      >
      {icon}
      <span className="ms-3" 
      >{text}</span>
      {isDropdown && (
        <DynamicIcons iconName={isOpen ? "ChevronUp" : "ChevronDown"} size={15} />
      )}
      </Link>
    ):(
      <Link to={link}
      style={{
        color: active? "#ffff": 'black'
      }} 
      >
      {icon}
      <span className="ms-3" 
      >{text}</span>
      {isDropdown && (
        <DynamicIcons iconName={isOpen ? "ChevronUp" : "ChevronDown"} size={15} />
      )}
      </Link>

    )}
  </motion.ul>
)}


      {/* Sublist Items */}
      {isOpen && (
        <motion.ul
          className={`ps-5 ${isExpanded ? "" : "tooltip-sublist"}`}
          initial={{ height: 0, opacity: 0 }} // Start collapsed
          animate={{ height: "auto", opacity: 1 }} // Expand when open
          exit={{ height: 0, opacity: 0 }} // Collapse when closed
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
         {sublist.map((item, index) => (
  isExpanded ? (
    <motion.li
      key={index}
      className="align-items-center py-1 px-1 rounded hover:bg-primary"
      whileHover={{ scale: 1.0 }}
    >
      {item.nestedSubList ? (
        <>
          <DynamicIcons iconName={item.icon} size={18} />
          <Link>
          <span
            className={`${isExpanded ? "ms-1" : "d-none"} hover:bg-primary`}
            style={{ color: "black" }}
            onClick={() => toggleSubDropdown(index)}
          >
            {item.text}

            {isSubDropdown && (
              <DynamicIcons
                iconName={OpenSublistIndex === index ? "ChevronUp" : "ChevronDown"}
                size={15}
                color={'blue'}
              />
            )}
          </span>
          </Link>

          {OpenSublistIndex === index && item.nestedSubList && (
            <motion.ul
              className="nested-sublist ps-3"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              whileHover={{ scale: 1 }}
            >
              {item.nestedSubList.map((nestedItem, nestedIndex) => (
                <li key={nestedIndex} style={{ listStyleType: 'none', color: "black" }}>
                  <Link
                    to={nestedItem.link}
                    onClick={() => {
                      if(width/2<450){
                        setIsExpanded(false)
              
                      }
                    } }
                  >
                    <span>{nestedItem.text}</span>
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </>
      ) : (
        // Handle the regular link for non-dropdown items
        <Link
          to={item.link}
          onClick={() => {
            if(width/2<450){
              setIsExpanded(false)
    
            }
          }} // Collapse sidebar for small screens
        >
          <DynamicIcons iconName={item.icon} size={18} />
          <span className={`${isExpanded ? "ms-2" : "d-none"} hover:bg-primary`} style={{ color: "black" }}>
            {item.text}
          </span>
        </Link>
      )}
    </motion.li>
  ) : null
))}

        </motion.ul>
      )}
    </>
  );
}