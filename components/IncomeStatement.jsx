import React, { useState, useEffect } from 'react';

function IncomeStatement() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Get the current date
    const today = new Date();

    // Format the date as desired (e.g., MM/DD/YYYY)
    const formattedDate = today.toLocaleDateString(); // Locale-based date string

    // Set the formatted date to state
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div
      style={{
        width: '210mm',
        height: '297mm',
        margin: '0',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div className="d-flex justify-content-between mt-3 pb-3">
        <div style={{ width: '70mm' }}>
          <small>Statement from : 01-01-2001 to 30-12-2024</small>
        </div>
        <div style={{ width: '70mm' }}>
          <h4>Income Statement</h4>
        </div>
        <div style={{ width: '70mm' }}>
          <small>{currentDate}</small>
        </div>
      </div>

      {/* Head */}
      <div className="d-flex justify-content-between">
        <div style={{ width: '105mm', textAlign: 'center' }}>
          <b>Description</b>
        </div>
        <div style={{ width: '105mm', textAlign: 'center' }}>
          <b>Amount</b>
        </div>
      </div>

      {/* Sales Section */}
      <div>
        <div className="ms-5">
          <span>
            <b>Sales</b>
          </span>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>Sales</div>
          <div style={{ width: '105mm', textAlign: 'center' }}>40,736,763.49</div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>Sales Return</div>
          <div style={{ width: '105mm', textAlign: 'center' }}>(25,011,068.00)</div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>Sales Discount</div>
          <div style={{ width: '105mm', textAlign: 'center' }}>(2,484,534.40)</div>
        </div>
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm', textAlign: 'center' }}></div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            <hr style={{ margin: '3px 0' }} />
            13,241,161.09
          </div>
        </div>
      </div>

      <br />

      {/* Cost of Goods Sold Section */}
      <div>
        <div className="ms-5">
          <span>
            <b>Cost of goods sold</b>
          </span>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>Cogs Inventory</div>
          <div style={{ width: '105mm', textAlign: 'center' }}>
            4,379,214,244.56
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}></div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            4,379,214,244.56
          </div>
        </div>
      </div>
      <br />

      {/* Gross Profit Section */}
      <div>
        <div className="ms-5">
          <span>
            <b>Gross Profit</b>
          </span>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>Cogs Inventory</div>
          <div style={{ width: '105mm', textAlign: 'center' }}>
            (4,365,973,083.47)
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}></div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            4,365,973,083.47
          </div>
        </div>
      </div>
      <br />

      {/* Operation and Admin Section */}
      <div>
        <div className="ms-5">
          <span>
            <b>Operation and Admin</b>
          </span>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>Salaries</div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            27,000.00
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>Repair & Maintenance</div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            5,000.00
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>Postage & Courier Expenses</div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            500.00
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>Telephone Bill</div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            (60,000.00)
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>Travelling Expenses</div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            27,100.00
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>Computer Accessories</div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            (6,522.00)
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>Depreciation Expense</div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            (500.00)
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>LABOUR</div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            (450,730.00)
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>DAILY LUNCH EXP</div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            5,000.00
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>MOBILE PHONE EXPENSE</div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            500.00
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>MISC EXPENSE</div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            5,000.00
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>FREIGHT EXPENSE</div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            500.00
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="ms-5 d-flex justify-content-between">
          <div style={{ width: '105mm' }}>EXPENSE FOH</div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            2,500.00
            <hr style={{ margin: '3px 0' }} />
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <div style={{ width: '105mm', textAlign: 'center' }}></div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            (449,500.00)
          </div>
        </div>
      </div>
      <br />


      {/* Operating Profit Section */}
      <div>
        <div className="ms-5">
          <span>
            <b>Operating Profit</b>
          </span>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="d-flex justify-content-between">
          <div style={{ width: '105mm', textAlign: 'center' }}></div>
          <div style={{ width: '105mm', textAlign: 'center' }}>
            (4,366,422,735.47)
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="d-flex justify-content-between">
          <div style={{ width: '105mm', textAlign: 'center' }}></div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            4,366,422,735.47
          </div>
        </div>
      </div>
      <br />

      {/* Net Profit Section */}
      <div>
        <div className="ms-5">
          <span>
            <b>Net Profit</b>
          </span>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="d-flex justify-content-between">
          <div style={{ width: '105mm', textAlign: 'center' }}></div>
          <div style={{ width: '105mm', textAlign: 'center' }}>
            (4,366,422,735.47)
          </div>
        </div>
        <hr style={{ margin: '3px 0' }} />
        <div className="d-flex justify-content-between">
          <div style={{ width: '105mm', textAlign: 'center' }}></div>
          <div
            className="pe-5 me-3 ps-5 ms-4"
            style={{ width: '105mm', textAlign: 'center' }}
          >
            4,366,422,735.47
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default IncomeStatement;
