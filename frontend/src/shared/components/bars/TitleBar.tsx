import { Box, BoxProps } from "@mui/material"

export interface TitleBarProps extends Omit<BoxProps, 'children' | 'sx'> { 
  children?: React.ReactNode,
  startIcon?: React.ReactNode
}

export const TitleBar = ({
  children,
  startIcon,
  ...restProps
}: TitleBarProps) => {
  return (
    <Box
      {...restProps}
      sx={{
          height: '48px',
          backgroundColor: '#0E0A2F',
          color: '#FFF',
          borderRadius: 1,
          padding: '5px 20px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '15px',
          fontWeight: 500,
      }}>
      {startIcon ?
        <span style={{ marginRight: '20px' }}>
          {startIcon}
        </span>
      : null}
      {children}
    </Box>
  );
};