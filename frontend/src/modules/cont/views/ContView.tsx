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
import { DataTable } from "../../../shared/components/table/DataTable";
import { ISeat } from "../../dashboard/seats.-types";

interface Filter {
  column: string;
  value: string;
}

export interface DataTableContSeat {
  asientos?: ISeat[]
}

export const ContView= ({
  asientos
}: DataTableContSeat) => {
  const seat = useAppSelector((state) => state.cont.seat)
  const loadingSeat = useAppSelector((state) => state.cont.loadingSeat)
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const [asiento, setAseinto] = useState<any[]>([])

  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getContAction())
  }, [])

  useEffect(()=>{
    if(seat != null){
      setAseinto(seat)
    }
  },[seat])

  const handleRowClick = (index: number) => {
    setSelectedRowIndex(index);
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
            render: (values: ISeat) => {
              return (
                <span style={{ fontWeight: 'bold' }}>
                  {values.iddoc}
                </span>
              )
            }
          },
          {
            key: 'descasiento',
            title: 'Description',
          },
          {
            key: 'refdoc',
            title: 'Referencia',
          },
          {
            key: 'anocont',
            title: 'Año',
          },
          {
            key: 'percont',
            title: 'Periodo',
          },
          {
            key: 'fecasiento',
            title: 'Fecha',
          },
          {
            key: 'numpublicacion',
            title: 'Publicacion',
          },
          {
            key: 'amount',
            title: 'Monto',
          },
          {
            key: 'stsasiento',
            title: 'Status',
          },
        ]}
        //onRowClick={handleRowClick}
        data={asiento}
        pagination={{
          page: 1,
          count: 100,
          onPageChange: () => {},
          rowsPerPage: 10,
        }}
        filters={{
          onApplyFilter: () => {},
          onApplySort: () => {},
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