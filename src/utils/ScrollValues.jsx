import { createContext, useContext, useEffect, useState } from 'react';
import App from '../App';

// Create Scroll Context
const scrollPositionContext = createContext();

// Create a provider component
export function ScrollProvider({ children }) {
  const [scrollPosition, setScrollPosition] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop === 0) {
        setScrollPosition("top");
      } else if (scrollTop + clientHeight >= scrollHeight - 5) {
        setScrollPosition("end");
      } else {
        setScrollPosition("middle");
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <scrollPositionContext.Provider value={{scrollPosition, setScrollPosition}}>
      {children}
    </scrollPositionContext.Provider>
  );
}

// Custom hook for easy access to the context
export function useScrollPosition() {
  return useContext(scrollPositionContext);
}
