import { 
  Card, 
  CardContent,  
  Grid, 
  Skeleton, 
  TextField,
} from "@mui/material";
import moment from "moment";
import { useMemo } from "react";
import { Control, useController } from "react-hook-form";
import DateInput from "../../../shared/components/inputs/DateInput";
import { TextFieldEditable } from "../../../shared/components/inputs/TextFieldEditable";
import { useAppSeat } from "../seats-hooks";
import { canEditSeat } from "../seats-utils";
import { IUpdateSeatInput } from "../seats.-types";

export interface HeaderSeatProps {
  control: Control<IUpdateSeatInput, any>
}

export const HeaderSeat = ({
  control
}: HeaderSeatProps) => {
  const { seatDetails, loadingSeatDetails } = useAppSeat()
  const descriptionCtrl = useController({ name: 'cabasiento.descasiento', control  });
  const dateCtrl = useController({ name: 'cabasiento.fecasiento', control  });

  const canEdit = useMemo(() => 
    seatDetails ? canEditSeat(seatDetails) : false
  , [seatDetails])

  if (loadingSeatDetails) return (
    <Skeleton variant="rounded" height={150} />
  )

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item lg={6}>
            <TextFieldEditable
              label="Descripcion"
              fullWidth
              size="small"
              variant="standard"
              value={descriptionCtrl.field.value}
              onChange={descriptionCtrl.field.onChange}
              canEdit={canEdit}
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              label="Estatus"
              fullWidth
              size="small"
              variant="standard"
              value={seatDetails?.cabasiento.stsasiento}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item lg={1}>
            <TextField
              label="Publicacion"
              fullWidth
              size="small"
              variant="standard"
              value={seatDetails?.cabasiento.numpublicacion}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item lg={1}>
            <TextField
              label="Numero"
              fullWidth
              size="small"
              variant="standard"
              value={seatDetails?.cabasiento.numasiento}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item lg={1}>
            <TextField
              label="Tipo"
              fullWidth
              size="small"
              variant="standard"
              value={seatDetails?.cabasiento.tipoasiento}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item lg={1}>
            <TextField
              label="Periodo"
              fullWidth
              size="small"
              variant="standard"
              value={seatDetails?.cabasiento.percont}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item lg={1}>
            <TextField
              label="Año"
              fullWidth
              size="small"
              variant="standard"
              value={seatDetails?.cabasiento.anocont}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item lg={2}></Grid>
          <Grid item lg={3}>
            <DateInput
              onChange={(newMoment) => {
                console.log('newMoment', newMoment);
                if (newMoment) {
                  dateCtrl.field.onChange(newMoment.format('DD/MM/YYYY'))
                } else {
                  dateCtrl.field.onChange(null);
                }
              }}
              value={dateCtrl.field.value ? moment(dateCtrl.field.value) : undefined}
              slots={{
                textField: (params) => (
                  <TextField
                    {...params}
                    label="Fecha de Asiento"
                    fullWidth
                    size="small"
                    variant="standard"
                  />
                )
              }}
            />
          </Grid>
          <Grid item lg={2}></Grid>
          <Grid item lg={3}>
            <TextField
              label="Fecha de Documento"
              fullWidth
              size="small"
              variant="standard"
              value={seatDetails?.cabdocumento.fecdoc}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
