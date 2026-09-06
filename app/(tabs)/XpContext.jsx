import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { getAccount, getCurrentUser, updateUser } from '../../lib/appwrite';

const XpContext = createContext();

export const XpProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [user, setUser] = useState(null);
  const xpRef = useRef(0); // ref tracks latest xp to avoid stale closures in addXp

  useEffect(() => {
    xpRef.current = xp;
  }, [xp]);

  const calculateFillPercentage = (xp) => ((xp % 100) / 100) * 100;
  const calculateLevel = (xp) => Math.floor(xp / 100) + 1;

  const addXp = async (amount) => {
    try {
      const userDocument = await getCurrentUser();
      if (!userDocument) return; // not logged in
      const newXp = xpRef.current + amount;
      setXp(newXp);
      xpRef.current = newXp;
      await updateUser(userDocument.$id, { xp: newXp });
      return newXp;
    } catch (error) {
      console.error('Error adding XP:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const account = await getAccount();
      if (!account) return; // guest, nothing to fetch
      const userDocument = await getCurrentUser();
      if (!userDocument) return;
      setUser(account.name);
      setXp(userDocument.xp ?? 0);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogin = async () => {
    await fetchUserData();
  };

  const handleLogout = () => {
    setUser(null);
    setXp(0);
    xpRef.current = 0;
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <XpContext.Provider
      value={{
        xp,
        setXp,
        addXp,
        calculateFillPercentage,
        calculateLevel,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </XpContext.Provider>
  );
};

export const useXp = () => useContext(XpContext);

export default function EmptyXpScreen() {
  return null;
}
