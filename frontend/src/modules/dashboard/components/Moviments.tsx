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
import { CardWithBar } from "../../../shared/components/card/CardWithBar";
import { useAppSeat } from "../seats-hooks";
import { MovimentsTable } from "./MovimentsTable";

export const Moviments = () => {
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
        <Grid item xs={12} lg={9} xl={10}>
          <MovimentsTable />
        </Grid>
        <Grid item xs={12} lg={3} xl={2}>
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
                color="inherit">
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
