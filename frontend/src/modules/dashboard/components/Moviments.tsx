import { AccountBalance as AccountBalanceIcon } from "@mui/icons-material";
import {
  Alert,
  Button,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Skeleton,
  Snackbar,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Control, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CardWithBar } from "../../../shared/components/card/CardWithBar";
import { useAppDispatch } from "../../../store/hooks";
import { fetchSeatValidationAction, updateSeatAction } from "../seats-actions";
import { useAppSeat } from "../seats-hooks";
import { ISeatParamsUpdate, IUpdateSeatInput } from "../seats.-types";
import { MovimentsTable } from "./MovimentsTable";

export interface MovimientsProps {
  control: Control<IUpdateSeatInput, any>
}

export const Moviments = ({
  control
}: MovimientsProps) => {
  const { id: seatId } = useParams<{ id: string }>()
  const values = useWatch({ control })
  //const { handleSubmit } = useForm<ISeatParamsUpdate>();

  const { loadingSeatValidate, seatDetails } = useAppSeat();
  const { loadingSeatDetails } = useAppSeat();
  const { seatValidate } = useAppSeat();

  const [mensaje, setMensaje] = useState("")
  const distpatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (seatValidate != null) {
      console.log(seatValidate)
      setMensaje(seatValidate)
      setOpen(true)
    }

  }, [loadingSeatValidate])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    distpatch(fetchSeatValidationAction(seatId as string))
  }


  if (loadingSeatDetails) {
    return (
      <Skeleton variant="rounded" height={345} />
    )
  }

    return (
      <>

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
                        <FormControlLabel value="document" control={<Radio />} label="Documento" />
                        <FormControlLabel value="origin" control={<Radio />} label="Origen" />
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
                      onClick={handleClick}
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            {mensaje}
          </Alert>
        </Snackbar>
      </>

    );
  };
