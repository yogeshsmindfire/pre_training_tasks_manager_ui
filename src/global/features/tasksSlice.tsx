import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: null,
  isFetching: false,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    loadTasksStart: (state) => {
      state.isFetching = true;
    },
    loadTasksEnd: (state) => {
      state.isFetching = false;
    },
    updateTasks: (state, action) => {
      state.tasks = action.payload;
      state.isFetching = false;
    },
  },
});

export const { updateTasks, loadTasksStart, loadTasksEnd } = tasksSlice.actions;
export default tasksSlice.reducer;
