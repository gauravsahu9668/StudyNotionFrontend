import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale,LineElement,ArcElement,PointElement, LinearScale, BarElement, Title, Tooltip, Legend);

const InstructorDashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [lineData,setLineData]=useState(null)
  const chartdata = {
    "Web Development": 5,
    "Machine Learning": 6,
    "DevOps": 4,
    "Python": 7,
  };
  useEffect(() => {
    const labels = Object.keys(chartdata); // Categories
    const data = Object.values(chartdata); // Values (Number of courses)

    setChartData({
      labels,
      datasets: [
        {
          label: "Number of Courses",
          data,
          backgroundColor: [
            "#36A2EB",
            "#FF6384",
            "#FFCE56",
            "#4BC0C0",
          ], // Colors for bars
          borderColor: "#000",
          borderWidth: 1,
        },
      ],
    });
    setLineData({
      labels,
      datasets:[
        {
        label: "Number of Courses", // Label for the graph
        data, // Assign values dynamically
        fill: true, // Don't fill under the line
        borderColor: "#36A2EB", // Line color
        tension: 0.2, // Smoothness of the curve
        pointBackgroundColor: "#FF6384", // Point colors
        pointBorderColor: "#36A2EB",
        pointHoverBackgroundColor: "#FFCE56",
        pointHoverBorderColor: "#FF9F40",
        }
      ]
    })
  },[chartdata]);
  return (
    <div className="min-h-screen bg-richblack-900 text-white p-8 flex flex-col items-start">
      <h1 className="text-2xl font-bold mb-6">Instructor Dashboard</h1>
      {chartData && (
          <div className="w-full gap-x-4 flex lfex-row items-center">
            <div
          className="bg-richblack-800 p-4 w-full flex gap-x-5 rounded-lg shadow-lg"
          style={{ width:"650px", height: "400px" }} // Adjust width and height as needed
        >
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false, // Ensures height and width from the parent container are respected
              plugins: {
                legend: {
                  display: true, // Show legend
                  labels: {
                    color: "#FFF", // Legend label color
                  },
                },
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      return `Courses: ${tooltipItem.raw}`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    color: "#444",
                  },
                  ticks: {
                    color: "#FFF",
                  },
                  title: {
                    display: true,
                    text: "Category",
                    color: "#FFF",
                  },
                },
                y: {
                  grid: {
                    color: "#444",
                  },
                  beginAtZero: true,
                  ticks: {
                    color: "#FFF",
                  },
                  title: {
                    display: true,
                    text: "Number of Courses",
                    color: "#FFF",
                  },
                },
              },
            }}
          />
            </div>
            <div className="w-[50%] h-[400px] bg-richblack-800 rounded-lg">
            <Line
            data={lineData}
  options={{
    responsive: true,
    maintainAspectRatio: false, // Ensures the graph respects the height and width from the parent container
    plugins: {
      legend: {
        display: true, // Enable legend
        labels: {
          color: "#FFF", // Legend label text color
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Courses: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "#444", // Gridline color for x-axis
        },
        ticks: {
          color: "#FFF", // Tick color for x-axis
        },
        title: {
          display: true,
          text: "Category", // x-axis title
          color: "#FFF", // Title color for x-axis
        },
      },
      y: {
        grid: {
          color: "#444", // Gridline color for y-axis
        },
        beginAtZero: true, // Start y-axis at 0
        ticks: {
          color: "#FFF", // Tick color for y-axis
        },
        title: {
          display: true,
          text: "Number of Courses", // y-axis title
          color: "#FFF", // Title color for y-axis
        },
      },
    },
            }}
           />
            </div>
          </div>
      ) 
      }
      {
        chartData && (
          <div className="mt-5 w-[400px] h-[400px]">
            <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "bottom", // Set legend position
                  labels: {
                    color: "#FFF", // Set legend label color
                  },
                },
              },
            }}
            >
            </Pie>
          </div>
        )
      }
    </div>
  );
};

export default InstructorDashboard;
