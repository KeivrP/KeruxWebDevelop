import { DataTable } from "../../../shared/components/table/DataTable";

interface ISeat {
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

export interface DataTableAssientosProps {
  asientos: ISeat[]
}

export const DataTableAssientos = ({
  asientos
}: DataTableAssientosProps) => {
  return (
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
  );
};
