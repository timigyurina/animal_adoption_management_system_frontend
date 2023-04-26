import { useState, useMemo } from "react";
import ColorModeContext from "./ColorModeContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red, grey, green } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === "light"
        ? {
            main: red[500],
            light: red[200],
            dark: red[800],
            contrastText: grey[900],
          }
        : {
            main: "#fff",
            light: grey[200],
            dark: grey[800],
            contrastText: grey[900],
          }),
    },
    secondary: {
      ...(mode === "light"
        ? {
            main: green[500],
            light: green[200],
            dark: green[800],
            contrastText: grey[900],
          }
        : {
            main: "#fff",
            light: grey[200],
            dark: grey[800],
            contrastText: grey[900],
          }),
    },
    background: {
      ...(mode === "light"
        ? {
            default: green[500],
            paper: green[200],
          }
        : {
            default: "#000",
            paper: grey[600],
          }),
    },
    text: {
      ...(mode === "light"
        ? {
            primary: grey[900],
            secondary: grey[900],
          }
        : {
            primary: "#fff",
            secondary: grey[500],
          }),
    },
  },
});

export default function ToggleColorMode({ children }) {
  const lightModeTheme = createTheme(getDesignTokens("light"));
  const darkModeTheme = createTheme(getDesignTokens("dark"));
  const [mode, setMode] = useState(lightModeTheme);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === lightModeTheme ? darkModeTheme : lightModeTheme
        );
      },
    }),
    []
  );

  const Theme = useMemo(() => createTheme(mode), [mode]);
  Theme.typography.h6 = {
    fontSize: "1rem",
    fontWeight: 600,
    "@media (min-width:700px)": {
      fontSize: "1.2rem",
    },
    "@media (min-width:900px)": {
      fontSize: "1.3rem",
    },
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
