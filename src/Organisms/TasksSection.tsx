/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./TasksSection.css";
import TaskEditDialogue from "../components/TaskEditDialogue/TaskEditDialogue";
import { useDispatch, useSelector } from "react-redux";
import {
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  MessageBarActions,
  Button,
  Tooltip,
  Badge,
  Skeleton,
  SkeletonItem,
} from "@fluentui/react-components";
import {
  TextEditStyleRegular,
  CheckmarkUnderlineCircleRegular,
  DismissRegular,
} from "@fluentui/react-icons";
import { deleteTask, fetchTasks, updateTask } from "../services/taskService";
import {
  loadTasksEnd,
  loadTasksStart,
  updateTasks,
} from "../global/features/tasksSlice";

const TasksSection = () => {
  const dispatch = useDispatch();
  const { tasks, isFetching } = useSelector((state: any) => state.tasks);
  const { user } = useSelector((state: any) => state);
  const [showEditTaskDialog, setShowEditTaskDialog] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);

  const editTask = (task: any) => {
    setShowEditTaskDialog(true);
    setTaskDetails(task || null);
  };

  const handleCompleteTask = async (task: any) => {
    await updateTask(
      task._id,
      task.title,
      task.description,
      task.dueDate,
      true
    );
    dispatch(loadTasksStart());
    const { status, data } = await fetchTasks();
    if (status === 200) {
      dispatch(updateTasks(data.tasks));
    } else {
      dispatch(loadTasksEnd());
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    dispatch(loadTasksStart());
    await deleteTask(taskId);
    const { status, data } = await fetchTasks();
    if (status === 200) {
      dispatch(updateTasks(data.tasks));
    } else {
      dispatch(loadTasksEnd());
    }
  };

  return (
    <div className="tasks-section">
      {!isFetching && tasks && (
        <div className="tasks-list-container">
          {tasks.map((task: any) => {
            const taksDueRemainingDays =
              (new Date(task.dueDate).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24);
            const taskDueDate = new Date(task.dueDate);
            return (
              <MessageBar key={task._id}>
                <MessageBarBody>
                  <MessageBarTitle>{task.title}</MessageBarTitle>
                  {task.description}
                  {task.completed !== true ? (
                    <Badge
                      color={taksDueRemainingDays < 0 ? "danger" : "warning"}
                    >{`Due on ${
                      taskDueDate.getDate() +
                      "-" +
                      taskDueDate.getMonth() +
                      "-" +
                      taskDueDate.getFullYear()
                    }`}</Badge>
                  ) : (
                    <Badge color="success">Completed</Badge>
                  )}
                </MessageBarBody>
                <MessageBarActions
                  containerAction={
                    <>
                      {task.completed !== true && (
                        <Tooltip content="Edit Task" relationship="label">
                          <Button
                            aria-label="dismiss"
                            appearance="transparent"
                            icon={<TextEditStyleRegular />}
                            onClick={() => editTask(task)}
                          />
                        </Tooltip>
                      )}
                      {task.completed !== true && (
                        <Tooltip
                          content="Mark as Complete"
                          relationship="label"
                        >
                          <Button
                            aria-label="dismiss"
                            appearance="transparent"
                            icon={<CheckmarkUnderlineCircleRegular />}
                            onClick={() => handleCompleteTask(task)}
                          />
                        </Tooltip>
                      )}
                      <Tooltip content="Dismiss Task" relationship="label">
                        <Button
                          aria-label="dismiss"
                          appearance="transparent"
                          icon={<DismissRegular />}
                          onClick={() => handleDeleteTask(task._id)}
                        />
                      </Tooltip>
                    </>
                  }
                ></MessageBarActions>
              </MessageBar>
            );
          })}

          {taskDetails && (
            <TaskEditDialogue
              showEditTaskDialog={showEditTaskDialog}
              setShowEditTaskDialog={setShowEditTaskDialog}
              taskDetails={taskDetails}
            />
          )}
        </div>
      )}
      {isFetching && (
        <Skeleton>
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </Skeleton>
      )}
      {!isFetching && tasks && !tasks.length && (
        <div className="no-tasks-container">
          <span>No tasks available. Create a new task to get started!</span>
        </div>
      )}
      {user.isLoggedIn && (
        <Button onClick={editTask} id="create-task-btn">
          +
        </Button>
      )}
    </div>
  );
};

export default TasksSection;
