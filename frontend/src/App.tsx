import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Router } from "./Router";
import { muiTheme } from "./shared/theme/mui-theme";
import { store } from "./store";
import styled from "@emotion/styled";

// Se define un componente estilizado para el rectángulo con Emotion Styled Components
const StyledDiv = styled.div`
  position: absolute;
  width: 64px;
  height: 100%;
  left: 0;
  top: 0;
  background-color: ${muiTheme.palette.primary.main};
`;

// Se define un componente estilizado para contener la aplicación y evitar que se tape con el rectángulo
const AppContainer = styled.div`
  margin-left: 64px;
  max-width: calc(100vw - 64px);
  height: 100%;
`;

// Componente principal de la aplicación
export const Application = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <StyledDiv />{/*  Componente que representa el rectángulo  */}
        <AppContainer> {/* Componente que contiene el enrutador y la aplicación */}
          <BrowserRouter>
            <Box sx={{ marginTop: '151px' }}>
              <Router />
            </Box>
          </BrowserRouter>
        </AppContainer>
      </ThemeProvider>
    </Provider>
  );
};
