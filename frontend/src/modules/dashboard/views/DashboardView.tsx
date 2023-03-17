import { Container } from "@mui/material";
import { useState } from "react";
import { DataTable } from "../../../shared/components/table/DataTable";

interface IAsientoContable {
  iddoc: number;
  descasiento: string;
  refdoc: string;
  anocont: number;
  percont: number;
  fecasiento: string;
  numpublicacion: number;
  stsasiento: string;
  raw_rnum_: number;
  idasiento?: any;
}



export const DashboardView = () => {
  const [asientos] = useState<IAsientoContable[]>([
    {
      iddoc: 4514,
      descasiento: 'PRUEBA DE DEFECTO 4517',
      refdoc: 'D4517',
      anocont: 2009,
      percont: 6,
      fecasiento: '2009-06-17',
      numpublicacion: 1,
      stsasiento: 'RCH',
      raw_rnum_: 1,
      idasiento: null
    },
    {
      iddoc: 3603,
      descasiento: 'DEPOSITO PARA APERTURAR CUENTA BANCARIA',
      refdoc: '000100200',
      anocont: 2008,
      percont: 12,
      fecasiento: '2008-12-31',
      numpublicacion: 1,
      stsasiento: 'RCH',
      raw_rnum_: 2,
      idasiento: null
    },
    {
      iddoc: 6626,
      descasiento: 'DEPOSITO PARA APERTURA DE CUENTA MORELIA',
      refdoc: '123',
      anocont: 2011,
      percont: 7,
      fecasiento: '2011-07-29',
      numpublicacion: 1,
      stsasiento: 'RCH',
      raw_rnum_: 3,
      idasiento: null
    },
    {
      iddoc: 6106,
      descasiento: 'PAGO: Prueba de LOG, COMP, PPTO',
      refdoc: '5',
      anocont: 2013,
      percont: 1,
      fecasiento: '2013-01-31',
      numpublicacion: 1,
      stsasiento: 'RCH',
      raw_rnum_: 4,
      idasiento: null
    },
    {
      iddoc: 6790,
      descasiento: 'DEPOSITO APERTURA DE CUENTA',
      refdoc: 'DPE JB',
      anocont: 2013,
      percont: 1,
      fecasiento: '2013-01-05',
      numpublicacion: 1,
      stsasiento: 'RCH',
      raw_rnum_: 5,
      idasiento: null
    },
    {
      iddoc: 9151,
      descasiento: 'PAGO: induccion kerux',
      refdoc: '107',
      anocont: 2015,
      percont: 9,
      fecasiento: '2015-09-30',
      numpublicacion: 1,
      stsasiento: 'RCH',
      raw_rnum_: 6,
      idasiento: null
    },
    {
      iddoc: 9378,
      descasiento: 'PAGO: PRUEBA EJECUCION FONDO DE ANTICIPOS',
      refdoc: '585858',
      anocont: 2016,
      percont: 6,
      fecasiento: '2016-06-07',
      numpublicacion: 1,
      stsasiento: 'RCH',
      raw_rnum_: 7,
      idasiento: null
    },
    {
      iddoc: 9378,
      descasiento: 'PAGO: PRUEBA EJECUCION FONDO DE ANTICIPOS',
      refdoc: '585858',
      anocont: 2016,
      percont: 6,
      fecasiento: '2016-06-07',
      numpublicacion: 2,
      stsasiento: 'RCH',
      raw_rnum_: 8,
      idasiento: null
    },
    {
      iddoc: 9384,
      descasiento: 'PAGO: PRUEBA EJECUCION DE FA',
      refdoc: '442525',
      anocont: 2016,
      percont: 6,
      fecasiento: '2016-06-07',
      numpublicacion: 1,
      stsasiento: 'RCH',
      raw_rnum_: 9,
      idasiento: null
    },
    {
      iddoc: 8949,
      descasiento: 'PAPEL ROTO',
      refdoc: '103',
      anocont: 2013,
      percont: 12,
      fecasiento: '2013-12-31',
      numpublicacion: 1,
      stsasiento: 'RCH',
      raw_rnum_: 10,
      idasiento: null
    }
  ])

  return (
    <Container>
      <DataTable 
        columns={[
          { 
            key: 'id', 
            title: 'Id Doc',
            render: (values: IAsientoContable) => {
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
        data={asientos}
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
    </Container>
  );
};
