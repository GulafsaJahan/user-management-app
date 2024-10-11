import React, { useState, useEffect } from "react";
import { fetchUserById, updateUser } from "../services/userService";

const EditUser = ({ userId, onClose, onUpdate }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await fetchUserById(userId);
        setUser(data);
        setLoading(false);
      } catch (error) {
        alert("Failed to fetch user details");
      }
    };

    getUser();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      const { data } = await updateUser(user.id, user);
      onUpdate(data);
      onClose();
    } catch (error) {
      alert("Failed to update user");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="modal">
      <h2>Edit User</h2>
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="tel"
        value={user.phone}
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditUser;
