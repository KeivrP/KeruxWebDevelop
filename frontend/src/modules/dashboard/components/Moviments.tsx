import { AccountBalance as AccountBalanceIcon } from "@mui/icons-material";
import { 
  Button,
  CardContent, 
  FormControl, 
  FormControlLabel, 
  FormLabel, 
  Grid, 
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import { Control, useForm } from "react-hook-form";
import { CardWithBar } from "../../../shared/components/card/CardWithBar";
import { useAppSeat } from "../seats-hooks";
import { IUpdateSeatInput } from "../seats.-types";
import { MovimentsTable } from "./MovimentsTable";

export interface MovimientsProps {
  control: Control<IUpdateSeatInput, any>
}

export const Moviments= ({
  control
}: MovimientsProps) => {
  const {handleSubmit } = useForm<IUpdateSeatInput>();
  const { loadingSeatDetails } = useAppSeat();

  if (loadingSeatDetails) {
    return (
      <Skeleton variant="rounded" height={345} />
    )
  }

  return (
    <CardWithBar 
      title="Movimientos"
      headerStartIcon={<AccountBalanceIcon fontSize="small" />}
    >
      <Grid container>
        <Grid item xs={12} lg={8.5} xl={9}>
          <MovimentsTable />
        </Grid>
        <Grid item xs={12} lg={3.5} xl={3}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel>Moneda</FormLabel>
                  <RadioGroup row name="coin">
                    <FormControlLabel value="document" control={<Radio />}  label="Documento" />
                    <FormControlLabel value="origin" control={<Radio />}  label="Origen" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button 
                  fullWidth 
                  variant="contained">
                    CODIFICAR
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="success">
                    VALIDAR
                </Button>
              </Grid>
              <Grid item xs={12}>
               <Button 
                type="submit"
                fullWidth 
                variant="contained" 
                color="inherit"
                onClick={handleSubmit((newValues) => console.log('newValues', newValues))}
                >
                  
                  GUARDAR
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </CardWithBar>
  );
};
