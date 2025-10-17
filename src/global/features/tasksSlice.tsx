import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: null,
  isFetching: false,
  hasFetchingFailed: false,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadTasksStart: (state) => {
      state.isFetching = true;
      state.hasFetchingFailed = false;
    },
    loadTasksEnd: (state) => {
      state.isFetching = false;
      state.hasFetchingFailed = false;
    },
    loadTaskFailed: (state) => {
      state.isFetching = false;
      state.hasFetchingFailed = true;
      state.tasks = state.tasks || null;
    },
    updateTasks: (state, action) => {
      state.tasks = action.payload;
      state.isFetching = false;
      state.hasFetchingFailed = false;
    },
  },
});

export const { updateTasks, loadTasksStart, loadTasksEnd, loadTaskFailed } =
  tasksSlice.actions;
export default tasksSlice.reducer;
