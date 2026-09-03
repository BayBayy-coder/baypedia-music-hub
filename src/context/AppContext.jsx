import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('baypedia_apikey') || 'SS-FREE-DEMO-KEY-2026');
  const [submittedBands, setSubmittedBands] = useState(() => {
    const saved = localStorage.getItem('baypedia_bands');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeAnnouncement, setActiveAnnouncement] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    localStorage.setItem('baypedia_apikey', apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem('baypedia_bands', JSON.stringify(submittedBands));
  }, [submittedBands]);

  const addBandRelease = (newRelease) => {
    const formatted = {
      id: `user-rel-${Date.now()}`,
      ...newRelease,
      status: "PENDING REVIEW",
      releaseDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setSubmittedBands([formatted, ...submittedBands]);
    return formatted;
  };

  return (
    <AppContext.Provider value={{
      apiKey,
      setApiKey,
      submittedBands,
      addBandRelease,
      activeAnnouncement,
      setActiveAnnouncement,
      theme,
      setTheme,
      activeTab,
      setActiveTab
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
