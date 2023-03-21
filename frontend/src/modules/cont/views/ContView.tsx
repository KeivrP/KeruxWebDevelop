import { IconButton, Skeleton } from "@mui/material";
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
import { useNavigate } from "react-router-dom";



const formatNumber = (num: number) => {
  return num > 999 ? num.toLocaleString('es-ES', { minimumFractionDigits: 0 }) : num;
}



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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log(newPage)
    setPage(newPage);
  };
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = (description: string) => {
    if (description.length > 20 && !showFullDescription) {
      return `${description.substring(0, 20)}...`;
    } else {
      return description;
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [asiento, setAseinto] = useState<any[]>([])

  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getContAction({ page: page.toString(), per: rowsPerPage.toString() }))
  }, [page, rowsPerPage])
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
      {loadingSeat ? (
        <Skeleton variant="rounded" height={500} style={{ zIndex: 9999 }} />) : (
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
                      <span style={{ fontWeight: 'bold', color: "#090720" }}>
                        {values.iddoc}
                      </span>
                    </button>
                  )
                }

              },
              {
                key: 'descasiento',
                title: 'Descripción',
                render: (values: ISeat) => {
                  return (
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                      {renderDescription(values.descasiento)}
                      {values.descasiento.length > 20 && (
                        <IconButton size="small" style={{ marginLeft: 8 }} onClick={handleToggleDescription}>
                          {showFullDescription ? (
                            <ExpandIcon color="primary" style={{ fontSize: '1rem' }} />
                          ) : (
                            <ExpandIcon color="primary" style={{ fontSize: '1rem' }} />
                          )}
                        </IconButton>
                      )}
                    </span>
                  )
                },
                TableBodyCellProps: {
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
                },
                TableBodyCellProps: {
                  align: "center",

                }
              },
              {
                key: 'anocont',
                title: 'Año',
                TableBodyCellProps: {
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
                title: 'Período',
                TableBodyCellProps: {
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
                TableBodyCellProps: {
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
                title: 'Publicación',
                TableBodyCellProps: {
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

                render: (values: ISeat) => {
                  return (
                    <span style={{ fontWeight: 'bold', color: "#090720" }}>
                      {formatNumber(+values.dsp_MtoDoc)} Bs.
                    </span>
                  )
                },

                TableBodyCellProps: {
                  align: "right"
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
                title: 'Estatus',
                render: (values: ISeat) => {
                  return (
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                      {values.stsasiento === "REC" ? (
                        <>
                          <RecIcon sx={{ fontSize: "large" }} />
                        </>
                      ) : (
                        <>
                          <RchIcon sx={{ fontSize: "large" }} />
                        </>
                      )}
                    </span>
                  )
                },
                TableBodyCellProps: {
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
            PaginationProps={{
              page,
              count: 100,
              onPageChange: handleChangePage,
              rowsPerPage,
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
        </div>)}

    </>
  )
}