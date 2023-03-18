import { AccountBalance as AccountBalanceIcon, AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { Box, Card, CardContent, Checkbox, FormControlLabel, Grid, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material";
import { TitleBar } from "../../../shared/components/bars/TitleBar";
import { CardWithBar } from "../../../shared/components/card/CardWithBar";
import DateInput from "../../../shared/components/inputs/DateInput";
import { TableBase } from "../../../shared/components/table/TableBase";
import { BranchIcon } from "../../../shared/icons/BranchIcon";
import { ExpandIcon } from "../../../shared/icons/ExpandIcon";
import { MonetaryIcon } from "../../../shared/icons/MonetaryIcon";

export const HeaderSeat = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item lg={6}>
            <TextField
              label="Descripcion"
              fullWidth
              size="small"
              variant="standard"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              label="Estatus"
              fullWidth
              size="small"
              variant="standard"
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
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item lg={2}></Grid>
          <Grid item lg={3}>
            <DateInput   
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

export const DocumentOrigin = () => {
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
              variant="standard">
              <MenuItem value="AN002">AN002</MenuItem>
            </TextField>
          </Grid>
          <Grid item lg={3}>
            <TextField
              label="Tipo"
              fullWidth
              size="small"
              variant="standard"
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
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item lg={2}>
            <FormControlLabel 
              control={
                <Checkbox color="error" defaultChecked />
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
            />
          </Grid>
          <Grid item lg={2}>
            <TextField
              label="id. Doc Ref" 
              fullWidth
              variant="standard"
              size="small"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item lg={2}>
            <TextField
              label="Referencia" 
              fullWidth
              variant="standard"
              size="small"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </CardWithBar>
  );
}

export const MonetaryInfo = () => {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <TitleBar startIcon={<MonetaryIcon fontSize="small" />} marginBottom="10px">
        Information Monetaria
      </TitleBar>
      <Card style={{ flexGrow: 1 }}>
        <CardContent>
          {/* FORM #2 */}
        </CardContent>
      </Card>
    </Box>
  )
}

export const MovimentsTable = () => {
  return (
    <TableBase 
      columns={[
        {
          key: 'n',
          title: 'N',
          TableHeadCellProps: {
            style: {
              border: 0,
            }
          },
          TableBodyCellProps: {
            style: {
              fontWeight: 600
            }
          }
        },
        {
          key: 'description',
          title: 'Descripcion',
          render: (values: any) => {
            return (
              <span style={{ display:'inline-flex', alignItems: 'center' }}>
                {values.description} 
                <IconButton size="small" style={{ marginLeft: 8 }}>
                  <ExpandIcon color="primary" style={{ fontSize: '1rem' }} />
                </IconButton>
              </span>
            )
          },
          TableHeadCellProps: {
            style: {
              border: 0,
            }
          }
        },
        {
          key: 'auxiliar',
          title: 'Auxiliar',
          TableHeadCellProps: {
            style: {
              border: 0,
            }
          }
        },
        {
          key: 'debit',
          title: 'Debito',
          TableHeadCellProps: {
            style: {
              border: 0,
            }
          }
        },
        {
          key: 'credit',
          title: 'Credito',
          TableHeadCellProps: {
            style: {
              border: 0,
            }
          }
        },
      ]}
      data={[
        {
          n: 'aja',
          description: 'Anticipo contractual CTTO...'
        }
      ]}
    />
  );
};

export const Moviments = () => {
  return (
    <CardWithBar 
      title="Movimientos"
      headerStartIcon={<AccountBalanceIcon fontSize="small" />}
    >
      <Grid container>
        <Grid item xs={12} lg={8} xl={9}>
          <MovimentsTable />
        </Grid>
        <Grid item xs={12} lg={4} xl={3}>
          <CardContent>
            <Typography>
              Moneda
            </Typography>
            {/* GRUPO DE BOTONES */}
          </CardContent>
        </Grid>
      </Grid>
    </CardWithBar>
  );
};

export const SeatDetails = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={7} xl={8}>
          <HeaderSeat />
          <br />
          <DocumentOrigin />
        </Grid>
        <Grid item xs={12} lg={5} xl={4}>
          <MonetaryInfo />
        </Grid>
        <Grid item xs={12}>
          <Moviments />
        </Grid>
      </Grid>
    </div>
  )
}

export const DashboardView = () => {

  return (
    <div style={{ paddingLeft: 10, paddingRight: 10 }}>
      <SeatDetails />
      {/* <DataTableAssientos asientos={[]} /> */}
    </div>
  );
};
