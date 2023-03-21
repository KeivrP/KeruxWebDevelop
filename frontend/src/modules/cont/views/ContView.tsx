import {IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../shared/layout/header";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { getContAction } from "../cont-actions";
import '../../../shared/layout/styles/styles.css'
import { DataTable } from "../../../shared/components/table/DataTable";
import { ISeat } from "../../dashboard/seats.-types";
import { ExpandIcon } from "../../../shared/icons/ExpandIcon";
import { RecIcon } from "../../../shared/icons/RecIcon";
import { RchIcon } from "../../../shared/icons/RchIcon";
import {  useNavigate } from "react-router-dom";


interface Filter {
  column: string;
  value: string;
}

export interface DataTableContSeat {
  asientos?: ISeat[]
}

export const ContView = ({
  asientos
}: DataTableContSeat) => {
  const seat = useAppSelector((state) => state.cont.seat)
  const loadingSeat = useAppSelector((state) => state.cont.loadingSeat)
  const navigate = useNavigate();

  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log(newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    console.log(parseInt(event.target.value, 10))
    setPage(0);
  };

  const [asiento, setAseinto] = useState<any[]>([])

  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getContAction())
  }, [])

  useEffect(() => {
    if (seat != null) {
      setAseinto(seat)
    }
  }, [seat])

  const handleRowClick = (index: number) => {
    navigate(`seat/${index}`)
  };



  return (
    <>
      <Header headerTitle="Asientos por codificar" /* buttonAction={goBack} */ />
      <div className="my-div">
        <DataTable
           columns={[
            {
              key: 'id',
              title: 'Id Doc',
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              },
              render: (values: ISeat) => {
                return (
                  <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => handleRowClick(values.idasiento)}>
                  <span style={{ fontWeight: 'bold' }}>
                    {values.iddoc}
                  </span>
                </button>
                )
              }

            },
            {
              key: 'descasiento',
              title: 'Description',
              render: (values: ISeat) => {
                return (
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    {values.descasiento}
                    <IconButton size="small" style={{ marginLeft: 8 }}>
                      <ExpandIcon color="primary" style={{ fontSize: '1rem' }} />
                    </IconButton>
                  </span>
                )
              },
              TableBodyCellProps:{
                align: "center"
              },
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              }
            },
            {
              key: 'refdoc',
              title: 'Referencia',
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              }
            },
            {
              key: 'anocont',
              title: 'Año',
              TableBodyCellProps:{
                align: "center"
              },
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              }
            },
            {
              key: 'percont',
              title: 'Periodo',
              TableBodyCellProps:{
                align: "center"
              },
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              }
            },
            {
              key: 'fecasiento',
              title: 'Fecha',
              TableBodyCellProps:{
                align: "center"
              },
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              }
            },
            {
              key: 'numpublicacion',
              title: 'Publicacion',
              TableBodyCellProps:{
                align: "center"
              },
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              }
            },
            {
              key: 'dsp_MtoDoc',
              title: 'Monto',
              TableBodyCellProps:{
                align: "center"
              },
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              }
            },
            {
              key: 'stsasiento',
              title: 'Status',
              render: (values: ISeat) => {
                return (
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    {values.stsasiento === "REC" ? (
                      <>
                       <RecIcon sx={{fontSize: "large"}} />
                      </>
                    ) : (
                      <>
                        <RchIcon />
                      </>
                    )}
                  </span>
                )
              },
              TableBodyCellProps:{
                align: "center"
              },
              TableHeadCellProps: {
                align: "center",
                style: {
                  border: 0,
                }
              }
            },
           ]}
          //onRowClick={handleRowClick}
          data={asiento}
          pagination={{
            page: 1,
            count: 100,
            onPageChange: handleChangePage,
            rowsPerPage: 1,
            onRowsPerPageChange: handleChangeRowsPerPage

          }}
          filters={{
            onApplyFilter: () => { },
            onApplySort: () => { },
            filterOptions: [
              {
                label: 'Id Doc',
                value: 'id',
              },
              {
                label: 'Description',
                value: 'descasiento',
              },
              {
                label: 'Referencia',
                value: 'refdoc',
              },
              {
                label: 'Año',
                value: 'anocont',
              },
              {
                label: 'Periodo',
                value: 'percont',
              },
              {
                label: 'Fecha',
                value: 'fecasiento',
              },
              {
                label: 'Publicacion',
                value: 'numpublicacion',
              },
              {
                label: 'Monto',
                value: 'amount',
              },
              {
                label: 'Status',
                value: 'stsasiento',
              },
            ],
            sortOptions: [
              {
                label: 'Id Doc',
                value: 'id',
              },
              {
                label: 'Description',
                value: 'descasiento',
              },
              {
                label: 'Referencia',
                value: 'refdoc',
              },
              {
                label: 'Año',
                value: 'anocont',
              },
              {
                label: 'Periodo',
                value: 'percont',
              },
              {
                label: 'Fecha',
                value: 'fecasiento',
              },
              {
                label: 'Publicacion',
                value: 'numpublicacion',
              },
              {
                label: 'Monto',
                value: 'amount',
              },
              {
                label: 'Status',
                value: 'stsasiento',
              },
            ],
      }}

        />
      </div>
      {/* {loadingSeat ? 'loading...' : null}
      <pre>
        {JSON.stringify(seat)}
      </pre> */}
    </>
  )
}