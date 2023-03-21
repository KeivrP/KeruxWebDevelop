import { AccountBalance as AccountBalanceIcon } from "@mui/icons-material";
import {
  Alert,
  Backdrop,
  Button,
  CardContent,
  CircularProgress,
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
import { fetchSeatCodificar, fetchSeatValidationAction, updateSeatAction } from "../seats-actions";
import { useAppSeat } from "../seats-hooks";
import { ISeatParamsUpdate, IUpdateSeatInput } from "../seats.-types";
import { MovimentsTable } from "./MovimentsTable";

export interface MovimientsProps {
  control: Control<IUpdateSeatInput, any>,
  onSave: () => void;
}

export const Moviments = ({
  control,
  onSave
}: MovimientsProps) => {
  const { id: seatId } = useParams<{ id: string }>()
  const values = useWatch({ control })
  //const { handleSubmit } = useForm<ISeatParamsUpdate>();

  const { loadingSeatValidate, seatDetails, loadingCodificar,seatCodificar, seatUpdate,loadingSeatUpdate} = useAppSeat();
  const { loadingSeatDetails } = useAppSeat();
  const { seatValidate } = useAppSeat();

  const [mensaje, setMensaje] = useState("")
  const distpatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [openBac, setOpenBac] = useState(false);
 
  useEffect(() => {
    if (!loadingSeatValidate && seatValidate != null){
      console.log(seatValidate, loadingSeatValidate)
      setMensaje(seatValidate)
      setOpen(true)
      setOpenBac(false)
    }if (loadingSeatValidate){
      setOpenBac(true)
      console.log(loadingSeatValidate)

    }

  }, [seatValidate, loadingSeatValidate])

  useEffect(() => {
    if (!loadingSeatUpdate && seatUpdate != null){
      console.log(seatUpdate, loadingSeatUpdate)
      setMensaje(seatUpdate)
      setOpen(true)
      setOpenBac(false)
    }if (loadingSeatUpdate){
      setOpenBac(true)
      console.log(loadingSeatUpdate)

    }

  }, [seatUpdate, loadingSeatUpdate])

  useEffect(() => {
    if (!loadingCodificar && seatCodificar != null){
      console.log(seatCodificar, loadingCodificar)
      setMensaje(seatCodificar)
      setOpen(true)
      setOpenBac(false)
    }if (loadingCodificar){
      setOpenBac(true)
      console.log(loadingCodificar)

    }

  }, [seatCodificar, loadingCodificar])



  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    distpatch(fetchSeatValidationAction(seatId as string))
  }

  const handleCodif = () => {
    distpatch(fetchSeatCodificar(seatId as string))
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
                    onClick={handleCodif}
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
                    onClick={onSave}
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBac}
  
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {mensaje}
        </Alert>
      </Snackbar>
    </>

  );
};
