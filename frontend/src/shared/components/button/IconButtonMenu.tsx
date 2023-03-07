import { useState } from "react";
import {  IconButton, Menu, MenuItem } from "@mui/material";

export interface IconButtonMenuProps {
  icon: JSX.Element
}

export const IconButtonMenu: React.FC<IconButtonMenuProps> = ({
  icon
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
      >
        {icon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Option #1</MenuItem>
        <MenuItem onClick={handleClose}>Option #2</MenuItem>
        <MenuItem onClick={handleClose}>Option #3</MenuItem>
      </Menu>
    </div>
  );
}