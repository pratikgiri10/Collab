import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from 'axios'
const MeetingManagement = () => {
  const [meetings, setMeetings] = useState([])
  useEffect(() => {
    const getMeetings = async () => {
      const response  = await axios.get('http://localhost:3000/api/admin/scheduledMeetings');
      if(response.data){
        setMeetings(response.data);
      }
    }
    getMeetings();
  }, [])
  
  // const [meetings, setMeetings] = useState([
  //   {
  //     id: 1,
  //     title: "Project Kickoff",
  //     date: "2025-01-15",
  //     time: "10:00 AM",
  //     organizer: "Alice Johnson",
  //   },
  //   {
  //     id: 2,
  //     title: "Design Review",
  //     date: "2025-01-17",
  //     time: "02:00 PM",
  //     organizer: "Bob Smith",
  //   },
  //   {
  //     id: 3,
  //     title: "Sprint Planning",
  //     date: "2025-01-20",
  //     time: "11:00 AM",
  //     organizer: "Charlie Brown",
  //   },
  // ]);

  // Function to delete a meeting
  const deleteMeeting = (id) => {
    const updatedMeetings = meetings.filter((meeting) => meeting.id !== id);
    setMeetings(updatedMeetings);
    alert("Meeting deleted successfully!");
  };

  return (
    <div className=" bg-white flex">
        <Sidebar />
        <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Meeting Management</h1>

      {/* Meetings Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Meeting Id</th>
              <th className="px-4 py-2">Password</th>
              {/* <th className="px-4 py-2">Organizer</th> */}
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting._id} className="hover:bg-gray-100">
                <td className="px-4 py-2">{meeting._id}</td>
                <td className="px-4 py-2">{meeting.title}</td>
                <td className="px-4 py-2">{meeting.startTime}</td>
                <td className="px-4 py-2">{meeting.meetingId}</td>
                <td className="px-4 py-2">{meeting.password}</td>
                {/* <td className="px-4 py-2">{meeting.organizer}</td> */}
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteMeeting(meeting.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {meetings.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center px-4 py-2 text-gray-500">
                  No meetings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default MeetingManagement;
