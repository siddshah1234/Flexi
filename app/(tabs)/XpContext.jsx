import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAccount, getCurrentUser, updateUser } from '../../lib/appwrite';

const XpContext = createContext();

export const XpProvider = ({ children }) => {
  const [xp, setXp] = useState(0); // XP for the current user
  const [user, setUser] = useState(null); // Current user information

  const calculateFillPercentage = (xp) => {
    const maxXp = 100; // Example max XP value
    return ((xp % maxXp) / maxXp) * 100;
  };

  const calculateLevel = (xp) => {
    const maxXp = 100; // Example max XP value per level
    return Math.floor(xp / maxXp) + 1;
  };

  const addXp = async (amount) => {
    try {
      const userDocument = await getCurrentUser(); // Fetch the current user's document
      const newXp = xp + amount; // Calculate new XP
      setXp(newXp); // Update local XP state
      userDocument.xp = newXp; // Update user document XP
      await updateUser(userDocument.$id, { xp: newXp }); // Save to database
      return newXp; // Return updated XP
    } catch (error) {
      console.error('Error adding XP:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const account = await getAccount(); // Fetch account information
      const userDocument = await getCurrentUser(); // Fetch user-specific data

      setUser(account.name); // Set the current user's name
      setXp(userDocument.xp); // Set the current user's XP
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogin = async () => {
    try {
      await fetchUserData(); // Explicitly fetch user data after login
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    setUser(null); // Clear user state
    setXp(0); // Reset XP state
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data on initial render
  }, []);

  return (
    <XpContext.Provider
      value={{
        xp,
        setXp,
        addXp,
        calculateFillPercentage,
        calculateLevel,
        handleLogin, // Expose login handler
        handleLogout, // Expose logout handler
      }}
    >
      {children}
    </XpContext.Provider>
  );
};

export const useXp = () => useContext(XpContext);