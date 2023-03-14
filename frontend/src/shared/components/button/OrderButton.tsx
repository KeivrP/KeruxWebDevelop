import { Button, Grid, IconButton, Menu, MenuItem, TextField, Typography } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from "react";

interface Filter {
    column: string;
    value: string;
}

interface FilterButtonProps {
    columns: string[];
    onApplyFilter: (filters: Filter[]) => void;
}

const OrderButton = ({ columns, onApplyFilter }: FilterButtonProps): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [filters, setFilters] = useState<Filter[]>([{ column: "", value: "" }]);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleAddFilter = () => {
        setFilters([...filters, { column: "", value: "" }]);
    };

    const handleColumnChange = (index: number, column: string) => {
        const newFilters = [...filters];
        newFilters[index].column = column;
        setFilters(newFilters);
    };

    const handleValueChange = (index: number, value: string) => {
        const newFilters = [...filters];
        newFilters[index].value = value;
        setFilters(newFilters);
    };

    const handleRemoveFilter = (index: number) => {
        const newFilters = [...filters];
        newFilters.splice(index, 1);
        setFilters(newFilters);
    };

    const handleApplyFilters = () => {
        const appliedFilters = filters.filter((filter) => filter.column !== "" && filter.value !== "");
        onApplyFilter(appliedFilters);
        handleCloseMenu();
    };

      // Retornamos la estructura del componente
    return (
        <>
            <IconButton aria-label="Filtro" onClick={handleOpenMenu}>
                <SortIcon />
                <Typography variant="body1">Ordenar</Typography>
            </IconButton>
            {/* Menú que muestra los filtros */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>

                {/* Mapea los filtros y los muestra como opciones */}
                {filters.map((filter, index) => (
                    <MenuItem key={index}>

                        {/* Grid para mostrar el selector de columna, el input de valor y el botón de borrar filtro */}
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={5}>
                                {/* Selector de columna */}
                                <TextField
                                    label="Campo"
                                    size="small"
                                    sx={{ width: "150px" }}
                                    select
                                    variant="standard"
                                    InputProps={{
                                        style: { borderBottom: "1px solid red" }
                                    }}
                                    value={filter.column}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        handleColumnChange(index, event.target.value)
                                    }
                                >
                                    {/* Opciones del selector de columna */}
                                    {columns.map((column) => (
                                        <MenuItem key={column} value={column}>
                                            {column}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={5}>
                                {/* Input de valor */}
                                <TextField
                                    sx={{ width: "150px" }}
                                    size="small"
                                    label="Valor"
                                    defaultValue="Buscar.."
                                    value={filter.value}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        handleValueChange(index, event.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={2}>
                                {/* Botón de borrar filtro */}
                                <IconButton color="primary" onClick={() => handleRemoveFilter(index)}>
                                    <ClearIcon />
                                </IconButton>
                            </Grid>
                        </Grid>

                    </MenuItem>
                ))}

                {/* Opción para añadir un nuevo filtro y aplicar los filtros existentes */}
                <MenuItem>
                    {/* Grid para mostrar los botones de añadir filtro y aplicar filtros */}
                    <Grid container>
                        {/* Botón de añadir filtro */}
                        <Grid item>
                            <Button sx={{ color: "#AFAFAF" }} endIcon={<AddIcon />} onClick={handleAddFilter}>
                                Añadir otro campo
                            </Button>
                        </Grid>
                        {/* Botón de aplicar filtros */}
                        <Grid item>
                            <Button sx={{ color: "#AFAFAF" }} onClick={handleApplyFilters}>
                                Aplicar filtros
                            </Button>
                        </Grid>
                    </Grid>
                </MenuItem>
            </Menu>
        </>
    );
};

export default OrderButton;
