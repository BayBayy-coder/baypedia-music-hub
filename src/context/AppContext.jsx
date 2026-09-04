import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('baypedia_apikey') || 'SS-FREE-DEMO-KEY-2026');
  const [submittedBands, setSubmittedBands] = useState(() => {
    const saved = localStorage.getItem('baypedia_bands');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeAnnouncement, setActiveAnnouncement] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('baypedia_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('baypedia_apikey', apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem('baypedia_bands', JSON.stringify(submittedBands));
  }, [submittedBands]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (user) localStorage.setItem('baypedia_user', JSON.stringify(user));
    else localStorage.removeItem('baypedia_user');
  }, [user]);

  const addBandRelease = (newRelease) => {
    const formatted = {
      id: `user-rel-${Date.now()}`,
      ...newRelease,
      status: 'PENDING REVIEW',
      releaseDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setSubmittedBands([formatted, ...submittedBands]);
    return formatted;
  };

  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{
      API_BASE,
      apiKey,
      setApiKey,
      submittedBands,
      addBandRelease,
      activeAnnouncement,
      setActiveAnnouncement,
      theme,
      setTheme,
      darkMode: theme === 'dark',
      setDarkMode: (v) => setTheme(v ? 'dark' : 'light'),
      activeTab,
      setActiveTab,
      user,
      setUser,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
