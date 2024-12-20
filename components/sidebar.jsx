import { createContext, useContext, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logo from "../src/assets/logo.png";
import logo_min from "./../src/assets/logo-mini.png";
import whatsapp from "./../src/assets/whatsapp.png"
import * as LucideIcon from "lucide-react";
import {Link,  useLocation } from "react-router-dom";
import Dashboard from "./dashboard";
import InventoryRep from './inventory-report'
import PurchaseOrder from "./purchaseOrder";
import InventoryList from "./ListView/InventoryList";
import CustomerList from "./ListView/CustomerList";
import SupplierList from "./ListView/SupplierList";
import IpAddressLocation from "./IpAddress/IpAddressLoaction";
import JsonTable from './JsonTable'
import Invoice from '../components/Sales/Invoice'
import DateTime from "./datetime/datetime";
import { div } from "framer-motion/client";
import EmployeeData from "./forms/EmployeeData";


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
  const isInventoryreport = location.pathname ==='/inventory-report'
  const ispurchaseOrder = location.pathname ==='/purchase/POs'


  // Sales

  const isSaleInvoice= location.pathname === '/sale/saleInvoice'

  // list View
  const isListViewInventory= location.pathname ==='/List-View/Inventory-List'
  const isListViewCustomer= location.pathname ==='/List-View/Customer-List'
  const isListViewSupplier= location.pathname ==='/List-View/Supplier-List'


  // Ip Address and Location

  const isIpaddressLocation= location.pathname=== '/ipinfo'
  const isJsonTable= location.pathname=== '/json-table'

  
  // Employee dataForm

  const isEmployeeDataForm= location.pathname==='/EmployeeDataForm'


  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => setIsExpanded((prevState) => !prevState);
  

  return (
    <li className="d-flex py-2 px-3 my-1">
      {/* Animated Sidebar */}
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

        <SidebarContext.Provider value={{ isExpanded }}>
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
        
        <nav  className="d-flex justify-content-between"
        style={{
          backgroundColor: '#f2f2f2',
          marginTop: '0px',
          // position: 'sticky',
          padding: '10px',
          paddingLeft: isExpanded? '10px': '60px',
        }}
        >{isExpanded? <div className="spacer">
          {isSaleInvoice&& (
            <>
            <h5 className="ms-4"
            style={{
              fontWeight: 'bold',
              color: '#4285f4'
            }}
            >Sale Invoice</h5>
           
            </>
          )}
        </div>
        :
        <div className="d-flex ">
          <img style={{width:'70px'}} src={logo_min} alt="" />
          {isSaleInvoice&& (
            <h5 className="ms-4"
            style={{
              fontWeight: 'bold',
              color: '#4285f4'
            }}
            >Sale Invoice</h5>
          )}
          </div>}
        <div className="d-flex">
          <li className="d-flex"
          style={{
            listStyleType: 'none'
          }}
          >
            
              <div className="me-4">
                <DateTime/>

              </div>

            <DynamicIcons iconName={'Headset'} size={18}/><b>:</b>
            <small className="ms-2">042-35764969</small>
          </li>
          <li
          style={{
            listStyleType: 'none',
            marginLeft: '10px'
          }}
          >
            <img 
            style={{
              height: '20px',
              width: '20px'
            }}
            src={whatsapp}/><b> :</b>
            <small className="ms-2">+92-3034220867</small>
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
        {ispurchaseOrder && (
          <PurchaseOrder/>
        )}
        {/* Sales  */}
          {/* Sales Sale invoice */}
          {isSaleInvoice && (
            <Invoice/>
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
  const { isExpanded } = useContext(SidebarContext);
  const [isOpen, setIsOpen] = useState(false);
  const [OpenSublistIndex, setOpenSublistIndex]=useState(null)

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
    onClick={isDropdown ? toggleDropdown : onClick}
    whileHover={{ scale: 1.05 }} // Slight zoom on hover
    whileTap={{ scale: 0.95 }} // Slight shrink on click
  >
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
            isExpanded?
            <motion.li
              key={index}
              className=" align-items-center py-1 px-1 rounded hover:bg-primary"
              whileHover={{ scale: 1.0 }}
            >
              {item.nestedSubList? 
              <>
             
              <DynamicIcons iconName={item.icon} size={18} />
              <span
                className={`${
                  isExpanded ? "ms-1" : "d-none"
                } hover:bg-primary`}

                style={{
                  color: "black"
                }}
                onClick={()=> toggleSubDropdown(index)}
              >
                {item.text}

              {isSubDropdown && (
                <DynamicIcons iconName={OpenSublistIndex? "ChevronUp" : "ChevronDown"} size={15} color={'blue'} />
              )}
              </span>


              {OpenSublistIndex === index && item.nestedSubList && (
               
                <motion.ul
                  className="nested-sublist ps-3"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{height: 'auto',opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1}}
                >
                  {item.nestedSubList.map((nestedItem, nestedindex) => (
                    <li key={nestedindex}
                    style={{
                      listStyleType: 'none',
                      color: "black"
         
                    }}
                    >
                    <Link to={nestedItem.link}>
                    <span>
                    {nestedItem.text}
                    </span>
                    </Link>
                    
                    </li>
                    
                  ))}
                </motion.ul>

              )}

                {/* <LucideIcon.ChevronUpSquareIcon/> */}
              </>
              :
                <Link to={item.link}>
                <DynamicIcons iconName={item.icon} size={18} />
                <span
                  className={`${
                    isExpanded ? "ms-2" : "d-none"
                  } hover:bg-primary`}

                  style={{
                    color: "black"
                  }}
                >
                  {item.text}
                </span>
                </Link>
            
               }
            </motion.li>
            :
            ''
          ))}
        </motion.ul>
      )}
    </>
  );
}
