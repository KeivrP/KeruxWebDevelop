import { useState } from "react";
import {
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Paper,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";



export const ButtonSearch: React.FC = () => {
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
            <IconButton onClick={handleClick}>
                <SearchIcon />
                <Typography variant="body1">Buscar</Typography>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            backgroundColor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            >
                <MenuItem>
                    <InputBase
                        placeholder="Buscar..."
                        inputProps={{ "aria-label": "Buscar" }}
                       
                    />
                </MenuItem>
            </Menu>
        </div>
    );
};
export default ButtonSearch;
