import axios from "axios";

const apiEndpoint = "https://jsonplaceholder.typicode.com/users";

// Fetch all users
export const getUsers = () => {
  return axios.get(apiEndpoint);
};

// Fetch a single user by ID
export const fetchUserById = (userId) => {
  return axios.get(`${apiEndpoint}/${userId}`);
};

// Create a new user
export const createUser = (user) => {
  return axios.post(apiEndpoint, user);
};

// Update an existing user
export const updateUser = (userId, user) => {
  return axios.put(`${apiEndpoint}/${userId}`, user);
};

// Delete a user
export const deleteUser = (userId) => {
  return axios.delete(`${apiEndpoint}/${userId}`);
};
