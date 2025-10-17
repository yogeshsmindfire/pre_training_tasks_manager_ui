import Header from '../components/Header/Header';
import { useEffect, useState } from 'react';

import './Home.css';

import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  Divider,
  Spinner,
} from '@fluentui/react-components';
import { useDispatch, useSelector } from 'react-redux';
import TasksSection from '../organisms/TasksSection/TasksSection';
import Notification from '../components/Notification/Notification';
import { auth, logoutUser } from '../services/authService';
import { fetchTasks } from '../services/taskService';
import {
  loadTaskFailed,
  loadTasksStart,
  updateTasks,
} from '../global/features/tasksSlice';
import { login, logout } from '../global/features/userSlice';
import ErrorBoundary from '../hoc/ErrorBoundary';
import Auth from '../organisms/Auth/Auth';
import type { RootState } from '../global/store.types';

const Home = () => {
  const { theme, user } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  const retrieveTasks = async () => {
    dispatch(loadTasksStart());
    const { status, data } = await fetchTasks();
    if (status === 200) {
      dispatch(updateTasks(data.tasks));
    } else {
      dispatch(loadTaskFailed());
    }
  };

  const onLoadAuthCheck = async () => {
    try {
      const { status, data } = await auth();
      if (status === 200) {
        dispatch(login(data.user));
        dispatch(loadTasksStart());
        retrieveTasks();
      } else {
        logoutUser().then(() => {
          dispatch(logout());
        });
      }
    } catch (error) {
      console.error(error);
      logoutUser().then(() => {
        dispatch(logout());
      });
    }
  };

  useEffect(() => {
    onLoadAuthCheck();
  }, []);

  useEffect(() => {
    if (user.isLoggedIn) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  }, [user.isLoggedIn]);

  return (
    <FluentProvider theme={theme.isLightTheme ? webLightTheme : webDarkTheme}>
      <ErrorBoundary>
        <div style={{ height: '100vh' }} className="home-container">
          <Header />
          <Divider />
          {!user.isInitialFetchDone ? (
            <Spinner size="small" label="Loading..." />
          ) : (
            <>
              <TasksSection />
              {!user.isLoggedIn && (
                <Auth
                  toggleLogin={() => setShowLogin(!showLogin)}
                  fetchTasks={retrieveTasks}
                  showLogin={showLogin}
                />
              )}
              {user.isLoggedIn && (
                <Notification
                  showNotification={showNotification}
                  handleClose={() => setShowNotification(false)}
                  title={
                    !showLogin ? 'Registeration Successful' : 'Login Successful'
                  }
                  body={
                    !showLogin
                      ? 'You have successfully registered.'
                      : 'You have successfully logged in.'
                  }
                />
              )}
            </>
          )}
        </div>
      </ErrorBoundary>
    </FluentProvider>
  );
};

export default Home;
