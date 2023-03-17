import { 
  TablePagination as MuiTablePagination,
  TablePaginationProps as MuiTablePaginationProps
} from "@mui/material";

export interface TablePaginationProps extends Omit<MuiTablePaginationProps, 'labelRowsPerPage'| 'labelRowsPerPage' | 'labelDisplayedRows'> {
  
}

export const TablePagination = (props: TablePaginationProps) => {
  return (
    <MuiTablePagination
      {...props}
      component="div"
      rowsPerPageOptions={[10, 25, 50, 100]}
      labelRowsPerPage="Filas por página"
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
    />
  )
}