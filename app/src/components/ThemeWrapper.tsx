import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { themeSlice } from "../redux/slices/theme.slice";
import { themeDark, themeLight } from "../style";

type ThemeWrapperProps = PropsWithChildren;

export const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const { variant } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(themeSlice.actions.updateTheme("light"));
  }, [dispatch]);

  const theme = useMemo(() => {
    switch (variant) {
      case "light":
        return themeLight;
      case "dark":
        return themeDark;
    }
  }, [variant]);

  if (!theme) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
