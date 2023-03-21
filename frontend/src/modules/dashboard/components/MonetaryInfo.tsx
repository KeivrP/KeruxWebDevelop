import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Skeleton,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Control, useController } from "react-hook-form";
import { TitleBar } from "../../../shared/components/bars/TitleBar";
import { TextFieldEditable } from "../../../shared/components/inputs/TextFieldEditable";
import { MonetaryIcon } from "../../../shared/icons/MonetaryIcon";
import { useAppDispatch } from "../../../store/hooks";
import { fetchSeatMonedaAction } from "../seats-actions";
import { useAppSeat } from "../seats-hooks";
import { canEditSeat } from "../seats-utils";
import { IUpdateSeatInput, IMonedaSelect } from "../seats.-types";

enum MonetaryInfoEnum {
  document = 'document',
  origin = 'origin'
}

export interface MonetaryInfoProps {
  control: Control<IUpdateSeatInput, any>
}
export const MonetaryInfo = ({
  control
}: MonetaryInfoProps) => {
  const distpatch = useAppDispatch();
  const [showCoin, setShowCoin] = useState<MonetaryInfoEnum>(MonetaryInfoEnum.document);
  const { seatDetails, loadingSeatDetails, seatLstMoneda } = useAppSeat()

  const getLstMoneda = useCallback(() => {
    if (seatDetails != null) {
      const codsitio = seatDetails.cabdocumento.codsitio
      const fecdoc = seatDetails.cabdocumento.fecdoc as string;
      distpatch(fetchSeatMonedaAction({ codsitio, fecdoc }))
    }

  }, [distpatch, seatDetails])

  useEffect(() => {
    getLstMoneda()
  }, [getLstMoneda]);

  const mtoDocCtrl = useController({
    name: 'cabdocumento.mtodoc',
    control
  });
  const codMonedaToDocCtrl = useController({
    name: 'cabdocumento.codmonedamtodoc',
    control
  });

  const canEdit = useMemo(() =>
    seatDetails ? canEditSeat(seatDetails) : false
    , [seatDetails])

  const origenInputs = useMemo(() => {
    if (showCoin === MonetaryInfoEnum.document) return null;
    return (
      <>
        <Grid item xs={12}>
          <TextField
            label="Moneda Original"
            fullWidth
            variant="standard"
            value={seatDetails?.cabdocumento.codmonedamtodoc}
            InputProps={{
              readOnly: true,
              style: {
                fontWeight: 600
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tasa"
            fullWidth
            variant="standard"
            value={seatDetails?.cabdocumento.tasa}
            InputProps={{
              readOnly: true,
              style: {
                fontWeight: 600
              }
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Monto Original"
            fullWidth
            variant="standard"
            value={seatDetails?.cabdocumento.montoorig}
            InputProps={{
              readOnly: true,
              style: {
                fontWeight: 600
              }
            }}
          />
        </Grid>
      </>
    )
  }, [showCoin, seatDetails])

  if (loadingSeatDetails) return (
    <Skeleton variant="rounded" height="100%" />
  )

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <TitleBar startIcon={<MonetaryIcon fontSize="small" />} marginBottom="10px">
        Información Monetaria
      </TitleBar>
      <Card style={{ flexGrow: 1 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel>Moneda</FormLabel>
                <RadioGroup row name="coin" value={showCoin} onChange={(e) => setShowCoin(e.currentTarget.value as MonetaryInfoEnum)}>
                  <FormControlLabel value="document" control={<Radio />} label="Documento" />
                  <FormControlLabel value="origin" control={<Radio />} label="Origen" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {origenInputs}
            <Grid item xs={12}>
              <TextFieldEditable
                label="Monto del Documento"
                fullWidth
                variant="standard"
                canEdit={canEdit}
                value={mtoDocCtrl.field.value}
                onChange={mtoDocCtrl.field.onChange}
                InputProps={{
                  style: {
                    fontWeight: 600
                  }
                }}
              />

            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Moneda del Documento"
                fullWidth
                variant="standard"
                value={seatDetails?.cabdocumento.codmonedamtodoc}
                InputProps={{
                  readOnly: true,
                  style: {
                    fontWeight: 600
                  }
                }}
                
             />
            </Grid>
           
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}