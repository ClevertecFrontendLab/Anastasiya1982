import { createContext, useCallback, useState, useMemo } from 'react';


export const ViewCardsContext = createContext();

export const ViewCardsContextProvider = ({ children }) => {
  const [initialView, setCurrentView] = useState('view-window');

  const changeView = useCallback((view) => {
    setCurrentView(view);
  },[]);

  const currentView=useMemo(()=>({
    initialView,changeView
  }),[initialView,changeView])

 

  return <ViewCardsContext.Provider value={currentView}>{children}</ViewCardsContext.Provider>;
};
