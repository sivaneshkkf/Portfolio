import { createContext, useContext } from "react";
import { UseFetchCollection } from "../firebase/config";

const DashboardStatsContext = createContext([]);

// A single shared subscription to the "dashboard" stats doc (view/download/
// whatsapp/url counters), instead of every consumer (intro section, resume
// section, share popup) opening its own independent Firestore onSnapshot
// listener for the exact same document.
export function DashboardStatsProvider({ children }) {
  const dashboardDetails = UseFetchCollection("dashboard");
  return (
    <DashboardStatsContext.Provider value={dashboardDetails}>
      {children}
    </DashboardStatsContext.Provider>
  );
}

export function useDashboardStats() {
  return useContext(DashboardStatsContext);
}
