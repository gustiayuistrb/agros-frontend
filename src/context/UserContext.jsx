import React, { createContext, useContext, useState, useEffect } from 'react';

// Buat context u/ user data
const UserContext = createContext();

// Akses user data dr context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// UserProvider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    fullName: localStorage.getItem('fullName') || 'Pengguna', 
    city: localStorage.getItem('city') || '',
    email: localStorage.getItem('email') || '',
  });

  // Update user setelah profile update
  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem('fullName', newUserData.fullName);
    localStorage.setItem('city', newUserData.city);
    localStorage.setItem('email', newUserData.email);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);  //Update user yg udah dsimpan
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
