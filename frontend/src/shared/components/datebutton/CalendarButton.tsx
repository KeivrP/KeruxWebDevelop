import React from 'react';

import TodayIcon from '@mui/icons-material/Today';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type Props = {
    selectedDate: Date;
    onChange: (date: Date) => void;
};

// Componente CalendarButton que recibe como props selectedDate y onChange
const CalendarButton: React.FC<Props> = ({ selectedDate, onChange }) => {
    // State para la fecha seleccionada
    const [date, setDate] = React.useState(selectedDate);
    // State para el estado del diálogo (abierto o cerrado)
    const [open, setOpen] = React.useState(false);

    // Función para abrir el diálogo
    const handleOpen = () => {
        setOpen(true);
    };

    // Función para cerrar el diálogo
    const handleClose = () => {
        setOpen(false);
    };

    // Función para guardar la fecha seleccionada y cerrar el diálogo
    const handleDateChange = (date: Date) => {
        setDate(date);
        onChange(date);
        handleClose();
    };
    //handleSaveClick es responsable de guardar la fecha seleccionada por el usuario y cerrar el diálogo de selección de fecha.

    const handleSaveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        handleDateChange(date);
      };
    

    // Componente que se renderiza en la pantalla
    return (
        <>
            <IconButton onClick={handleOpen}>
                <TodayIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Seleccione una fecha</DialogTitle>
                <DialogContent>
                    <Calendar
                        value={date}
                        onChange={handleDateChange}
                        view="year"
                        showNeighboringMonth={false}
                        closeCalendar={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSaveClick}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

// Exportar el componente CalendarButton
export default CalendarButton;