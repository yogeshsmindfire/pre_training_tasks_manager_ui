import type { TaskFields } from '../../global/store.types';

export type TaskEditDialogueProps = {
  showEditTaskDialog: boolean;
  setShowEditTaskDialog: (open: boolean) => void;
  taskDetails: TaskFields;
  setTaskDetails: (task: TaskFields) => void;
};
