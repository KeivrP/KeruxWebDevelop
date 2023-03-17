import { useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type DateInputProps = {
    label: string;
    value: Dayjs | null;
    onChange: (date: Dayjs | null) => void;
    inputProps?: TextFieldProps['inputProps'];
};

export function DateInput({ label, value, onChange, inputProps }: DateInputProps) {

    const handleDateChange: DatePickerProps<Dayjs | null>['onChange'] = (date) => {
        onChange(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            
            <DatePicker
                label={label}
                value={value}
                onChange={onChange}
                format="DD/MM/YYYY"
           
                /* TextFieldComponent={(params: TextFieldProps) => (
                    <TextField {...params} inputProps={inputProps} variant="standard" />
                )} */
            />
        </LocalizationProvider>
    );
}

export default DateInput;
