import Header from "../components/Header/Header";
import { useEffect, useState } from "react";

import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  Divider,
} from "@fluentui/react-components";
import { useDispatch, useSelector } from "react-redux";
import TasksSection from "../Organisms/TasksSection";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Notification from "../components/Notification/Notification";
import { auth, logoutUser } from "../services/authService";
import { fetchTasks } from "../services/taskService";
import { loadTasksStart, updateTasks } from "../global/features/tasksSlice";
import { login, logout } from "../global/features/userSlice";
import Loader from "../components/Loader/Loader";
import ErrorBoundary from "../hoc/ErrorBoundary";

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { theme, user, tasks } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [loaderValue, setLoaderValue] = useState(0.25);

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleRegister = () => {
    setShowLogin(false);
  };

  const retrieveTasks = async () => {
    const { status, data } = await fetchTasks();
    if (status === 200) {
      dispatch(loadTasksStart());
      dispatch(updateTasks(data.tasks));
    }
  };

  const onLoadAuthCheck = async () => {
    try {
      setLoaderValue(0.4);
      const { status, data } = await auth();
      if (status === 200) {
        setLoaderValue(0.7);
        dispatch(login(data.user));
        dispatch(loadTasksStart());
        retrieveTasks().then(() => {
          setLoaderValue(0.9);
        });
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
        <div style={{ height: "100vh" }}>
          <Header />
          <Divider />
          {!user.isInitialFetchDone ? (
            <Loader value={loaderValue} />
          ) : (
            <>
              <TasksSection />
              {showLogin && !user.isLoggedIn && (
                <Login
                  handleRegister={handleRegister}
                  fetchTasks={retrieveTasks}
                />
              )}
              {!showLogin && !user.isLoggedIn && (
                <Register
                  handleLogin={handleLogin}
                  fetchTasks={retrieveTasks}
                />
              )}
              {user.isLoggedIn && (
                <Notification
                  showNotification={showNotification}
                  handleClose={() => setShowNotification(false)}
                  title={
                    !showLogin ? "Registeration Successful" : "Login Successful"
                  }
                  body={
                    !showLogin
                      ? "You have successfully registered."
                      : "You have successfully logged in."
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
