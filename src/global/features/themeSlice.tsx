import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLightTheme: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isLightTheme = !state.isLightTheme
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;