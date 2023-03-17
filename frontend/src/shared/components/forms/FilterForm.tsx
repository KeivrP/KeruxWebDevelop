import { useCallback, useMemo, useState } from "react";
import { 
  Add as AddIcon, 
  Close as CloseIcon, 
} from "@mui/icons-material"
import { 
  Grid,
  Button as MuiButton,
  styled,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material"

export interface IFieldOption {
  name: string;
  value: string;
} 

export interface IFilterOption {
  label: string;
  value: string | number;
}

const Button = styled(MuiButton)(() => ({
  textTransform: 'none',
}))

export interface FilterFormProps {
  onCancel: () => void; 
  onApply: () => void;
  options: IFilterOption[] 
}

export const FilterForm = ({
  onCancel,
  onApply,
  options
}: FilterFormProps) => {
  const [fields, setFields] = useState<IFieldOption[]>([
    { name: '', value: '' }
  ]);

  const onAddField = useCallback(() => {
    setFields((prevState) => prevState.concat([{ name: '', value: '' }]))
  }, [])

  const onRemoveField = useCallback((index: number) => {
    setFields((prevState) => prevState.filter((_item, i) => i !== index));
  }, [])

  const fieldsComponents = useMemo(() => 
    fields.map((field, i) => (
      <Grid item xs={12} key={field.name} >
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Select 
              fullWidth
              placeholder="Selecciona Campo" 
              size="small"
              sx={{
                '& .MuiSelect-select .notranslate::after': {
                  content: '"Selecciona Campo"',
                  opacity: 0.42,
                }
              }}>
              {options.map(({ label, value }) => (
                <MenuItem  key={value} value={value}>{label}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={5}> 
            <TextField 
              placeholder="Ingresa Valor"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            {i > 0 ?
              <IconButton onClick={() => onRemoveField(i)}>
                <CloseIcon />
              </IconButton>
            : null}
          </Grid>
        </Grid>
      </Grid>
    ))
  , [fields, onRemoveField, options])

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        onApply()
      }}
    >
      <Grid container flexDirection="column" spacing={2}>
        {fieldsComponents}
        <Grid item xs={12}>
          <Button 
            fullWidth 
            endIcon={<AddIcon />}
            onClick={onAddField}>
            Añadir Campo
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid
        spacing={2}
        container
        justifyContent="flex-end">
        <Grid item>
          <Button onClick={onCancel}>
            Cancelar
          </Button> 
        </Grid>
        <Grid item>
          <Button 
            type="submit" 
            color="primary" 
            variant="contained">
            Aplicar
          </Button> 
        </Grid>
      </Grid>
    </form>   
  )
}