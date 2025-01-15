import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
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
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [session, setSession] = useState(false);
  useEffect(( )=> {
    const checkSession = async () => {
      const response = await axios.get('http://localhost:3000/api/admin/session/check',{
        withCredentials: true
      })
      setSession(response.data.loggedIn)
    }
    checkSession()
  },[])
  useEffect(() => {
    setData([])
    const checkSession = async () => {
      const response = await axios.get('http://localhost:3000/api/admin/session/check',{
        withCredentials: true
      })
      return response.data.loggedIn
    }
   const getTotalUsers = async () => {
   const session = await checkSession()
    if(!session){
      console.log(session);
      navigate('/admin/login')
    }
    else{
      const response = await axios.get('http://localhost:3000/api/admin/totalUsers');
      if(response.data){
        console.log(response.data)
        setData((prev) => [...prev,{label: "Total Users", value: response.data.length, color: "bg-blue-500"}])
      }
    }
   }
   const getActiveRooms = async () => {
    const session = await checkSession()
    if(!session){
      console.log(session);
      navigate('/admin/login')
    }
    else{
      const response = await axios.get('http://localhost:3000/api/admin/activeRooms');
      if(response.data){
        setData((prev) => [...prev,{label: "Active Rooms", value: response.data.length, color: "bg-green-500"}])
      }
    }
   }
   const getTotalMeetings = async () => {
    const session = await checkSession()
    if(!session){
      console.log(session);
      navigate('/admin/login')
    }
    else{
      const response = await axios.get('http://localhost:3000/api/admin/totalMeetings');
      if(response.data){
        setData((prev) => [...prev,{label: "Scheduled Meetings", value: response.data.length, color: "bg-purple-500"}])
      }
    }
   }
   getTotalUsers()
   getTotalMeetings()
   getActiveRooms()
   
  }, [])
  

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
        <div className="flex flex-col gap-4 p-4 w-[80%] h-screen">
        <h1 className="bg-[#044c69] w-full text-white text-2xl font-bold py-4 px-6 mb-2">Dashboard</h1>
            {/* Statistics Section */}
            <div className="flex justify-between">
              {console.log(data)}
                {data.map((stat, index) => (
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
            {session && <div className="flex justify-center w-[80%]">
              <div className="rounded-lg shadow-md w-full">
                  <h2 className="text-xl font-bold text-gray-800">Engagement Trends</h2>
                  <Line data={chartData} />
              </div>
            </div>}
            
        </div>
      
    </div>
  );
};

export default Dashboard;
