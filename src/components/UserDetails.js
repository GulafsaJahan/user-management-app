import React, { useEffect, useState } from "react";
import { fetchUserById } from "../services/userService";

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchUserById(userId);
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p>Loading user details...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      {/* <p>Website: {user.website}</p> */}
    </div>
  );
};

export default UserDetails;
