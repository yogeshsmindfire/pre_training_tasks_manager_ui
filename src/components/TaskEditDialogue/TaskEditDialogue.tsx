import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  Input,
  Button,
  Label,
  Textarea,
  Spinner,
} from "@fluentui/react-components";
import { useState } from "react";
import { fetchTasks, updateTask } from "../../services/taskService";
import { loadTasksStart, updateTasks } from "../../global/features/tasksSlice";
import { useDispatch } from "react-redux";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TaskEditDialogue = ({
  showEditTaskDialog,
  setShowEditTaskDialog,
  taskDetails,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const [taskData, setTaskData] = useState(taskDetails || {});
  const [isUpdateFailed, setIsUpdateFailed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();

  const handleSaveTask = async () => {
    setIsSaving(true);
    let taskCompleted = false;
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    const taskDueDate = new Date(taskData.dueDate).getDate();
    const taskDueMonth = new Date(taskData.dueDate).getMonth() + 1;
    if (currentMonth > taskDueMonth) {
      taskCompleted = true;
    } else if (currentMonth === taskDueMonth) {
      if (currentDate > taskDueDate) {
        taskCompleted = true;
      } else {
        taskCompleted = false;
      }
    } else {
      taskCompleted = false;
    }
    const { status } = await updateTask(
      taskData?._id || "",
      taskData.title,
      taskData.description,
      taskData.dueDate,
      taskCompleted
    );
    if (status === 200) {
      setIsSaving(false);
      setShowEditTaskDialog(false);
    } else {
      setIsUpdateFailed(true);
      setIsSaving(false);
    }
    dispatch(loadTasksStart());
    const tasksResponse = await fetchTasks();
    if (tasksResponse.status === 200) {
      dispatch(updateTasks(tasksResponse.data.tasks));
    }
  };

  return (
    <Dialog open={showEditTaskDialog}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <Label htmlFor="task-title">Title</Label>
            <Input
              id="task-title"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
            />
            <span style={{ marginTop: "20px" }} />
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              value={taskData.description}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  description: e.target.value,
                })
              }
            />
            <span style={{ marginTop: "20px" }} />
            <Label htmlFor="task-title">Title</Label>
            <Input
              id="task-title"
              type="date"
              value={taskData.dueDate}
              onChange={(e) =>
                setTaskData({ ...taskData, dueDate: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="secondary"
                onClick={() => setShowEditTaskDialog(false)}
              >
                Close
              </Button>
            </DialogTrigger>
            {!isSaving && (
              <Button appearance="primary" onClick={handleSaveTask}>
                Save
              </Button>
            )}
            {isSaving && <Spinner size="small" label="Saving..." />}
          </DialogActions>
          {isUpdateFailed && (
            <span style={{ color: "red" }}>Failed to update task</span>
          )}
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default TaskEditDialogue;
