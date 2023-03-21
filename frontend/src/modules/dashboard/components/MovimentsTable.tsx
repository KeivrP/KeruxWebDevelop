import { 
  Box, 
  Fab, 
  IconButton, 
  TableContainer,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TableBase } from "../../../shared/components/table/TableBase";
import { ExpandIcon } from "../../../shared/icons/ExpandIcon";
import { useAppSeat } from "../seats-hooks";
import { ISeatMoviment } from "../seats.-types";
import AddIcon from '@mui/icons-material/Add';



export const MovimentsTable = () => {
  const { loadingSeatValidate, seatDetails } = useAppSeat();
  const [detalleMov, setDetalleMov] = useState<ISeatMoviment[]>([]);

  useEffect(()=>{
    if(seatDetails != null){
      setDetalleMov(seatDetails.detasiento)
    }
  },[seatDetails])


  return (
    <Box display="flex" flexDirection="column">
      <TableContainer
        height="100%"
        component={Box}>
        <TableBase 
          columns={[
            {
              key: 'nummov',
              title: 'N°',
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              },
              TableBodyCellProps: {
                align: "center",
                style: {
                  fontWeight: 600
                }
              }
            },
            {
              key: 'codcuenta',
              title: 'Descripcion',
              render: (values: any) => {
                return (
                  <span style={{ display:'inline-flex', alignItems: 'center' }}>
                    {values.codcuenta} 
                    <IconButton size="small" style={{ marginLeft: 8 }}>
                      <ExpandIcon color="primary" style={{ fontSize: '1rem' }} />
                    </IconButton>
                  </span>
                )
              },
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              }
            },
            {
              key: 'codauxiliar',
              title: 'Auxiliar',
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              }
            },
            {
              key: 'montodb',
              title: 'Debito',
              TableBodyCellProps: {
                align: "center",
              },
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              }
            },
            {
              key: 'montocr',
              title: 'Credito',
              TableBodyCellProps: {
                align: "center",
              },
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              }
            },
          ]}
          data={detalleMov}
          footerColumns={[
            {
              TableCellProps: {
                style: {
                  fontWeight: 600,
                  backgroundColor: '#EEE'
                },
                colSpan: 2
              },
              value: ''
            },
            {
              TableCellProps: {
                style: {
                  fontWeight: 600,
                  backgroundColor: '#EEE'
                },
              },
              value: 'Totales',
            },
            {
              TableCellProps: {
                style: {
                  fontWeight: 600,
                  backgroundColor: '#EEE'
                },
              },
              value: '48.000,00 Bs',
            },

            {
              TableCellProps: {
                style: {
                  fontWeight: 600,
                  backgroundColor: '#EEE'
                },
              },
              value: '72.000,00 Bs',
            }
          ]}
        />
      <div style={{ position: 'absolute', /* bottom:10, left: 20 */ }}>
                    <Fab size="medium" sx={{backgroundColor:"#C72747"}} aria-label="add">
                        <AddIcon sx={{color:"#FFF"}}/>
                    </Fab>
                
            </div>
      </TableContainer>
      <Box bgcolor="#EEE">
        
      </Box>
    </Box> 
  );
};