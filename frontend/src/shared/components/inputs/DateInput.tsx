import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export function DateInput({
    format = 'DD/MM/YYYY',
    ...props
}: DatePickerProps<any>) {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment} >
            <DatePicker
                {...props}
                format={format}
            />
        </LocalizationProvider>
    );
}

export default DateInput;
