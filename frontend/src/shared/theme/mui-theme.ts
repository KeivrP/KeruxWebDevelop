import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#767676',
        },
        root: {
          padding: "8px",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: 10, // Ajusta el alto aquí según lo que necesites
        },
      },
    },
  },
  typography: {
    fontFamily: 'Poppins',
    h1: {
      fontSize: "30px",
      fontWeight: 500,
      lineHeight: "45px",
    },
    h3: {
      fontSize: "15px",
      fontWeight: 600,
      lineHeight: "22px",
    },
    h4: {
      fontSize: "15px",
      fontWeight: 500,
      lineHeight: "22px",
    },
    body1: {
      fontSize: "15px",
      fontWeight: 300,
      lineHeight: "22px",
    },
    caption: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "16px",
    },
  },
  palette: {
    primary: {
      main: '#0E0A2F',
      light: '#3e3b58',
      dark: '#090720',
    },
    secondary: {
      main: '#BF082D',
      light: '#85051f',
      dark: '#cb3957',
    },
    background: {
      default: "#F8F8FA",
    },
  },
  // Asegurarse de usar MyPaletteOptions para extender la interfaz de PaletteOptions
});
