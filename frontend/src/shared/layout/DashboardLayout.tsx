import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { DashboardContext } from './DashboardContext';
import { TopBar } from './components/Topbar';
import { SideBar } from './components/Sidebar';
import { Toolbar } from '@mui/material';

const drawerWidth = 240;

export interface DashboardLayoutProps {
  children: React.ReactNode
  window?: () => Window;
}
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevVal) => !prevVal);
  }, []);

  

  return (
    <DashboardContext.Provider value={{ 
      mobileOpen, 
      drawerToggle: handleDrawerToggle, 
      drawerWidth,
      window
    }}>
      <Box sx={{ display: 'flex' }}>
        <TopBar />
        <SideBar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </DashboardContext.Provider>
  );
}