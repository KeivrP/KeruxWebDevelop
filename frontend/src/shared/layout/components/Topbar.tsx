import { AppBar, Toolbar, IconButton, Typography } from "@mui/material"
import { Menu as MenuIcon } from '@mui/icons-material';
import { useDashboard } from "../DashboardContext"

export const TopBar = () => {
  const { drawerWidth, drawerToggle } = useDashboard();
  return (
    <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={drawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}