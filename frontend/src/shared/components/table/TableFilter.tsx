import { useCallback, useMemo, useState } from "react"
import { 
  FilterList as FilterIcon, 
  Search as SearchIcon,
  Sort as SortIcon 
} from "@mui/icons-material"
import { 
  Grid,
  Button as MuiButton,
  styled,
  InputAdornment,
  InputBase,
  Menu,
  Box
} from "@mui/material"
import { FilterForm, IFilterOption } from "../forms/FilterForm"

const ButtonNoRadius = styled(MuiButton)(() => ({
  borderRadius: 0,
}))

export interface TableFilterProps {
  onApplyFilter: () => void;
  onApplySort: () => void;
  filterOptions: IFilterOption[];
  sortOptions: IFilterOption[];
}

export const TableFilter = ({
  onApplyFilter,
  onApplySort,
  filterOptions,
  sortOptions
}: TableFilterProps) => {
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLElement | null>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<HTMLElement | null>(null);

  const isOpenFilterMenu = useMemo(() =>
    Boolean(filterAnchorEl)
  , [filterAnchorEl]);

  const onOpenFilterMenu = useCallback((event: React.MouseEvent<HTMLElement>) =>
    setFilterAnchorEl(event.currentTarget)   
  ,[]);
  
  const onCloseFilterMenu = useCallback(() => {
    setFilterAnchorEl(null);
  }, []);

  const isOpenSortMenu = useMemo(() =>
    Boolean(sortAnchorEl)
  , [sortAnchorEl]);

  const onOpenSortMenu = useCallback((event: React.MouseEvent<HTMLElement>) =>
    setSortAnchorEl(event.currentTarget)   
  ,[]);
  
  const onCloseSortMenu = useCallback(() => {
    setSortAnchorEl(null);
  }, []);

  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={8} md={6} lg={4}>
        <InputBase 
          style={{ marginLeft: 20 }}
          placeholder="Buscar"
          fullWidth
          startAdornment={(
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          )}
        />
      </Grid>
      <Grid item>
        <ButtonNoRadius 
          startIcon={<FilterIcon />}
          variant="text"
          onClick={onOpenFilterMenu}>
          Filtrar 
        </ButtonNoRadius>
        <Menu
          open={isOpenFilterMenu}
          anchorEl={filterAnchorEl}
          onClose={onCloseFilterMenu}>
          <Box width="450px" padding="10px 20px">
            <FilterForm 
              onApply={onApplyFilter}
              onCancel={onCloseFilterMenu}
              options={filterOptions}
            />
          </Box>
        </Menu>
        <ButtonNoRadius 
          startIcon={<SortIcon />}
          variant="text"
          onClick={onOpenSortMenu}>
          Ordenar
        </ButtonNoRadius>
        <Menu
          open={isOpenSortMenu}
          anchorEl={sortAnchorEl}
          onClose={onCloseSortMenu}>
          <Box width="450px" padding="10px 20px">
            <FilterForm 
              onApply={onApplySort}
              onCancel={onCloseSortMenu}
              options={sortOptions}
            />
          </Box>
        </Menu>
      </Grid>
    </Grid>
  )
}