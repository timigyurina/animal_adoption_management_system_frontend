import { useState, useMemo } from "react";
import ColorModeContext from "../../context/ColorModeContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === "light"
        ? {
            main: "#E2495B ",
            light: "#df606f ",
            dark: "#ec1f37 ",
            contrastText: "#F4ED6E  ",
          }
        : {
            main: "#fff",
            light: "#4d194d",
            dark: "#272640",
            contrastText: "#f1cef1",
          }),
    },
    secondary: {
      ...(mode === "light"
        ? {
            main: "#d8cc28",
            light: "#F4ED6E",
            dark: "#f4ed6e96",
            contrastText: "#7c000e",
          }
        : {
            main: "#fff",
            light: "#1b3a4b",
            dark: "#272640",
            contrastText: "#272640",
          }),
    },
    ternary: {
      ...(mode === "light"
        ? {
            main: "#84b960  ",
            light: "#90a955",
            dark: "#3d7236",
            contrastText: "#7c000e",
          }
        : {
            main: "#e2dada",
            light: "#144552",
            dark: "#144552",
            contrastText: "#3c97b1",
          }),
    },
    background: {
      ...(mode === "light"
        ? {
            default: "#F4ED6E",
            paper: "#FFFEE6",
            transparent: "#fffee68b",
            green: "#84b960",
          }
        : {
            default: "#000",
            paper: "#272640",
            transparent: "#27264094",
            green: "#18392b",
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
    [lightModeTheme, darkModeTheme]
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
