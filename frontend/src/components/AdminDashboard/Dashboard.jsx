import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Sidebar from "./Sidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Dummy data for stats
  const stats = [
    { label: "Total Users", value: 1245, color: "bg-blue-500" },
    { label: "Active Rooms", value: 32, color: "bg-green-500" },
    { label: "Active Sessions", value: 128, color: "bg-purple-500" },
    { label: "Server Uptime", value: "99.9%", color: "bg-yellow-500" },
  ];

  // Chart Data
  const chartData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Active Sessions",
        data: [50, 60, 75, 100, 120, 110, 95],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
      },
      {
        label: "Active Rooms",
        data: [10, 12, 15, 20, 25, 22, 18],
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
      },
    ],
  };

  return (
    <div className="bg-white flex gap-4 w-full h-screen overflow-hidden">
        <Sidebar/>
        <div className="flex flex-col gap-4 p-4 w-[90%] h-screen">
            {/* Statistics Section */}
            <div className="flex justify-between">
                {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`p-4 rounded-lg shadow-md text-white ${stat.color}`}
                >
                    <h2 className="text-xl font-semibold">{stat.label}</h2>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                ))}
            </div>

            {/* Graph Section */}
            <div className="flex justify-center w-[90%]">
              <div className="rounded-lg shadow-md w-full">
                  <h2 className="text-xl font-bold text-gray-800">Engagement Trends</h2>
                  <Line data={chartData} />
              </div>
            </div>
            
        </div>
      
    </div>
  );
};

export default Dashboard;
