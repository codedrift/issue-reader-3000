import { createTheme } from "@mui/material";

export const themeLight = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#212121",
      contrastText: "#FFFFFF",
    },
  },
});


export const themeDark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
      contrastText: "#FFFFFF",
    },
  },
});