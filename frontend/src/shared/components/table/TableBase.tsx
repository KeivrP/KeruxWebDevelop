import { useMemo } from "react";
import { Table, TableBody, TableRow, TableCell, tableCellClasses, TableHead  } from "@mui/material"
import { ObjectAny } from "../../types/global.types";
import styled from "@emotion/styled";

const TableHeadCell = styled(TableCell)`
  background-color: #EEE;
  &.${tableCellClasses.head} {
    border: 1px solid rgba(224, 224, 224, 1); 
    &:nth-child(1) {
      border-left: 0px;
    }
    &:nth-child(n) {
      border-right: 0px;
    }
  }
`;

export interface TableColumn {
  key: string;
  title: string;
  render?: (values: any) => JSX.Element;
}

export interface TableBaseProps {
  columns: TableColumn[];
  data: ObjectAny[]
}

export const TableBase = ({
  columns,
  data
}: TableBaseProps) => {
  const headCells = useMemo(() =>
    columns.map(({ title, key }) => {
      return (
        <TableHeadCell key={key}>
          {title}
        </TableHeadCell>
      )  
    })
  , [columns]);

  const bodyRows = useMemo(() =>
    data.map((values, i) => {
      const content = columns.map(({ key, render }) => (
        <TableCell key={key}>
          {render ? render(values) : values[key]}
        </TableCell>
      ))
      return (
        <TableRow key={`table-row-${i+1}`}>
          {content}
        </TableRow>
      )
    })
  , [columns, data]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headCells}
        </TableRow>
      </TableHead>
      <TableBody>
        {bodyRows}
      </TableBody>
    </Table>
  )
}