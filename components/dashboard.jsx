import React from 'react'
import { Line, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
 } from 'chart.js'



function Dashboard() {
    // line Char data start
    const options_l={}
    const data_l={
        labels: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ],
        datasets: [
            {
                labels: 'Steps',
                data: [3000,5000,4500,6000,8000,7000,9000],
                borderColor: 'rgb(75,192,192)',
            }
        ]
    }
    // line Char data ends
    // pichart data start
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        ArcElement,
        Title,
        Tooltip,
        Legend 
    )


    const pieChartData={
        labels: ['Facebook', 'Instagram', 'Twitter', 'Youtube', 'linkedIn'],
        datasets:[
            {
                label: 'TimeSpend',
                data: [120, 60,30,90,45],
                backgroundColor:[
                    'rgba(255,99,132,0.9)',
                    'rgba(54,162,235,0.9)',
                    'rgba(255,206,86,0.9)',
                    'rgba(75,192,192,0.9)',
                    'rgba(153,102,255,0.9)',
                ],
                hoverOffset: 4
            }
        ]
    }
    const options= {}

    // pichart data ends



  return (
    <div className="w-100">
  <div
    className="mt-2 pt-2 ps-2"
    style={{
      minHeight: "40px",
      borderRadius: "10px",
    }}
  >
    <span>
      <b>Dashboard</b>
    </span>{" "}
  </div>

  <div className="row mt-2 g-3 justify-content-center">
    {/* Card 1 */}
    <div
      className="col-12 col-sm-6 col-md-4 col-lg-3 me-5"
      style={{
        minHeight: "150px",
        borderRadius: "10px",
        backgroundColor: "#f2f2f2",
      }}
    >
      <span className="d-flex w-100 justify-content-center border-bottom">
        Today Sales
      </span>
    </div>

    {/* Card 2 */}
    <div
      className="col-12 col-sm-6 col-md-4 col-lg-3 me-5"
      style={{
        minHeight: "150px",
        borderRadius: "10px",
        backgroundColor: "#f2f2f2",
      }}
    >
      <span className="d-flex w-100 justify-content-center border-bottom">
        Inventory
      </span>
    </div>

    {/* Card 3 */}
    <div
      className="col-12 col-sm-6 col-md-4 col-lg-3 me-5"
      style={{
        minHeight: "150px",
        borderRadius: "10px",
        backgroundColor: "#f2f2f2",
      }}
    >
      <span className="d-flex w-100 justify-content-center border-bottom">
        Financial
      </span>
    </div>

    {/* Card 4 line Graph */}
    <div
      className="col-12 col-sm-6 col-md-3 col-lg-6 me-5"
      style={{
        minWidth: '200px',
        minHeight: "150px",
        borderRadius: "10px",
        backgroundColor: "#f2f2f2",
      }}
    >
      <span className="d-flex w-100 justify-content-center border-bottom">
        Sales Graph
      </span>
      <div className="d-flex justify-content-center align-items-center">
        <Line options={options_l} data={data_l}/>
      </div>
    </div>

    {/* Card 5  Pie Chart*/}
    <div
      className="col-12 col-sm-6 col-md-3 col-lg-4 me-5"
      style={{
        minHeight: "250px",
        borderRadius: "10px",
        backgroundColor: "#f2f2f2",
      }}

    >
      <span className="d-flex w-100 justify-content-center border-bottom">
        Pie Chart
      </span>
     <div className="d-flex justify-content-center align-items-center">
        <Pie options={options} data={pieChartData}/>
    </div>

    </div>
  </div>
</div>
  )
}

export default Dashboard;