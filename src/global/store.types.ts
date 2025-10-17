export type ThemeState = {
  isLightTheme: boolean;
};

export type UserState = {
  isLoggedIn?: boolean;
  user: { name?: string; [key: string]: unknown } | null;
  isFetching: boolean;
  isInitialFetchDone?: boolean;
};

export type TaskFields = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
};

export type TasksState = {
  tasks: Array<TaskFields> | null;
  isFetching: boolean;
  hasFetchingFailed: boolean;
};

export type RootState = {
  theme: ThemeState;
  user: UserState;
  tasks: TasksState;
};
