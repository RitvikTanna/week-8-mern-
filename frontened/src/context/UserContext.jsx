import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create User Context
const UserContext = createContext();

// Base API URL - point to express server running on port 4000
const API_BASE_URL =
  "https://week-8-mern-mcit.vercel.app/user-api";

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Clear messages/errors automatically after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Fetch all active users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      // The backend returns { message: "users", payload: usersList }
      if (response.data && response.data.payload) {
        setUsers(response.data.payload);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.response?.data?.message || "Failed to load users. Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on initial mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Add a new user
  const addUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, userData);
      // The backend returns { message: "User created successfully", payload: newUserDocument }
      if (response.status === 201) {
        const newUser = response.data.payload;
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setMessage("User created successfully! ✨");
        return { success: true };
      }
      return { success: false, error: "Unexpected response status" };
    } catch (err) {
      console.error("Error adding user:", err);
      const errMsg = err.response?.data?.message || "Error creating user.";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  // Delete a user (soft delete)
  const deleteUser = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        setMessage("User deleted successfully! 🗑️");
        return { success: true };
      }
      return { success: false, error: "Unexpected response status" };
    } catch (err) {
      console.error("Error deleting user:", err);
      const errMsg = err.response?.data?.message || "Error deleting user.";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        message,
        fetchUsers,
        addUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext
export function useUsers() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
}
