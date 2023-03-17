import { useState } from "react";
import {
    IconButton,
    Menu,
    MenuItem,
    Typography,
    TextField
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const ButtonSearch: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Declaración de un estado para el elemento que va a servir como ancla del menú
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { // Función que maneja el evento de clic en el botón de búsqueda
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => { // Función que maneja el evento de cerrar el menú
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton onClick={handleClick}> 
                <SearchIcon /> 
                <Typography variant="body1">Buscar</Typography>  
            </IconButton>
            <Menu // Menú desplegable que se abre al hacer clic en el botón de búsqueda
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
                transformOrigin={{ horizontal: "left", vertical: "top" }} // Origen de la transformación del menú
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }} // Origen del ancla del menú
            >
                <MenuItem> // Elemento del menú
                    <TextField
                        defaultValue="Buscar..."
                        helperText="Buscar en todas las filas"
                        variant="standard"
                        InputProps={{
                            style: { borderBottom: "1px solid red" }
                        }}
                    />

                </MenuItem>
            </Menu>
        </div>
    );
};
export default ButtonSearch;
