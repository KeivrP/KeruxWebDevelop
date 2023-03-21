import { TableContainer, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { TableBase, TableBaseProps } from "./TableBase"
import { TableFilter, TableFilterProps } from "./TableFilter"
import { TablePagination, TablePaginationProps } from "./TablePagination"

export interface DataTableProps extends TableBaseProps {
  PaginationProps: Omit<TablePaginationProps, 'component'>,
  filters: TableFilterProps,
}

export const DataTable = ({
  data,
  columns,
  PaginationProps,
  filters
}: DataTableProps) => {
  return (
    <TableContainer component={Paper}>
      <TableFilter 
        onApplyFilter={filters.onApplyFilter}
        filterOptions={filters.filterOptions}
        onApplySort={filters.onApplyFilter}
        sortOptions={filters.sortOptions}
      />
      <TableBase 
        data={data}
        columns={columns}
      />
      <Box display="flex" justifyContent="flex-end">
        <TablePagination
          {...PaginationProps}
        />
      </Box>
    </TableContainer>
  )
}