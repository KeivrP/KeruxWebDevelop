import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Tooltip,
  TextField,
} from '@mui/material';
import '../../layout/styles/styles.css';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


interface TableColumn {
  id: string;
  label: string;
  width: string;
}

interface TableRowData {
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  rows: TableRowData[];
  headerColumns: string[];
  maxChar?: number;
}

const CustomTable: React.FC<TableProps> = (props) => {
  const { columns, rows, headerColumns, maxChar } = props;

  //Funcion para reducir el tamano de los valore recibidos
  const sliceCellText = (text: string) => {
    if (maxChar && text && text.length > maxChar) {
      return text.slice(0, maxChar) + '...';
    }
    return text;
  };

  //Funcion para filtrar

  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (columnId: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [columnId]: value }));
  };

  // Funcion para ordenar por columna 

  const [sort, setSort] = useState<{ columnId: string; direction: 'asc' | 'desc' } | null>(null);



  return (
    <TableContainer component={Paper}>
      <span>


      </span>
      <div className="table-container">
        <Table>
          <TableHead>
            <TableRow className="table-head">

              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  className="table-cell"
                  style={{ width: column.width, textAlign: "center", color: "#6E6E6E" }}
                  onClick={() => {
                    if (sort && sort.columnId === column.id) {
                      // Si la misma columna se ha seleccionado de nuevo, cambiar la dirección de ordenamiento
                      setSort({ ...sort, direction: sort.direction === "asc" ? "desc" : "asc" });
                    } else {
                      // Si se selecciona una nueva columna, establecer la dirección de ordenamiento en ascendente
                      setSort({ columnId: column.id, direction: "asc" });
                    }
                  }}
                >
                  {/*   <div className="filter-input-container">
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder={`Filter by ${column.label}`}
                      value={filterValues[column.id] || ""}
                      onChange={(event) => handleFilterChange(column.id, event.target.value)}
                    />
                  </div> */}
                  {sort && sort.columnId === column.id && (
                     <div>
                     <ArrowUpwardIcon fontSize="inherit" color={sort.direction === "asc" ? "primary" : "disabled"} />
                     <ArrowDownwardIcon fontSize="inherit" color={sort.direction === "desc" ? "primary" : "disabled"} />
                   </div>
                  )}
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {rows && Array.isArray(rows) && rows.length > 0 && [...rows]
              .sort((row1, row2) => {
                if (!sort) {
                  // Si no hay una columna seleccionada, no hay ordenamiento
                  return 0;
                }
                const value1 = row1[sort.columnId];
                const value2 = row2[sort.columnId];
                if (value1 < value2) {
                  return sort.direction === "asc" ? -1 : 1;
                } else if (value1 > value2) {
                  return sort.direction === "asc" ? 1 : -1;
                } else {
                  return 0;
                }
              }).map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column.id}  /* className="table-cell" */>
                      {headerColumns.includes(column.id) ? (
                        <Tooltip title={row[column.id]}>
                          <Typography variant="h3" color="primary.dark">{sliceCellText(row[column.id])}</Typography>
                        </Tooltip>
                      ) : (
                        <Tooltip title={row[column.id]}>
                          <Typography variant="body1" color="primary.light">{sliceCellText(row[column.id])}</Typography>
                        </Tooltip>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
};

export default CustomTable;
