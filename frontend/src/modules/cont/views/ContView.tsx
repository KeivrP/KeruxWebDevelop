import { Box, Grid, TablePagination } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import CustomTable from "../../../shared/components/table/CustomTable";
import Header from "../../../shared/layout/header";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { getContAction } from "../cont-actions";
import '../../../shared/layout/styles/styles.css'
import ButtonSearch from "../../../shared/components/button/ButtonSearch";
import { IconButtonMenu } from "../../../shared/components/button/IconButtonMenu";
import FilterButton from "../../../shared/components/button/FilterButton";
import OrderButton from "../../../shared/components/button/OrderButton";

interface Filter {
  column: string;
  value: string;
}
export const ContView = () => {
  const seat = useAppSelector((state) => state.cont.seat)
  const loadingSeat = useAppSelector((state) => state.cont.loadingSeat)

  const dispatch = useAppDispatch();

  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const goBack = () => {
    // lógica del botón
  };

  useEffect(() => {
    dispatch(getContAction())

  }, [])


  const columns = [
    { id: 'iddoc', label: 'Id Doc.', width: '100px' },
    { id: 'descasiento', label: 'Descripción', width: '200px' },
    { id: 'refdoc', label: 'Referencia', width: '100px' },
    { id: 'anocont', label: 'Año', width: '60px' },
    { id: 'percont', label: 'Período', width: '80px' },
    { id: 'fecasiento', label: 'Fecha', width: '100px' },
    { id: 'numpublicacion', label: 'Publicación', width: '80px' },
    { id: 'name', label: 'Monto', width: '100px' },
    { id: 'stsasiento', label: 'Estatus', width: '100px' },
  ];
  const handleApplyFilters = (filters: Filter[]) => {
    // logic to apply filters
  };
  const headerColumns = columns.map(column => column.label);
  return (
    <>
      <Header headerTitle="Asientos por codificar" buttonAction={goBack} />
      <div className="my-div">
        <Box
          height={40} // Establece la altura en 100px
          bgcolor="#FFFFFF"
          border={1}
          borderColor="#FFFFFF"
          boxShadow={3}
          borderRadius={1}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <ButtonSearch />
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <FilterButton columns={headerColumns} onApplyFilter={handleApplyFilters} />
              <OrderButton columns={headerColumns} onApplyFilter={handleApplyFilters} />
            </Grid>
          </Grid>
        </Box>
        {!loadingSeat && <CustomTable columns={columns} rows={seat} headerColumns={['iddoc']} maxChar={20} />}
        <div className="my-pagination">
          <Box flex="1" />
          <Box>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 25, 50, 100]}
              labelRowsPerPage="Filas por página"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
          </Box>
        </div>

      </div>
      {/* {loadingSeat ? 'loading...' : null}
      <pre>
        {JSON.stringify(seat)}
      </pre> */}
    </>
  )
}