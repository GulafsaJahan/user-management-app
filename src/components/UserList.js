import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../services/userService";
import UserForm from "./UserForm";
import "./userList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // To store user data for editing
  const [showForm, setShowForm] = useState(false); // To show/hide form modal

  useEffect(() => {
    // Fetch users from API on component mount
    const fetchUsers = async () => {
      const { data } = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleCreateUser = () => {
    setSelectedUser(null); // To open an empty form for creating a new user
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user); // Pass the selected user's data to the form
    setShowForm(true);
  };

  const handleSaveUser = (savedUser) => {
    if (selectedUser) {
      // Update user in the list after editing
      setUsers(users.map((user) => (user.id === savedUser.id ? savedUser : user)));
    } else {
      // Add new user to the list after creation
      setUsers([...users, savedUser]);
    }
    setShowForm(false); // Close the form modal
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId); // Simulate deletion
    setUsers(users.filter((user) => user.id !== userId)); // Remove user from UI
  };

  return (
    <div className="wrapper">
      <h1>User Management</h1>
      <button onClick={handleCreateUser}>Add User</button>

      {/* Table to display users */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th> {/* Added Address column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                {/* Print both street and city as Address */}
                {user.address.street}, {user.address.city}
              </td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show form when adding/editing a user */}
      {showForm && (
        <UserForm
          user={selectedUser}
          onClose={() => setShowForm(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default UserList;
