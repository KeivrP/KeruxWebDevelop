import { 
  Box, 
  IconButton, 
  TableContainer,
} from "@mui/material";
import { TableBase } from "../../../shared/components/table/TableBase";
import { ExpandIcon } from "../../../shared/icons/ExpandIcon";


export const MovimentsTable = () => {
  return (
    <Box display="flex" flexDirection="column">
      <TableContainer
        height="100%"
        component={Box}>
        <TableBase 
          columns={[
            {
              key: 'n',
              title: 'N',
              TableHeadCellProps: {
                align: "center",
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
                align: "center",
                style: {
                  border: 0,
                }
              }
            },
            {
              key: 'auxiliar',
              title: 'Auxiliar',
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              }
            },
            {
              key: 'debit',
              title: 'Debito',
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              }
            },
            {
              key: 'credit',
              title: 'Credito',
              TableHeadCellProps: {
                align: "center",
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
      </TableContainer>
      <Box bgcolor="#EEE">
        
      </Box>
    </Box> 
  );
};