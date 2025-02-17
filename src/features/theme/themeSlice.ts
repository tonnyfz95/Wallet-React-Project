// src/features/theme/themeSlice.ts
import { createSlice } from "@reduxjs/toolkit";

// Define el tipo ThemeState para el estado
type ThemeState = {
  theme: string;
};

// El valor predeterminado del tema
const initialState: ThemeState = {
  theme: "light", // El valor por defecto sigue siendo "light"
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
