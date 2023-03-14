// Importamos los componentes necesarios de la librería Material-UI
import { Button, Grid, IconButton, Menu, MenuItem, TextField, Typography } from "@mui/material";

// Importamos los iconos necesarios de la librería Material-UI
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from '@mui/icons-material/Add';
import FilterIcon from '@mui/icons-material/Filter';

// Importamos React y el hook useState
import React, { useState } from "react";

// Definimos la interfaz para el objeto Filter
interface Filter {
  column: string;
  value: string;
}

// Definimos la interfaz para las props del componente FilterButton
interface FilterButtonProps {
  columns: string[];
  onApplyFilter: (filters: Filter[]) => void;
}

// Definimos el componente FilterButton
const FilterButton = ({ columns, onApplyFilter }: FilterButtonProps): JSX.Element => {

  // Definimos los estados para el menú y los filtros
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filters, setFilters] = useState<Filter[]>([{ column: "", value: "" }]);

  // Definimos las funciones para manejar la apertura y cierre del menú
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Definimos las funciones para manejar la adición, cambio y eliminación de filtros
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

  // Definimos la función para aplicar los filtros
  const handleApplyFilters = () => {
    const appliedFilters = filters.filter((filter) => filter.column !== "" && filter.value !== "");
    onApplyFilter(appliedFilters);
    handleCloseMenu();
  };

  // Retornamos la estructura del componente
  return (
    <>
      {/* Botón de filtro que abre el menú */}
      <IconButton aria-label="Filtro" onClick={handleOpenMenu}>
        <FilterIcon />
        <Typography variant="body1">Filtrar</Typography>
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

export default FilterButton;
