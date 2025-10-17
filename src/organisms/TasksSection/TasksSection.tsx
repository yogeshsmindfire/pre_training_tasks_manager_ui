/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import './TasksSection.css';
import TaskEditDialogue from '../../components/TaskEditDialogue/TaskEditDialogue';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@fluentui/react-components';
import {
  TextEditStyleRegular,
  CheckmarkUnderlineCircleRegular,
  DismissRegular,
} from '@fluentui/react-icons';
import { deleteTask, fetchTasks, updateTask } from '../../services/taskService';
import {
  loadTaskFailed,
  loadTasksStart,
  updateTasks,
} from '../../global/features/tasksSlice';
import type { RootState, TaskFields } from '../../global/store.types';
import labels from '../../constants/labels';

const TasksSection = () => {
  const { taskLoadFailed, noTasks } = labels;
  const dispatch = useDispatch();
  const { tasks, isFetching, hasFetchingFailed } = useSelector(
    (state: RootState) => state.tasks
  );
  const { user } = useSelector((state: RootState) => state);
  const [showEditTaskDialog, setShowEditTaskDialog] = useState(false);
  const [taskDetails, setTaskDetails] = useState<TaskFields>({
    _id: '',
    title: '',
    description: '',
    dueDate: '',
    completed: false,
  });

  const editTask = (task?: TaskFields) => {
    setShowEditTaskDialog(true);
    let date = new Date();
    if (task?.dueDate) {
      const dateParts = task?.dueDate.split('.');
      date = new Date(
        parseInt(dateParts[2]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[0]) + 1
      );
    }
    const taskData = {
      _id: task?._id || '',
      title: task?.title || '',
      description: task?.description || '',
      dueDate: date.toISOString().split('T')[0] || '',
      completed: task?.completed || false,
    };
    setTaskDetails(taskData);
  };

  const handleCompleteTask = async (task: TaskFields) => {
    dispatch(loadTasksStart());
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
      dispatch(loadTaskFailed());
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    dispatch(loadTasksStart());
    await deleteTask(taskId);
    const { status, data } = await fetchTasks();
    if (status === 200) {
      dispatch(updateTasks(data.tasks));
    } else {
      dispatch(loadTaskFailed());
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
            const dueDateParts = task.dueDate.split('.');
            const taskDueDate = new Date(
              dueDateParts[2],
              dueDateParts[1],
              dueDateParts[0]
            );
            return (
              <MessageBar key={task._id}>
                <MessageBarBody>
                  <MessageBarTitle>{task.title}</MessageBarTitle>
                  {task.description}
                  {task.completed !== true ? (
                    <Badge
                      color={taksDueRemainingDays < 0 ? 'danger' : 'warning'}
                    >{`Due on ${
                      taskDueDate.getDate() +
                      '-' +
                      taskDueDate.getMonth() +
                      '-' +
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

          <TaskEditDialogue
            showEditTaskDialog={showEditTaskDialog}
            setShowEditTaskDialog={setShowEditTaskDialog}
            taskDetails={taskDetails}
            setTaskDetails={setTaskDetails}
          />
        </div>
      )}
      {isFetching && (
        <Skeleton>
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </Skeleton>
      )}
      {(hasFetchingFailed || (!isFetching && tasks && !tasks.length)) && (
        <div className="no-tasks-container">
          <span>{hasFetchingFailed ? taskLoadFailed : noTasks}</span>
        </div>
      )}
      {user.isLoggedIn && (
        <Button onClick={() => editTask()} id="create-task-btn">
          +
        </Button>
      )}
    </div>
  );
};

export default TasksSection;
