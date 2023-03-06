import { createContext, useContext } from "react";

export interface DashboardContextProps {
  mobileOpen: boolean;
  drawerToggle: () => void;
  drawerWidth: number;
  window?:  () => Window 
}

export const DashboardContext = createContext<DashboardContextProps>({
  mobileOpen: false,
  drawerToggle: () => {},
  drawerWidth: 240
});

export const useDashboard = () => useContext(DashboardContext);