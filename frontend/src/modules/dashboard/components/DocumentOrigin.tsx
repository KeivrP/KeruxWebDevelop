import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { 
  Box,
  CardContent, 
  Checkbox, 
  FormControlLabel, 
  Grid,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import { useMemo } from "react";
import { Control, useController } from "react-hook-form";
import { CardWithBar } from "../../../shared/components/card/CardWithBar";
import { TextFieldEditable } from "../../../shared/components/inputs/TextFieldEditable";
import { BranchIcon } from "../../../shared/icons/BranchIcon";
import { useAppSeat } from "../seats-hooks";
import { canEditSeat } from "../seats-utils";
import { IUpdateSeatInput, SeatReversoEnum } from "../seats.-types";

export interface DocumentOriginProps {
  control: Control<IUpdateSeatInput, any>
}
export const DocumentOrigin = ({
  control
}: DocumentOriginProps) => {
  const { seatDetails, loadingSeatDetails } = useAppSeat();
  const tipoDocCtrl = useController({ 
    name: 'cabdocumento.tipodoc', 
    control
   })
  const indReversoCtrl = useController({
    name: 'cabdocumento.indreverso',
    control
  });
  const nombreNefCtrl = useController({
    name: 'cabdocumento.dsp_nombrebenef',
    control
  });
  const idDocRefCtrl = useController({
    name: 'cabdocumento.iddocref',
    control
  });
  const refDocCtrl = useController({
    name: 'cabdocumento.refdoc',
    control
  });

  const canEdit = useMemo(() => 
    seatDetails ? canEditSeat(seatDetails) : false
  , [seatDetails])

  if (loadingSeatDetails) return (
    <Skeleton variant="rounded" height={150} />
  )

  return (
    <CardWithBar 
      title="Documento de origen"
      headerStartIcon={<BranchIcon fontSize="small" />}
      >
      <CardContent>
        <Grid container alignItems="flex-end" spacing={3}>
          <Grid item lg={1}>
            <TextField
              label="id Doc"
              fullWidth
              size="small"
              variant="standard"
              value={seatDetails?.cabdocumento.iddoc}
              InputProps={{
                readOnly: true 
              }}
            />

          </Grid>
          <Grid item lg={2}>
            <TextField
              select
              label="Tipo"
              fullWidth
              value={tipoDocCtrl.field.value}
              onChange={tipoDocCtrl.field.onChange}
              variant="standard"
              InputProps={{
                readOnly: !canEdit,
              }}>
              <MenuItem value="AN002">AN002</MenuItem>
              <MenuItem value="ACI01">ACI01</MenuItem>
              <MenuItem value="AIN01">AIN01</MenuItem>
            </TextField>
          </Grid>
          <Grid item lg={3}>
            <TextField
              label="Tipo"
              fullWidth
              size="small"
              variant="standard"
              value={seatDetails?.cabdocumento.dsp_desctipodoc}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item lg={2}>
            <TextField
              label="Envio"
              fullWidth
              size="small"
              variant="standard"
              value={seatDetails?.cabasiento.orgasiento}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item lg={2}>
            <TextField 
              label="Origen"
              fullWidth
              size="small"
              variant="standard"
              value={seatDetails?.cabdocumento.origen}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item lg={2}>
            <FormControlLabel 
              control={
                <Checkbox 
                  color="error"
                  checked={indReversoCtrl.field.value === SeatReversoEnum.true}
                  onChange={(e) => {
                    indReversoCtrl.field.onChange(
                      e.currentTarget.checked
                        ? SeatReversoEnum.true
                        : SeatReversoEnum.false
                    )
                  }} 
                />
              } 
              label="Reverso" 
            />
          </Grid>
          <Grid item lg={3}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircleIcon color="primary" sx={{ mr: 1, my: 0.5 }} />
              <TextField
                label="Rif/Cedula" 
                fullWidth
                variant="standard"
                size="small"
                value={seatDetails?.cabdocumento.rifbenef}
                InputProps={{
                  readOnly: true
                }}
              />

            </Box>
          </Grid>
          <Grid item lg={5}>
            <TextField
              label="Beneficiario" 
              fullWidth
              variant="standard"
              size="small"
              select
              value={nombreNefCtrl.field.value}
              onChange={nombreNefCtrl.field.onChange}
              InputProps={{
                readOnly: !canEdit
              }}
            >
             <MenuItem value="SENIAT">SENIAT</MenuItem> 
             <MenuItem value="KENTRON SISTEMAS DE INFORMACION CR C.A.">KENTRON SISTEMAS DE INFORMACION CR C.A.</MenuItem> 
          </TextField>
          </Grid>
          <Grid item lg={2}>
            <TextFieldEditable
              label="id. Doc Ref" 
              fullWidth
              variant="standard"
              size="small"
              canEdit={canEdit}
              value={idDocRefCtrl.field.value}
              onChange={idDocRefCtrl.field.onChange}
            />
          </Grid>
          <Grid item lg={2}>
            <TextFieldEditable
              label="Referencia" 
              fullWidth
              variant="standard"
              size="small"
              value={refDocCtrl.field.value}
              canEdit={canEdit}
              onChange={refDocCtrl.field.onChange}
            />
          </Grid>
        </Grid>
      </CardContent>
    </CardWithBar>
  );
}