import { 
  Box, 
  Fab, 
  IconButton, 
  TableContainer,
  TextField,
  TableCell as MuiTableCell,
  tableCellClasses,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableFooter
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import styled from "@emotion/styled";

import { ExpandIcon } from "../../../shared/icons/ExpandIcon";
import { useAppSeat } from "../seats-hooks";
import { ISeatMoviment } from "../seats.-types";
import { useForm } from "react-hook-form";

const TableCell = styled(MuiTableCell)`
  &.${tableCellClasses.head} {
    background-color: #EEE;
    border: 1px solid rgba(224, 224, 224, 1); 
    border: 0px;
    &:nth-child(1) {
      border-left: 0px;
    }
    &:nth-child(n) {
      border-right: 0px;
    }
  }
  &.${tableCellClasses.body} {
    font-weight: 600;
  }
  &.${tableCellClasses.footer} {
    background-color: #EEE;
    font-weight: 600;
  }
`;

export interface MovimentTableRowProps {
  moviment: ISeatMoviment
  defaultEdit?: boolean
}

interface UpdateMovimentInput {
  codcuenta: string;
  codauxiliar: string;
  montodb: string;
  montocr: string;
}

export const MovimentTableRow = ({ 
  moviment,
  defaultEdit = false
}: MovimentTableRowProps) => {
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if(defaultEdit) {
      setIsEdit(true)
    }
  }, [defaultEdit]);

  const { reset, register, getValues } = useForm<UpdateMovimentInput>({
    defaultValues: {
      codauxiliar: '',
      codcuenta: '',
      montocr: '',
      montodb: ''
    }
  });

  const handleOnKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      const newValues = getValues();
      console.log('newValues', newValues);
      setIsEdit(false)
      // TODO: SAVE NEW DATA
    } else if(e.key === 'Escape') {
      setIsEdit(false)
    }
  }, [getValues])

  useEffect(() => {
    reset({
      codauxiliar: moviment.codauxiliar,
      codcuenta: moviment.codcuenta,
      montocr: moviment.montocr,
      montodb: moviment.montodb,
    })
  }, [reset, moviment, isEdit])

  return (
    <TableRow onDoubleClick={() => setIsEdit(true)}>
      <TableCell align="center">
        {moviment.nummov}
      </TableCell>
      <TableCell align="center">
        {!isEdit ? moviment.codcuenta : null}
        <div style={{ display: isEdit ? 'block' : 'none' }}>
          <TextField 
            {...register('codcuenta')}
            size="small"
            onKeyDown={handleOnKeyDown}
          />
        </div>
      </TableCell>
      <TableCell align="center">
        {!isEdit ? moviment.codauxiliar : null}
        <div style={{ display: isEdit ? 'block' : 'none' }}>
          <TextField 
            {...register('codauxiliar')}
            size="small"
            onKeyDown={handleOnKeyDown}
          />
        </div>
      </TableCell>
      <TableCell align="center">
        {!isEdit ? moviment.montodb : null}
        <div style={{ display: isEdit ? 'block' : 'none' }}>
          <TextField 
            {...register('montodb')}
            size="small"
            onKeyDown={handleOnKeyDown}
          />
        </div>
      </TableCell>
      <TableCell align="center">
        {!isEdit ? moviment.montocr : null}
        <div style={{ display: isEdit ? 'block' : 'none' }}>
          <TextField 
            {...register('montocr')}
            size="small"
            onKeyDown={handleOnKeyDown}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

export const MovimentsTable = () => {
  const { seatDetails } = useAppSeat();
  const [newMoviments, setNewMoviments] = useState<ISeatMoviment[]>([]);

  const addMoviment = useCallback(() => {
    setNewMoviments((prevState) => prevState.concat([{
      idasiento: 0,
      nummov: 0,
      anocont: 0,
      percont: 0,
      codcuenta: '',
      numpublicacion: 0,
      tipoauxiliar: '',
      codauxiliar: '',
      montodb: '',
      montocr: '',
      codmoneda: '',
      descmov: '',
      dsp_DesCtaPub: '',
      dsp_DescAuxiliar: null,
      dsp_CuentaPadre: '',
    }]))
  }, []);

  const tableBodyContent = useMemo(() => {
    if (!seatDetails) return null;
    return seatDetails.detasiento.map((moviment) => {
      return (
        <MovimentTableRow 
          moviment={moviment}
        />
      )
    })
  }, [seatDetails]);

  const tableBodyNewContent = useMemo(() => 
    newMoviments.map((mv) =>
      <MovimentTableRow
        defaultEdit
        moviment={mv}
      />
    )
  , [newMoviments]);

  return (
    <Box display="flex" flexDirection="column">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">N°</TableCell>
              <TableCell align="center">Descripcion</TableCell>
              <TableCell align="center">Auxiliar	</TableCell>
              <TableCell align="center">Debito</TableCell>
              <TableCell align="center">Credito</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableBodyContent}
            {tableBodyNewContent}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} />
              <TableCell align="center">
                Totales
              </TableCell>
              <TableCell align="center">
                48.000,00 Bs
              </TableCell>
              <TableCell align="center">
                72.000,00 Bs
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <Box 
          position="absolute"
          marginTop="-20px"
          marginLeft="20px">
          <Fab 
            size="medium" 
            color="error"
            onClick={addMoviment}>
            <AddIcon />
          </Fab> 
        </Box>
      </TableContainer>
    </Box> 
  );
};

/* <TableContainer
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
              render: (values: ISeatMoviment) => {
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
              },
              TableBodyCellProps: {
                align: 'center'
              }
            },
            {
              key: 'codauxiliar',
              title: 'Auxiliar',
              render: (values: ISeatMoviment) => {
                return (
                  <Box display="flex" flexDirection="column" minWidth="50px" minHeight="20px">
                    <FieldEditable 
                      value={values.codauxiliar} 
                      onChange={(newValue) => console.log('newValue', newValue)}
                    />
                  </Box>
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
          data={seatDetails?.detasiento || []}
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
                align: 'center',
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
        /> */