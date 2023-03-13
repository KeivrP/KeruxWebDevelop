import { Box, TablePagination } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import CustomTable from "../../../shared/components/table/CustomTable";
import Header from "../../../shared/layout/header";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { getContAction } from "../cont-actions";
import '../../../shared/layout/styles/styles.css'
import ButtonSearch from "../../../shared/components/button/ButtonSearch";
import { IconButtonMenu } from "../../../shared/components/button/IconButtonMenu";


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
    { id: 'd', label: 'Descripción', width: '200px' },
    { id: 'dsp_RefDoc', label: 'Referencia', width: '100px' },
    { id: 'cicty', label: 'Año', width: '100px' },
    { id: 'cdity', label: 'Período', width: '100px' },
    { id: 'cifty', label: 'Fecha', width: '100px' },
    { id: 'city', label: 'Publicación', width: '100px' },
    { id: 'name', label: 'Monto', width: '100px' },
    { id: 'city', label: 'Estatus', width: '100px' },
  ];

  const allRows = [
    { name: 'Juan', age: 30, city: 'Buenos Aires' },
    { name: 'Maria', age: 25, city: 'Madrid' },
    { name: 'Peter', age: 40, city: 'New York' },
    { name: 'Sara', age: 35, city: 'Berlin' },
  ];
  /* 
    const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) => value.toString().toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
    )
  ); */

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
          <ButtonSearch />
         
          {/*  <IconButtonMenu icon={mmmm} /> */}
        </Box>
        {seat && <CustomTable columns={columns} rows={seat} headerColumns={['iddoc']} maxChar={20} />}
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