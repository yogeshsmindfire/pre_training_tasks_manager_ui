import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import tasksReducer from './features/tasksSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    tasks: tasksReducer,
    user: userReducer,
  },
});