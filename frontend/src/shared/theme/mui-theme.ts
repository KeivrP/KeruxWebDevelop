import { createTheme, PaletteOptions, ThemeOptions } from "@mui/material/styles";
import { esES } from "@mui/material/locale";

interface MyPaletteOptions extends PaletteOptions {
  save: {
    main: string;
    light?: string;
    dark?: string;
  };
}

interface MyThemeOptions extends ThemeOptions {
  components?: {
    MuiTableRow?: {
      styleOverrides?: {
        root?: {
          height?: number;
        };
      };
    };
  };
}

export const muiTheme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "8px",
         // fontSize: "0.9rem",
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
    save: {
      main: '#3F51B5',
      light: '#757de8',
      dark: '#002984',
    },
    cancel: {
      main: '#3F51B5',
      light: '#757de8',
      dark: '#002984',
    },
    background: {
      default: "#F8F8FA",
    },
  } as MyPaletteOptions,
  // Asegurarse de usar MyPaletteOptions para extender la interfaz de PaletteOptions
} as MyThemeOptions);
