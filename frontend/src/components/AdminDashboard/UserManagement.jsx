import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from 'axios';
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  // Sample user data
  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get('http://localhost:3000/api/admin/getUsers');

      if(response.data){
        console.log(response.data);
        setUsers(response.data)
      }
    }
    getUsers()
  }, [])
  
  // const [users, setUsers] = useState([
  //   { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  //   { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
  //   { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Moderator" },
  // ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filtered users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
   <div className="bg-white flex">
      <Sidebar />
      <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* Search Bar and Add User Button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add User
        </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="px-4 py-2">{user._id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center px-4 py-2 text-gray-500">
                  No users found.
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

export default UserManagement;
