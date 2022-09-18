import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const STATE_KEY = "theme";

type ThemeVariant = "light" | "dark";

export type ThemeState = {
  variant: ThemeVariant | null;
};

const initialState: ThemeState = {
  variant: null,
};

export const themeSlice = createSlice({
  name: STATE_KEY,
  initialState: initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<ThemeVariant>) => {
      state.variant = action.payload;
    },
  },
});
